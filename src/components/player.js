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
      jump: {
        startFrameX: 18,
        endFrameX: 19,
      },
    };
    this.currentAnimation = "idle";

    this.image = new Image();
    this.image.src = imagePath;
    this.isLoaded = false;

    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
    this.staggerRate = 2.5;
    this.width = 192;
    this.height = 192;
    this.x = 100;

    this.speed = 30;
    this.gravity = 1;
    this.velocityY = 0;
    this.y = this.canvasHeight - this.height - 70;
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
      this.currentFrameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(delta) {
    //Animation
    if (this.frameTimer > delta * this.staggerRate) {
      if (
        this.currentFrameX >=
        this.animations[this.currentAnimation].endFrameX - 1
      ) {
        this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
      } else {
        this.currentFrameX++;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += delta;
    }

    // Jump logic
    this.y += this.velocityY;
    if (!this.isOnFloor()) {
      this.velocityY += this.gravity;
    } else {
      this.velocityY = 0;
    }
    if (this.y > this.canvasHeight - this.height - 50) {
      this.y = this.canvasHeight - this.height - 50;
    }
  }

  isOnFloor() {
    return this.y >= this.canvasHeight - this.height - 50;
  }

  jump() {
    this.velocityY -= 20;
  }

  playAnimation(animation) {
    this.currentAnimation = animation;
    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
  }
}