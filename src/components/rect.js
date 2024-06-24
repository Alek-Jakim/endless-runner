import { C_HEIGHT } from "../constants";
import { getRandomInt } from "../utils";

export class Rect {
  static colors = [
    "green",
    "blue",
    "red",
    "pink",
    "purple",
    "grey",
    "orange",
    "cyan",
  ];

  constructor(
    x = 0,
    y = 0,
    width = 50,
    height = 100,
    color,
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

    this.gravity = 1;
    this.velocityY = 0;
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

    let randomSpeed = getRandomInt(1500, 1800);

    this.x -= randomSpeed * delta;
    this.strokeX -= randomSpeed * delta;

    // Jump logic
    this.y += this.velocityY;
    this.strokeY += this.velocityY;
    if (!this.isOnFloor()) {
      this.velocityY += this.gravity;
    } else {
      this.velocityY = 0;
    }
    if (this.y > C_HEIGHT - this.height - 46) {
      this.y = C_HEIGHT - this.height - 46;
    }
  }

  isOnFloor() {
    return this.y >= C_HEIGHT - this.height - 80;
  }

  static createRectObstacle(canvas) {
    const randomHeight = getRandomInt(75, 100);
    const randomColor = Rect.colors[getRandomInt(0, Rect.colors.length - 1)];

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
      Rect.colors["white"],
      2,
      true
    );
  }
}
