export class Player {
  constructor(ctx, imagePath, scaleFactor = 1) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    this.image = new Image();
    this.image.src = imagePath;
    this.isLoaded = false;

    this.frameTimer = 0;
    this.staggerRate = 2.5;
    this.frameWidth = 192;
    this.frameHeight = 192;
    this.x = 0;
    this.y = this.canvasHeight - this.frameHeight - 46;

    this.numOfFrames = 10;
    this.frameX = 0;

    this.image.onload = () => {
      ctx.imageSmoothingEnabled = false;

      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      ctx.save();
      ctx.scale(scaleFactor, scaleFactor);

      this.draw(ctx);

      ctx.restore();
      this.isLoaded = true;
    };
  }

  draw(ctx) {
    if (!this.isLoaded) return;

    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }

  update(delta) {
    if (this.frameTimer > delta * this.staggerRate) {
      if (this.frameX >= this.numOfFrames - 1) {
        this.frameX = 0;
      } else {
        this.frameX++;
        this.frameTimer = 0;
      }
    } else {
      this.frameTimer += delta;
    }
  }
}
