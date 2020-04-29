document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('boom').addEventListener('click', 
    onclick, false)
    
    function onclick(){

        var client_id = "a9133a4606a74919aefcc1c43f11247e"
        var redirect_url = chrome.identity.getRedirectURL("spotify")
        
        chrome.identity.launchWebAuthFlow({
            url: `https://accounts.spotify.com/en/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=token`,
            interactive : true
        }, function (redirectURL){
            var token = redirectURL.substr(redirectURL.indexOf("#")+1).split("&")[0].split("=")[1]
            
        
        })




        chrome.tabs.query({currentWindow: true, active:true}, 
            
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id,{"message": "clicked_browser_action"})

            }
                
            
            
            ) 
        }

}, false)



function getOAthURL(){

    const authendpoint = "https://accounts.spotify.com/authorize"
    const clientId = "a9133a4606a74919aefcc1c43f11247e"
    const redirectURI = "http://www.google.com"  //'${window.location.protocol}//${window.location.host}/'
    let query = `client_id=${clientId}&redirect_uri=${redirectURI}&response_type=token`
    
     
    return (`${authendpoint}?${query}`)

}

 
