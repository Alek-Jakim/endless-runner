export class Sound {
  constructor(path, loop = false) {
    this.audio = new Audio(path);
    this.audio.loop = loop;
    this.audio.currentTime = 0;
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
