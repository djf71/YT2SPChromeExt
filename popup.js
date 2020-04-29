document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('boom').addEventListener('click', 
    onclick, false)
    
    function onclick(){

        chrome.tabs.query({currentWindow: true, active:true}, 
            
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id,{"message": "clicked_browser_action"})
    
        

            }
                
            
            
            ) 
        }

}, false)

 

//function to search song and artist in spotify 


//function to add the song to a playlist in spotify labeled "Liked from Youtube"

