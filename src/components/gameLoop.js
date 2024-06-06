export class GameLoop {
  constructor(update, draw, ctx, cWidth, cHeight) {
    this.lastFrameTime = 0;
    this.update = update;
    this.draw = draw;

    this.requestAnimFrameId = null;
    this.isRunning = false;

    this.ctx = ctx;
    this.cWidth = cWidth;
    this.cHeight = cHeight;

    this._timestamp = 0;
  }

  get timestamp() {
    return this._timestamp;
  }

  set setTimestamp(ts) {
    this._timestamp = ts;
  }

  main = (timestamp) => {
    if (!this.isRunning) return;

    this.setTimestamp = timestamp;

    const delta = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;

    this.clearCanvas(this.ctx, this.cWidth, this.cHeight);

    this.update(delta);

    this.draw();

    this.requestAnimFrameId = requestAnimationFrame(this.main);
  };

  start() {
    console.log("hehe");
    if (!this.isRunning) {
      this.isRunning = true;
      this.requestAnimFrameId = requestAnimationFrame(this.main);
    }
  }

  stop() {
    if (this.requestAnimFrameId) {
      cancelAnimationFrame(this.requestAnimFrameId);
    }
    this.isRunning = false;
  }

  clearCanvas(ctx, cWidth, cHeight) {
    ctx.clearRect(0, 0, cWidth, cHeight);
  }
}
