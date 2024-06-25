import { getRandomInt } from "../utils";

export class Bat {
  constructor(x, y = 400, imagePath) {
    this.image = new Image();
    this.image.src = imagePath;
    this.isLoaded = false;

    this.animations = {
      fly: {
        startFrameX: 0,
        endFrameX: 3,
      },
    };
    this.currentAnimation = "fly";

    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
    this.staggerRate = 5;
    this.x = x;
    this.y = y ?? 400;

    this.width = 150;
    this.height = 150;

    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  // obviously too much repetition - will refactor when I'm not feeling lazy
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

  update(delta, gameRunning) {
    if (gameRunning && !this.isGameRunning) {
      this.isGameRunning = true;
    }

    this.x -= getRandomInt(1300, 1500) * delta;

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
  }
}
