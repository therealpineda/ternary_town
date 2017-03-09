class Audio {
  constructor() {
    this.music = document.getElementById('music-player');
    this.music.src = "assets/sound/bgm.ogg"
    this.music.loop = true;
    this.sounds = document.getElementById('sound-player');
    this.sounds.sound = 0.1;
    this.musicOn();
    this.musicControl = document.getElementById('music-control');
    this.soundControl = document.getElementById('sound-control');
    this.addMusicOffListener();
    this.addSoundOffListener();
    this.soundMuted = false;
  }

  addMusicOffListener() {
    const self = this;
    this.musicControl.addEventListener('click', function(evt) {
      self.musicOff();
      self.musicControl.className = "fa fa-music inactive-control";
      self.addMusicOnListener();
    });
  }

  addMusicOnListener() {
    const self = this;
    this.musicControl.addEventListener('click', function(evt) {
      self.musicOn();
      self.musicControl.className = "fa fa-music active-control";
      self.addMusicOffListener();
    });
  }

  addSoundOffListener() {
    const self = this;
    this.soundControl.addEventListener('click', function(evt) {
      self.soundMuted = true;
      self.soundControl.className = "fa fa-volume-off inactive-control";
      self.addSoundOnListener();
    });
  }

  addSoundOnListener() {
    const self = this;
    this.soundControl.addEventListener('click', function(evt) {
      self.soundMuted = false;
      self.soundControl.className = "fa fa-volume-up active-control";
      self.addSoundOffListener();
    });
  }

  musicOn() {
    this.music.play();
  }

  musicOff() {
    this.music.pause();
  }

  build() {
    if (!this.soundMuted) {
      this.sounds.src = "assets/sound/build.wav";
      this.sounds.play();
    }
  }

  invalid() {
    if (!this.soundMuted) {
      this.sounds.src = "assets/sound/invalid.wav";
      this.sounds.play();
    }
  }
}

export default Audio;
