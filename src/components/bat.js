import { getRandomInt } from "../utils";

import { Entity } from "./entity";

export class Bat extends Entity {
  //x, y = 400, imagePath
  constructor(
    x,
    y,
    spriteSize,
    animations,
    currentAnimation,
    imagePath,
    staggerRate = 5
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

    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  update(delta, gameRunning) {
    if (gameRunning) {
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
