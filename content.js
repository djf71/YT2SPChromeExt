chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
   if (request.message === "clicked_browser_action"){    
    
    
    

   }
})


//function to grab song title and artist from page
function getSongElems(){
    
    var song = "Death Note"
    var artist = "GNAR"
    
    return song,artist
    //try {       
    //    var song = document.getElementById("collapsible").children[4].children[1].text   
    //}
    //finally{
    //    alert(song)
    //}
}

//function to create a Spotify Playlist
function createPlaylist(){

    const authendpoint = "https://accounts.spotify.com/authorize"
    const clientId = "a9133a4606a74919aefcc1c43f11247e"
    const redirectURI = "http://www.google.com"  //'${window.location.protocol}//${window.location.host}/'
    let query = `client_id=${clientId}&redirect_uri=${redirectURI}&response_type=token`
    window.location.href = (`${authendpoint}?${query}`)
     
    token = window.location.hash.substr(1)
    console.log(token)

    while (token != "" && !token){

        let token = window.location.hash.substr(1)
        alert("running")

    }
    
    const o = Object.fromEntries(new URLSearchParams(token))
    //alert(o.access_token)
    

}

function getOAthURL(){

    const authendpoint = "https://accounts.spotify.com/authorize"
    const clientId = "a9133a4606a74919aefcc1c43f11247e"
    const redirectURI = "http://www.google.com"  //'${window.location.protocol}//${window.location.host}/'
    let query = `client_id=${clientId}&redirect_uri=${redirectURI}&response_type=token`
    
     
    return (`${authendpoint}?${query}`)

}






