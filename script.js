document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to the music website!');

    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeControl = document.getElementById('volumeControl');

    // Play Button Event
    playBtn.addEventListener('click', function() {
        audioPlayer.play();
        console.log('Playing music...');
    });

    // Pause Button Event
    pauseBtn.addEventListener('click', function() {
        audioPlayer.pause();
        console.log('Music paused.');
    });

    // Volume Control Event
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = volumeControl.value;
        console.log('Volume set to ' + audioPlayer.volume);
    });

    // Playlist Toggle Feature
    const songLinks = document.querySelectorAll('.song');

    songLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const songSource = this.getAttribute('data-song');
            audioPlayer.src = songSource;
            audioPlayer.play();
            console.log('Playing: ' + songSource);
        });
    });

    // Theme Switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    const body = document.body;

    themeSwitcher.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            console.log('Switched to light theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            console.log('Switched to dark theme');
        }
    });

    // Progress Bar and Song Duration
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const progressBar = document.getElementById('progressBar');

    // Update song duration when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', function() {
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = Math.floor(audioPlayer.duration % 60);
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        progressBar.max = audioPlayer.duration;
    });

    // Update current time and progress bar as song plays
    audioPlayer.addEventListener('timeupdate', function() {
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        progressBar.value = audioPlayer.currentTime;
    });

    // Seek functionality: Update the song's current time based on the progress bar input
    progressBar.addEventListener('input', function() {
        audioPlayer.currentTime = progressBar.value;
    });
});
