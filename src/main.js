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

const player = new Player(ctx, "player-spritesheet.png", 10);
const input = new Input();
let currentTime = 0;

let obstacles = [];

function createObstacle() {
  const colors = ["green", "blue", "red", "pink"];

  const randomHeight = getRandomInt(75, 100);
  const randomColor = colors[getRandomInt(0, colors.length - 1)];

  return new Rect(
    canvas.width + 300,
    canvas.height - 178,
    50,
    randomHeight,
    randomColor,
    canvas.width + 300,
    canvas.height - 178,
    50,
    randomHeight,
    "white",
    2,
    true
  );
}

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
  player.update(delta);

  for (let obs of obstacles) {
    obs.update(delta);

    if (obs.x < -100) {
      obstacles.splice(obstacles.indexOf(obs), 1);
    }
  }

  if (obstacles.length) {
    console.log(obstacles[0].y);
  }

  // Player animations
  if (input.pressedKey === "Space" && gameStarted && player.isOnFloor()) {
    player.jump();
  }

  if (!player.isOnFloor() && player.currentAnimation !== "jump") {
    player.playAnimation("jump");
  }

  if (player.isOnFloor() && player.currentAnimation !== "run" && gameStarted) {
    player.playAnimation("run");
  }

  if (!gameStarted && player.currentAnimation !== "idle") {
    player.playAnimation("idle");
  }

  // Time in seconds
  currentTime = Math.floor(gameLoop._timestamp / 1000);
}

function draw() {
  floor.draw(ctx);

  player.draw(ctx);

  if (gameStarted) {
    if (currentTime % 3 === 0 && obstacles.length < 1) {
      const obs = createObstacle();
      obstacles.push(obs);
    }
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
