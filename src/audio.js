class Audio {
  constructor() {
    this.music = document.getElementById('music-player');
    this.music.src = "assets/sound/bgm.ogg"
    this.music.loop = true;
    this.sounds = document.getElementById('sound-player');
    this.sounds.volume = 0.1;
    this.musicOn();
    this.soundOn();
  }

  musicOn() {
    this.musicControl = document.getElementById('music-control');
    this.music.play();
    this.musicControl.className = "fa fa-music active-control";
    this.addMusicOffListener();
  }

  musicOff() {
    this.musicControl = document.getElementById('music-control');
    this.music.pause();
    this.musicControl.className = "fa fa-music inactive-control";
    this.addMusicOnListener();
  }

  soundOn() {
    this.soundControl = document.getElementById('sound-control');
    this.soundMuted = false;
    this.soundControl.className = "fa fa-volume-up active-control";
    this.addSoundOffListener();
  }

  soundOff() {
    this.soundControl = document.getElementById('sound-control');
    this.soundMuted = true;
    this.soundControl.className = "fa fa-volume-off inactive-control";
    this.addSoundOnListener();
  }

  playSound(sound) {
    if (!this.soundMuted) {
      this.sounds.src = `assets/sound/${sound}.wav`;
      this.sounds.play();
    }
  }

  addMusicOffListener() {
    this.musicControl.addEventListener('click', this.musicOff.bind(this));
  }

  addMusicOnListener() {
    this.musicControl.addEventListener('click', this.musicOn.bind(this));
  }

  addSoundOffListener() {
    this.soundControl.addEventListener('click', this.soundOff.bind(this));
  }

  addSoundOnListener() {
    this.soundControl.addEventListener('click', this.soundOn.bind(this));
  }
}

export default Audio;
