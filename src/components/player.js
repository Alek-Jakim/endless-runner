import { Sound } from "./sound";
import { C_HEIGHT } from "../constants";
import { Clock } from "./clock";
export class Player {
  constructor(imagePath, x = 100, y) {
    this.isGameRunning = false;

    this.jumpSound = new Sound("jump-grunt.mp3");
    this.gameOverSound = new Sound("game-over-grunt.mp3");
    this.runningSound = new Sound("running.mp3", true);

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
      slide: {
        startFrameX: 21,
        endFrameX: 28,
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
    this.x = x;
    this.y = y ?? C_HEIGHT - this.height - 70;

    this.speed = 30;
    this.gravity = 1;
    this.velocityY = 0;
    this.endFrameX = 10;
    this.frameX = 0;

    this.slideClock = new Clock();
    this.slideClock.timer = 0;
    this.slideClock.interval = 1500;

    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  set setIsGameRunning(value) {
    this.isGameRunning = value;
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

  update(delta, gameRunning) {
    if (gameRunning && !this.isGameRunning) {
      this.isGameRunning = true;
    }

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
    if (this.y > C_HEIGHT - this.height - 46) {
      this.y = C_HEIGHT - this.height - 46;
    }

    if (this.isOnFloor() && this.isGameRunning) {
      this.playAnimation("run");
      this.runningSound.play();
    } else {
      this.playAnimation("idle");
      this.runningSound.stop();
    }

    if (!this.isOnFloor()) {
      this.playAnimation("jump");
    }
  }

  isOnFloor() {
    return this.y >= C_HEIGHT - this.height - 46;
  }

  jump() {
    this.velocityY -= 20;
  }

  playAnimation(animation) {
    if (this.currentAnimation === animation) return;

    this.currentAnimation = animation;
    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;
    this.frameTimer = 0;
  }
}
