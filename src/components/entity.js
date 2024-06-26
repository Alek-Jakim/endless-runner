export class Entity {
  #isLoaded = false;
  #frameTimer = 0;
  #isGameRunning = false;

  constructor(
    x,
    y,
    spriteSize,
    animations,
    currentAnimation = "idle",
    imagePath,
    staggerRate = 2.5
  ) {
    this.x = x;
    this.y = y;
    this.spriteSize = spriteSize;

    this.animations = animations;
    this.currentAnimation = currentAnimation;
    this.currentFrameX = this.animations[this.currentAnimation].startFrameX;

    this.image = new Image();
    this.image.src = imagePath;

    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.staggerRate = staggerRate;
  }

  get isGameRunning() {
    return this.#isGameRunning;
  }

  set isGameRunning(value) {
    this.#isGameRunning = value;
  }

  get frameTimer() {
    return this.#frameTimer;
  }

  set frameTimer(value) {
    this.#frameTimer = value;
  }

  get isLoaded() {
    return this.#isLoaded;
  }

  set isLoaded(value) {
    this.#isLoaded = value;
  }

  draw(ctx) {
    if (!this.isLoaded) return;

    ctx.drawImage(
      this.image,
      this.currentFrameX * this.spriteSize.width,
      0,
      this.spriteSize.width,
      this.spriteSize.height,
      this.x,
      this.y,
      this.spriteSize.width,
      this.spriteSize.height
    );
  }
}
