export class Clock {
  constructor(timer = 0, interval = 1000) {
    this._timer = timer;
    this._interval = interval;
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
