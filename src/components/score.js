import { Clock } from "./clock";

export class Score extends Clock {
  constructor() {
    super();
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
    this.timer = 0;
    this.interval = 1000;
  }
}
