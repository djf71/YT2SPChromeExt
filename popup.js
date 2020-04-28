document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('boom').addEventListener('click', 
    onclick, false)
    
    function onclick(){

        chrome.tabs.query({currentWindow: true, active:true}, 
            
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id,{"message": "clicked_browser_action"})
                createPlaylist()
            }
                
            
            
            ) 
        }

}, false)

 

//function to create a Spotify Playlist
function createPlaylist(){

    let token = window.location.hash.substr(1)
    if (token) {
        const o = Object.fromEntries(new URLSearchParams(token))
        return o.access_token
    }else{
        const authendpoint = "https://accounts.spotify.com/authorize"
        const clientId = "a9133a4606a74919aefcc1c43f11247e"
        const redirectURI = "http://localhost:5500"  //'${window.location.protocol}//${window.location.host}/'
        let query = `client_id=${clientId}&redirect_uri=${redirectURI}&response_type=token`
        window.open(`${authendpoint}?${query}`)

        console.log(window.location.href) 
        alert(token)
    }
   

}

//function to search song and artist in spotify 


//function to add the song to a playlist in spotify labeled "Liked from Youtube"

