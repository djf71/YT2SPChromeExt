document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('boom').addEventListener('click', 
    onclick, false)
    
    function onclick(){

        getOAthToken(function(token) {
            makeReqeust(token);
        });

        
        



        chrome.tabs.query({currentWindow: true, active:true}, 
            
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id,{"message": "clicked_browser_action"})

            }
                
            
            
            ) 
        }

}, false)



function getOAthToken(callback){

        var client_id = "a9133a4606a74919aefcc1c43f11247e"
    var redirect_url = chrome.identity.getRedirectURL("spotify")
    var scopes = "playlist-read-private"
        
    chrome.identity.launchWebAuthFlow({
         url: `https://accounts.spotify.com/en/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scopes}&response_type=token`,
        interactive : true
    }, function (redirectURL){
        var token = redirectURL.substr(redirectURL.indexOf("#")+1).split("&")[0].split("=")[1]  
        console.log(token)
        callback(token)
    
        
    })

    

}

//testing what making the request looks like
//will get a list of playlists 
function makeReqeust(token){
    
    fetch("https://api.spotify.com/v1/me/playlists",{

        headers:{

            'Authorization' : 'Bearer ' + token
            
        }   
             

    }).then(response => {
       return response.json()
    }).then(response => {
        title = response.
        console.log(title)
    }).catch(response => {
        console.log("Stupid Error")
    })

    
    


}



 
