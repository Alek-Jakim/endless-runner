import { GameLoop } from "./components/gameLoop";
import { Player } from "./components/player";
import { Rect } from "./components/rect";
import { Input } from "./components/input";
import { getRandomInt, isCollidingRect } from "./utils";
import { Sound } from "./components/sound";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.body.style.backgroundColor = "#3b3541";

canvas.style.width = 1280;
canvas.style.width = 720;

let gameStarted = false;
let gameOver = false;
let toggleText = true;
let score = 0;
let scoreTimer = 0;
let scoreInterval = 500;

const player = new Player(ctx, "player-spritesheet.png", 10, gameStarted);
const input = new Input();

function resetGameState() {
  gameStarted = false;
  gameOver = false;
  toggleText = true;
  score = 0;
  scoreTimer = 0;
  scoreInterval = 500;

  obstacles = [];
  obstacleTimer = 0;
  obstacleInterval = getRandomInt(1500, 3000);

  player.playAnimation("idle");
}

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

function drawText(
  text,
  size = 48,
  color = "white",
  pos = [canvas.width / 2, canvas.height / 2 - 100]
) {
  ctx.font = `${size}px fontRetroGaming`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, pos[0], pos[1]);
}

function update(delta) {
  player.update(delta, gameStarted);

  // Update score
  if (gameStarted && !gameOver) {
    if (scoreTimer > scoreInterval) {
      score += 1;
      scoreTimer = 0;
    } else {
      scoreTimer += delta * 1000;
    }
  }

  // Spawn obstacles
  if (gameStarted) {
    if (obstacleTimer >= obstacleInterval && obstacles.length < 1) {
      obstacles.push(Rect.createRectObstacle(canvas));
      obstacleTimer = 0;
      obstacleInterval = getRandomInt(
        getRandomInt(500, 1200),
        getRandomInt(1500, 2000)
      );
    } else {
      obstacleTimer += Math.round(delta * 1000);
    }
  }

  for (let obs of obstacles) {
    obs.update(delta);

    if (obs.x < -100) {
      obstacles.splice(obstacles.indexOf(obs), 1);
    }

    if (isCollidingRect(player, obs)) {
      player.gameOverSound.play();
      gameLoop.stop();
      gameOver = true;
      drawText('Game Over! Press "Space" to Restart', 48, "red");
      player.setIsGameRunning = false;
    }
  }

  // Player animations
  if (input.pressedKey === "Space" && gameStarted && player.isOnFloor()) {
    player.jump();
    player.jumpSound.play();
  }
}

function draw() {
  floor.draw(ctx);

  player.draw(ctx);

  if (gameStarted) {
    for (let obs of obstacles) {
      obs.draw(ctx);
    }
  }

  if (toggleText && !gameOver) {
    drawText('Press "Enter" to Start');
  }

  drawText(`Score: ${score}`, 38, "white", [canvas.width - 150, 75]);
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

  if (e.code === "Space" && gameOver) {
    gameLoop.reset(resetGameState);
  }
});
