import { Clock } from "./clock";
import { getRandomInt } from "../utils";

export class Obastacles {
  intOne = 1000;
  intTwo = 2000;

  constructor() {
    this.spawnClock = new Clock();
    this.intervalClock = new Clock();

    this.default();
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
    this.spawnClock.timer = 0;
    this.spawnClock.interval = getRandomInt(this.intOne, this.intTwo);

    this.intervalClock.timer = 0;
    this.intervalClock.interval = 10000;

    this.intOne = 1000;
    this.intTwo = 2000;
  }
}
