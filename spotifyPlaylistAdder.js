import { spotifyOAuth_URL_Gen } from './spotifyOAuth_URL_Gen.js'

export async function spotifyPlaylistAdder(){

    chrome.storage.local.get(['songTitle', 'songArtist', 'songSpotifyURL'], (data) =>{
        const trackId = data.songSpotifyURL
        const accessToken = spotifyOAuth()
        return accessToken

        //console.log(accessToken)

        const url = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;

        try {
            //const response = await fetch(url, {
            const response = async() =>{
                await fetch(url,{
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            }
            
            if (response.ok) {
                console.log("Song added to 'Liked Songs'!");
            }else{
                console.log("error")
            }

        } catch (error) {
            console.error("Error:", error);
        }
    })
};


    