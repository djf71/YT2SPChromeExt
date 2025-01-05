// Check to see if there is a video in the webpage

/*
function checkForVideo(){

  const video = document.querySelector('video');

  if (video) {
    //video.addEventListener('play', () => {
      // Send video info to background script
      chrome.runtime.sendMessage({ action: "identifySong", videoUrl: window.location.href });
    //});
  };
}
*/

let reload_check = "init"

document.addEventListener("play", (event) => {
  if (event.target.tagName === "VIDEO" && reload_check != window.location.href) {
    reload_check = window.location.href
    chrome.runtime.sendMessage({ action: "identifySong", videoUrl: window.location.href });
  }
}, {capture:true}); // Use the capturing phase to ensure we catch play events




/*
// Listen for the custom-navigation event
window.addEventListener('custom-navigation', () => {
  console.log('Custom navigation detected!');
  checkForVideo();
});
*/
/*
// Use a MutationObserver to detect changes in the DOM
const observer = new MutationObserver(() => {
  console.log('DOM changed, checking for video...');
  checkForVideo();
});

// Start observing the body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
*/

// Initial check for video on page load
//checkForVideo();

/*
const video = document.querySelector('video');

  if (video) {
    //video.addEventListener('play', () => {
      // Send video info to background script
      chrome.runtime.sendMessage({ action: "identifySong", videoUrl: window.location.href });
    //});
  };
*/







