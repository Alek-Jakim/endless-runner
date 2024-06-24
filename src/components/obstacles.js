import { Clock } from "./clock";

export class Obastacles extends Clock {
  constructor() {
    super();
    this.default();
  }

  default() {
    this.group = [];
    this.timer = 0;
    this.interval = 0;
  }
}
