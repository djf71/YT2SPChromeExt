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
    var scopes = "playlist-read-private"

        
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
function addSongToPlaylist(token){
    
    fetch("https://api.spotify.com/v1/me/playlists",{

        headers:{

            'Authorization' : 'Bearer ' + token
            
        }   
             

    }).then(response => {
        return response.json()
    }).then(response => {
        allplaylists = response.items
        
        titles = allplaylists.map(function(holder){
            return holder.name
        })
        
        //search for song/artist 

        searchForTrack(token)

        //check if there is a "From Youtube" playlist


        //If there is not, create one 

        //If there is
        
        

    }).catch(response => {
        console.log("Error, playlist function undefined")
    })

}

//searches for song 
function searchForTrack(token){

    songname = "Danger Zone"
    artistname = "Kenny Loggins"

    fetch(`https://api.spotify.com/v1/search?q=track:${songname}+artist:${artistname}&type=track`,{

        headers: {

           'Authorization' : 'Bearer ' + token,

        }

    }).then(response => {
        return response.json()
    }).then(response =>{
        console.log(response)
    }).catch(response => {
        console.log("Error, search undefined")
    })

    
}
 
