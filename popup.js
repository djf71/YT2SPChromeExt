document.addEventListener('DOMContentLoaded', async () => {
    const songInfo = document.getElementById('songInfo');
    const likeButton = document.getElementById('likeButton');
  
    // Get the song title and artist from storage
    chrome.storage.local.get(['songTitle', 'songArtist'], (data) => {
      if (data.songTitle && data.songArtist) {
        songInfo.textContent = `🎶 ${data.songTitle} - ${data.songArtist}`;
      } else {
        songInfo.textContent = "No song detected.";
        likeButton.disabled = true;
      }
    });
  
    likeButton.addEventListener('click', () => {
      // Logic to add song to "liked songs" (this may involve integrating with Spotify/YouTube Music API)
      alert("Added to your liked songs!");
    });
  });