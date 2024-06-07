import { getRandomInt } from "../utils";

export class Rect {
  constructor(
    x = 0,
    y = 0,
    width = 50,
    height = 100,
    color = "white",
    strokeX = 0,
    strokeY = 0,
    strokeWidth = 0,
    strokeHeight = 0,
    strokeStyle = "white",
    lineWidth = 5,
    isObstacle = false
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.strokeX = strokeX;
    this.strokeY = strokeY;
    this.strokeWidth = strokeWidth;
    this.strokeHeight = strokeHeight;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.isObstacle = isObstacle;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      this.strokeX,
      this.strokeY,
      this.strokeWidth,
      this.strokeHeight
    );
  }

  update(delta) {
    if (!this.isObstacle) return;

    let randomSpeed = getRandomInt(500, 800);

    this.x -= randomSpeed * delta;
    this.strokeX -= randomSpeed * delta;
  }

  static createRectObstacle(canvas) {
    const colors = ["green", "blue", "red", "pink"];

    const randomHeight = getRandomInt(75, 100);
    const randomColor = colors[getRandomInt(0, colors.length - 1)];

    return new Rect(
      canvas.width + 300,
      canvas.height - 178,
      50,
      randomHeight,
      randomColor,
      canvas.width + 300,
      canvas.height - 178,
      50,
      randomHeight,
      "white",
      2,
      true
    );
  }
}
