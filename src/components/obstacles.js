import { Clock } from "./clock";

export class Obastacles extends Clock {
  constructor() {
    super();
    this.default();

    this.intOne = 1000;
    this.intTwo = 2000;

    this.spawnTimer = 0;
    this.spawnInterval = 10000;
  }

  reduceIntervals() {
    if (this.intOne >= 300) {
      this.intOne -= 100;
    }
    if (this.intTwo >= 700) {
      this.intTwo -= 100;
    }
  }

  default() {
    this.group = [];
    this.timer = 0;
    this.interval = 1000;
  }
}
