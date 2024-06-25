export class Clock {
  _timer;
  _interval;
  constructor(timer, interval) {
    this.timer = timer;
    this.interval = interval;
  }

  get timer() {
    return this._timer;
  }

  set timer(value) {
    this._timer = value;
  }

  get interval() {
    return this._interval;
  }

  set interval(value) {
    this._interval = value;
  }
}
