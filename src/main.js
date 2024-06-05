import { GameLoop } from "./components/gameLoop";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.body.style.backgroundColor = "#3b3541";

canvas.style.width = 1280;
canvas.style.width = 720;

class Player {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.image = new Image();
    this.image.src = "player-spritesheet1.png";
    this.isLoaded = false;

    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.frameTimer = 0;
    this.staggerRate = 2.5;
    this.frameWidth = 144;
    this.frameHeight = 144;
    this.x = 0;
    this.y = this.canvasHeight - this.frameHeight;

    this.numOfFrames = 10;
    this.frameX = 0;
  }

  draw(ctx) {
    if (!this.isLoaded) return;
    // ctx.fillStyle = "white";
    // ctx.fillRect(this.x, this.y, this.frameWidth, this.frameHeight);

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

const player = new Player(canvas.width, canvas.height);

function update(delta) {
  // update game state here

  player.update(delta);
}

function draw() {
  // rect
  ctx.fillStyle = "#5380a3";
  ctx.strokeRect(0, canvas.height - 50, canvas.width, 50);
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

  // draw player - find out why image is squished
  player.draw(ctx);
}

const gameLoop = new GameLoop(update, draw, ctx, canvas.width, canvas.height);

gameLoop.start();
