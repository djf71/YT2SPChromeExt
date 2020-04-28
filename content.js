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





