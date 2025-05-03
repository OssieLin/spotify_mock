const playButton = document.getElementById('play-button');
const timeline = document.getElementById('timeline');
const sliderFill = document.getElementById('slider-fill');
const currentTimeText = document.getElementById('current-time');
const remainingTimeText = document.getElementById('remaining-time');
const clock = document.getElementById('clock');
const audio = document.getElementById('audio-player');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateUI() {
  const currentTime = audio.currentTime;
  const duration = audio.duration || 0;
  currentTimeText.textContent = formatTime(currentTime);
  remainingTimeText.textContent = `-${formatTime(duration - currentTime)}`;
  timeline.value = currentTime;
  const percent = (currentTime / duration) * 100;
  sliderFill.style.width = `${percent}%`;
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateClock, 1000);
updateClock();

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
});

audio.addEventListener('pause', () => {
  playButton.innerHTML = '<i class="fas fa-play"></i>';
});

timeline.addEventListener('input', (e) => {
  audio.currentTime = parseFloat(e.target.value);
  updateUI();
});

audio.addEventListener('timeupdate', updateUI);

audio.addEventListener('loadedmetadata', () => {
  timeline.max = audio.duration;
  updateUI();
});

function restartSong() {
  audio.currentTime = 0;
  updateUI();
  if (!audio.paused) {
    audio.play();
  }
}

prevButton.addEventListener('click', restartSong);
nextButton.addEventListener('click', restartSong);

// Initial UI state
updateUI();
playButton.innerHTML = '<i class="fas fa-play"></i>';
