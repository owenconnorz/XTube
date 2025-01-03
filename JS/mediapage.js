
// script.js
document.getElementById('playButton').addEventListener('click', function() {
    const video = document.getElementById('videoPlayer');
    video.play();
    this.style.display = 'none'; // Hide the play button after clicking
});
