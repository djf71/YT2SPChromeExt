// Check to see if there is a video in the webpage
const video = document.querySelector('video');

if (video) {
  //video.addEventListener('play', () => {
    // Send video info to background script
    chrome.runtime.sendMessage({ action: "identifySong", videoUrl: window.location.href });
  //});
};







