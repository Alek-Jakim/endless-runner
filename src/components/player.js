import { Sound } from "./sound";
import { C_HEIGHT } from "../constants";
import { Clock } from "./clock";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(
    x,
    y,
    spriteSize,
    animations,
    currentAnimation,
    imagePath,
    staggerRate
  ) {
    super(
      x,
      y,
      spriteSize,
      animations,
      currentAnimation,
      imagePath,
      staggerRate
    );

    this.jumpSound = new Sound("jump-grunt.mp3");
    this.gameOverSound = new Sound("game-over-grunt.mp3");
    this.runningSound = new Sound("running.mp3", true);
    this.slideSound = new Sound("sliding.mp3");

    this.gravity = 1;
    this.velocityY = 0;

    this.slideClock = new Clock();
    this.slideClock.timer = 0;
    this.slideClock.interval = 500;
    this.isSliding = false;
  }

  update(delta, gameRunning) {
    if (gameRunning) {
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
    if (this.y > C_HEIGHT - this.spriteSize.height - 46) {
      this.y = C_HEIGHT - this.spriteSize.height - 46;
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
    return this.y >= C_HEIGHT - this.spriteSize.height - 46;
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
