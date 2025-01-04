import { spotifyOAuth_URL_Gen } from "./spotifyOAuth_URL_Gen.js";

document.addEventListener('DOMContentLoaded', async () => {
    const songInfo = document.getElementById('songInfo');
    const likeButton = document.getElementById('likeButton');
    
    // Get the song title and artist from storage
    chrome.storage.local.get(['songTitle', 'songArtist', 'SONGIDd'], (data) => {
      if (data.SONGIDd) {
        songInfo.textContent = `🎶 ${data.songTitle} - ${data.songArtist}`;
      } else {
        songInfo.textContent = "No song detected.";
        likeButton.disabled = true;
        //likeButton.style.visibility = "hidden";
      }
    });
  
    likeButton.addEventListener('click', () => {
      // Logic to add song to "liked songs" (this may involve integrating with Spotify/YouTube Music API)
      
      /*
      spotifyOAuth_URL_Gen().then(authUrl=> {
        chrome.runtime.sendMessage({ action: "auth", authUrl: authUrl });
      }); 
      */

      chrome.runtime.sendMessage({ action: "auth"});
      
    });
  });