// script-player.js

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const title = document.querySelector('.title');
const recorder = document.getElementById('cd-image') // Reference to the CD image element

let currentTrackIndex = 0;

// List of tracks with associated images
const tracks = [
    { title: 'Myslovitz - Dla Ciebie', file: 'track1.mp3', image: 'cd1.png' },
    { title: 'Gabriel Fleszar - Kroplą deszczu (1999).', file: 'track2.mp3', image: 'cd2.png' }
];

// Function to update the player
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.file;
    recorder.src = track.image; // Update the image
    title.textContent = `Teraz gra: ${track.title}`;
    progress.value = 0;
    currentTimeSpan.textContent = '0:00';
    durationSpan.textContent = '0:00';
}

// Play the audio
function playAudio() {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    recorder.style.display = 'block'; // Show spinning CD
}

// Pause the audio
function pauseAudio() {
    audio.pause();
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    recorder.style.display = 'none'; // Hide spinning CD
}

// Play the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playAudio();
}

// Play the previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playAudio();
}

// Update progress bar and time
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    progress.value = (currentTime / duration) * 100;

    currentTimeSpan.textContent = formatTime(currentTime);
    durationSpan.textContent = formatTime(duration);
}

// Seek the audio
function setProgress(e) {
    const duration = audio.duration;
    const seekTime = (progress.value / 100) * duration;
    audio.currentTime = seekTime;
}

// Format time (seconds -> minutes:seconds)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Event listeners
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
audio.addEventListener('ended', nextTrack);

// Load the initial track
loadTrack(currentTrackIndex);
