//Makes Sure Page is Loaded Before Executing Function
document.addEventListener('DOMContentLoaded', function(){
    
    //Adds a Click Event Listener for Dropdown Button 
    document.getElementById('boom').addEventListener('click', 
    onclick, false)
    
    //Function that executes on Click 
    function onclick(){

        //Gets OAth Token from Spotify and 
        getOAthToken(function(token) {
           addSongToPlaylist(token);
        });

        
        chrome.tabs.query({currentWindow: true, active:true}, 
            
            function(tabs){
                //sends data back to the current tab in chrome 
                chrome.tabs.sendMessage(tabs[0].id,{"message": "clicked_browser_action"})

            }
                
            
            
            ) 
        }

}, false)


//function that gets the Spotify OAth token 
//send the token to a callback function 
function getOAthToken(callback){

    //Spotify given client ID
    //From developer website after app registation 
    var client_id = "a9133a4606a74919aefcc1c43f11247e"
    //Redirect URL per chrome launchWebAuthFlow function
    var redirect_url = chrome.identity.getRedirectURL("spotify")
    //Scope to allow reading private playlists
    var scopes = "playlist-read-private playlist-modify-private playlist-modify-public"

        
    //Launches spotify log in window 
    chrome.identity.launchWebAuthFlow({
         url: `https://accounts.spotify.com/en/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scopes}&response_type=token`,
        interactive : true
    }, function (redirectURL){

        
        //Gets token from the given redirect URL after spotify application 
        //Isolates token from url 
        var token = redirectURL.substr(redirectURL.indexOf("#")+1).split("&")[0].split("=")[1]  
        
        callback(token)
    
        
    })

    

}

//function to check if there is already a "From Youtube" playlist in the current user's account 
async function addSongToPlaylist(token){
    
    response = await fetch("https://api.spotify.com/v1/me/playlists",{

        headers:{

            'Authorization' : 'Bearer ' + token
            
        }   
        

    }).catch(response => {
        console.log("Error, playlist function undefined")
    })


    response = await response.json()
    allplaylists = response.items

    titles = allplaylists.map(function(holder){
        return holder.name
    })
    

    //search for song/artist 

    searchresponse = await searchForTrack(token)

    searchresponse = await searchresponse.json()
    foundartist = searchresponse.tracks.items[0].artists[0].name 
    foundtrack = searchresponse.tracks.items[0].name 
    foundURI = searchresponse.tracks.items[0].uri

    //check if there is a "From Youtube" playlist

    if(!titles.includes("Liked from Youtube")){
        //If there is not, create one 
        createPlaylist(token)
        
        //Then 
    }else{

        //If there is, add the song to the playlist
        playlist_id = allplaylists[titles.indexOf("Liked from Youtube")].id
        addTack(token,playlist_id,foundURI)
        console.log("Added")

    }

    
    

    


}

//searches for song 
async function searchForTrack(token){

    songname = "Danger Zone"
    artistname = "Kenny Loggins"

    return await fetch(`https://api.spotify.com/v1/search?q=track:${songname}+artist:${artistname}&type=track`,{

        headers: {

           'Authorization' : 'Bearer ' + token,

        }

    }).catch(response => {
        console.log("Error, search undefined")
    })

    
}

async function createPlaylist(token){

    await fetch("https://api.spotify.com/v1/users/dfox80/playlists",{

        method : 'POST',

        body : JSON.stringify({name : "Liked from Youtube"}),

        headers:{

            'Authorization' : 'Bearer ' + token,
            'Content-Type' : 'application/json'

        }

    }).catch(response => {
        console.log("Error, playlist could not be created")
    })
}

async function addTack(token,playlist_id,track_uri){

    await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,{

        method : 'POST',

        body : JSON.stringify({uris:[track_uri]}),

        headers:{

            'Authorization' : 'Bearer ' + token, 
            'Content-Type' : 'application/json'

        }


    })

}
 
