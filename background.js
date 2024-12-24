const CLINENT_ID = 'a9133a4606a74919aefcc1c43f11247e';
const REDIRECT_URI = 'https://alfgpeknminkdbnhddjfanekkfanfala.chromiumapp.org/spotify';
const SCOPE = 'user-library-modify';
const AUTH_URL = new URL("https://accounts.spotify.com/authorize");


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

  
  if (message.action === "identifySong") {
    
      // Store config access keys
      
      //*_____________________________________________________________________________*
      // *WOULD NEED TO BE UPDATED IF NEW LOGIN OR PROJECT WITHIN OLD LOGIN IS CREATED*
      //*_____________________________________________________________________________*

      
          url = "https://eu-api-v2.acrcloud.com/api/external-metadata/tracks"

          params = {
            source_url: message.videoUrl,
          }

          const urlParams = new URLSearchParams(params);
          url = `${url}?${urlParams.toString()}`;
         
          headers = {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZDYzNDIxOGQ1NmRmOWQxNmE4NmQ4ODliOTEyY2EzNTFmNzJhYTYxZDdkYTU4OGEwN2U5MWJhNGE5NzIyODBiMmUyOWRkYzNjYWMwYTIxNGEiLCJpYXQiOjE3MzA2NTQ0MTguMzIwMjQ5LCJuYmYiOjE3MzA2NTQ0MTguMzIwMjUzLCJleHAiOjIwNDYxODcyMTcuMDk0MTQ5LCJzdWIiOiIxOTM4ODEiLCJzY29wZXMiOlsiKiIsIndyaXRlLWFsbCIsInJlYWQtYWxsIiwiYnVja2V0cyIsIndyaXRlLWJ1Y2tldHMiLCJyZWFkLWJ1Y2tldHMiLCJhdWRpb3MiLCJ3cml0ZS1hdWRpb3MiLCJyZWFkLWF1ZGlvcyIsImNoYW5uZWxzIiwid3JpdGUtY2hhbm5lbHMiLCJyZWFkLWNoYW5uZWxzIiwiYmFzZS1wcm9qZWN0cyIsIndyaXRlLWJhc2UtcHJvamVjdHMiLCJyZWFkLWJhc2UtcHJvamVjdHMiLCJ1Y2YiLCJ3cml0ZS11Y2YiLCJyZWFkLXVjZiIsImRlbGV0ZS11Y2YiLCJibS1wcm9qZWN0cyIsImJtLWNzLXByb2plY3RzIiwid3JpdGUtYm0tY3MtcHJvamVjdHMiLCJyZWFkLWJtLWNzLXByb2plY3RzIiwiYm0tYmQtcHJvamVjdHMiLCJ3cml0ZS1ibS1iZC1wcm9qZWN0cyIsInJlYWQtYm0tYmQtcHJvamVjdHMiLCJmaWxlc2Nhbm5pbmciLCJ3cml0ZS1maWxlc2Nhbm5pbmciLCJyZWFkLWZpbGVzY2FubmluZyIsIm1ldGFkYXRhIiwicmVhZC1tZXRhZGF0YSJdfQ.iuPaihRlyMFyN3UiPzFH6q4hVA5mZH4e_di9du5HT-mtho9Nko1r2yQmMylVcVzxZY8RUF5GKfs9GOBcro13j29j0YuZcyAknScqtY2kTNxi4FUskNFLnXUFcckw4Phlbm1cYil_HYhxDrihrslh6rDSy3VTb-7TzGxZ5b2ttyV0ukxbCmVsyCVCJTrn3Bbe2exL9PqaL2Is0xquqr-x84Buqw-5pxxAuxKAAxAparNVl9tOpLBftZfca8Um1tHH0copnrLo5jBEA0AOHNrJZXKqU9WgbwUER881F-gJ1ocU8TnCddeXp5O7mxycIeZY-qrKir4oRrfkUuRRfHLzBBuoq56ROzfeMGf3v8Hiy0HfgxjQEIOVOq7qhAE12e7T44i227TZvE6I_8ML8NKuRlIOIkkm876QNLdIDrDBtZAU412eDjv2K_8CjUdrI816Q9AaeOktdFW-YVQ38QJd2LcycRYwFAQ8JaaTmJsDPyU4jHBduUVyHYoMXDag-_pTuzM177Z2TEwqqEpUPjjWrJb1lXSJOMy65JhnWLNMFR3lQx9Rzg0xewVNZgOKGiZkEMPeqqyuVW6oFyPRYTWR-L4Q3DmvvYLsmZORCTIRKex10oYSxk2gGqG7R7nspoy5XZnkVLhDkOsVh8LwWxZL2xzRC8CeiqZxTrvsf66I_Zk'
          }
          
          try {
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            })
            if (response.ok){
              // Song identified successfully
              const resp = await response.json()
              const songTitle = resp.data[0].name;
              const songArtist = resp.data[0].artists[0].name;
              const songSpotifyURL = resp.data[0].external_metadata.spotify[0].id
              console.log(`#1: Identified song: ${songTitle} by ${songArtist}`);
  
          chrome.storage.local.set({ songTitle, songArtist, songSpotifyURL });
          chrome.action.openPopup();  // Show popup when song is identified
          } else {
          console.error("Song identification failed.");
          }

          }catch (error) {
            console.error("Error identifying song:", error);
            }
  }else if(message.action === 'auth'){

    generateAuthURL().then(auth_url=>{

      generateAccessCode(auth_url).then(acc_code=>{

        chrome.storage.local.get(['ACCESS_CODE','CODE_VERIFIER'], (data) => {

          const accessCode = data.ACCESS_CODE;
          const codeVer = data.CODE_VERIFIER;
  
          console.log("#6: Code Verifier Passed to Function:", codeVer)
          console.log("#7: Code Returned:",accessCode)
    
          const a_token = generateAccessToken(accessCode,codeVer).then(a_token=>{

            console.log("Access Token:", a_token)
            console.log("Stored Access Token:", chrome.storage.local.get(['ACCESS_TOKEN']))
          })
          
        });

      })
       
    })

    

    
    

  }


});


