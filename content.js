// Check to see if there is a video in the webpage
const video = document.querySelector('video');

if (video) {
  video.addEventListener('play', () => {
    // Send video info to background script

    const audioContext = new (window.AudioContext || window.AudioContext)();
    const source = audioContext.createMediaElementSource(video);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Convert the audio data to a format suitable for sending
    const audioBuffer = new Blob([dataArray], { type: 'audio/wav' });

    chrome.runtime.sendMessage({ action: "identifySong", audioData: audioBuffer });
  });
}







