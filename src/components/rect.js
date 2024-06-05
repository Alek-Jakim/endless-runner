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
    lineWidth = 5
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
}