async function generateHmacSHA1Signature(secret, message) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  return btoa(String.fromCharCode(...signatureArray));
};

async function generateSpotifyCodeChallenge(){
  
  //Code Verifier Template from API Docs
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    const code_verifier =  values.reduce((acc, x) => acc + possible[x % possible.length], "");
    return code_verifier
  }

  //Base64encode template from API Docs
  const base64encode = (input) => {
    
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    

  }

  //Conversion to SHA256 Template from API Docs
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await crypto.subtle.digest('SHA-256', data)
    }

    //Generate a code_verifier
    const CODE_VERIFIER = generateRandomString(64)
    console.log("#2: Code Verifier OG:", CODE_VERIFIER)

    //Generate a code challenge
    const hashBuffer = await sha256(CODE_VERIFIER)
    const CODE_CHALLENGE = base64encode(hashBuffer)

    console.log("#3: Code Challenge:", CODE_CHALLENGE)
    

    chrome.storage.local.set({CODE_VERIFIER,CODE_CHALLENGE})

    return {CODE_VERIFIER,CODE_CHALLENGE}
}



async function generateAuthURL(){
  
  const test  = await generateSpotifyCodeChallenge()


  const params =  {
    response_type: 'code',
    client_id: CLINENT_ID,
    SCOPE,
    code_challenge_method: 'S256',
    code_challenge: test.CODE_CHALLENGE,
    redirect_uri: REDIRECT_URI,
  }

  const authUrl = AUTH_URL

  authUrl.search = new URLSearchParams(params).toString();

  console.log("#4: Completed Auth URL Function:", test.CODE_CHALLENGE)

  return authUrl.toString() 
}

async function generateAccessCode(a_url){

  return new Promise((resolve,reject)=>{
    
    chrome.identity.launchWebAuthFlow({
      url: a_url, 
      interactive: true
    }).then((redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }
      
      // Parse the token from the redirect URL
      const urlParams = new URLSearchParams(new URL(redirectUrl).search);
      const code = urlParams.get('code');
      
      if(code){
        chrome.storage.local.set({ACCESS_CODE:code})
        console.log("#5: Access Code:", code)
        resolve(code)
      }else{
        reject("No code found in the redirect URL");
      }
    } 
  )
  }
  )
  

}

async function generateAccessToken(a_code,c_ver){
  // stored in the previous step

  const TOKEN_URL = 'https://accounts.spotify.com/api/token'

  console.log("#8: Code Verifier Used in Function:",c_ver)
 
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLINENT_ID,
      grant_type: 'authorization_code',
      code: a_code,
      redirect_uri: REDIRECT_URI,
      code_verifier: c_ver,
    }),
  }


  const body = await fetch(TOKEN_URL, payload);
  
  const response =await body.json();
  const ACCESS_TOKEN = response.access_token


  chrome.storage.local.set({ACCESS_TOKEN});
  return ACCESS_TOKEN
}