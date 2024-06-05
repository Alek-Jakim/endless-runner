export class Player {
  constructor(ctx, imagePath, scaleFactor = 1) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    this.animations = {
      idle: {
        startFrameX: 0,
        endFrameX: 10,
      },
      run: {
        startFrameX: 10,
        endFrameX: 18,
      },
    };
    this.currentAnimation = "idle";

    this.image = new Image();
    this.image.src = imagePath;
    this.isLoaded = false;

    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
    this.staggerRate = 2.5;
    this.frameWidth = 192;
    this.frameHeight = 192;
    this.x = 100;
    this.y = this.canvasHeight - this.frameHeight - 46; // 46 is just to place it directly on ground

    this.endFrameX = 10;
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
      this.currentFrameX * this.frameWidth,
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
      if (
        this.currentFrameX >=
        this.animations[this.currentAnimation].endFrameX - 1
      ) {
        this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
      } else {
        this.currentFrameX++;
        this.frameTimer = 0;
      }
    } else {
      this.frameTimer += delta;
    }
  }

  playAnimation(animation) {
    this.currentAnimation = animation;
    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
  }
}
