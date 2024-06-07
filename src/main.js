import { GameLoop } from "./components/gameLoop";
import { Player } from "./components/player";
import { Rect } from "./components/rect";
import { Input } from "./components/input";
import { getRandomInt } from "./utils";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.body.style.backgroundColor = "#3b3541";

canvas.style.width = 1280;
canvas.style.width = 720;

let gameStarted = false;
let toggleText = true;

const player = new Player(ctx, "player-spritesheet.png", 10, gameStarted);
const input = new Input();

let obstacles = [];
let obstacleTimer = 0;
let obstacleInterval = getRandomInt(1500, 3000);

const floor = new Rect(
  -100,
  canvas.height - 75,
  canvas.width + 100,
  75,
  "#5380a3",
  -100,
  canvas.height - 75,
  canvas.width + 200,
  canvas.height
);

function drawText() {
  ctx.font = "48px fontRetroGaming";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    'Press "Enter" to start',
    canvas.width / 2,
    canvas.height / 2 - 100
  );
}

function update(delta) {
  player.update(delta, gameStarted);

  // Spawn obstacles
  if (gameStarted) {
    if (obstacleTimer >= obstacleInterval) {
      obstacles.push(Rect.createRectObstacle(canvas));
      obstacleTimer = 0;
      obstacleInterval = getRandomInt(
        getRandomInt(500, 1500),
        getRandomInt(2000, 3000)
      );
    } else {
      obstacleTimer += Math.round(delta * 1000);
    }
  }

  console.log(obstacleInterval);

  for (let obs of obstacles) {
    obs.update(delta);

    if (obs.x < -100) {
      obstacles.splice(obstacles.indexOf(obs), 1);
    }
  }

  // Player animations
  if (input.pressedKey === "Space" && gameStarted && player.isOnFloor()) {
    player.jump();
  }
}

function draw() {
  floor.draw(ctx);

  player.draw(ctx);

  if (gameStarted && obstacles.length > 0) {
    for (let obs of obstacles) {
      obs.draw(ctx);
    }
  }

  if (toggleText) {
    drawText();
  }
}

const gameLoop = new GameLoop(update, draw, ctx, canvas.width, canvas.height);

gameLoop.start();

addEventListener("keypress", (e) => {
  if (e.code === "Enter" && !gameStarted) {
    // start game
    gameStarted = true;
    toggleText = false;
    player.playAnimation("run");
  }
});
