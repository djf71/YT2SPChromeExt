export async function spotifyOAuth(){
    console.log("Authorizing")
    //Code Verifier Template from API Docs
    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    //Conversion to SHA256 Template from API Docs
    const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
    }

    //Base64encode template from API Docs
    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    const clientId = 'a9133a4606a74919aefcc1c43f11247e';
    const redirectUri = 'http://localhost:5500';

    //const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public scope user-library-modify';
    const scope = 'user-library-modify';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    console.log(authUrl.toString())
    window.location.href = authUrl.toString();

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    
    const getToken = async code => {
        
        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier');
    
        const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
        }
    
        const body = await fetch(url, payload);
        const response =await body.json();
    
        localStorage.setItem('access_token', response.access_token.json());
        console.log(response.access_token.json())
        return response.access_token.json()
    }

}