import { Clock } from "./clock";

export class Score {
  constructor() {
    this.scoreClock = new Clock();

    this.default();
  }

  get current() {
    return this._current;
  }

  set current(value) {
    return (this._current = value);
  }

  default() {
    this.current = 0;
    this.scoreClock.timer = 0;
    this.scoreClock.interval = 1000;
  }
}
