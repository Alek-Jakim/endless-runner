import { GameLoop } from "./components/gameLoop";
import { Player } from "./components/player";
import { Rect } from "./components/rect";
import { Input } from "./components/input";
import { Score } from "./components/score";
import { Obastacles } from "./components/obstacles";
import { getRandomInt, isCollidingRect } from "./utils";
import { C_WIDTH, C_HEIGHT } from "./constants";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.body.style.backgroundColor = "#3b3541";

canvas.style.width = C_WIDTH;
canvas.style.width = C_HEIGHT;

let gameStarted = false;
let gameOver = false;
let toggleText = true;

const player = new Player("player-spritesheet.png");
const input = new Input();
const score = new Score();
const obstacles = new Obastacles();

function resetGameState() {
  gameStarted = false;
  gameOver = false;
  toggleText = true;

  // reset
  score.default();
  obstacles.default();

  player.playAnimation("idle");
}

const floor = new Rect(
  -100,
  C_HEIGHT - 75,
  C_WIDTH + 100,
  75,
  "#5380a3",
  -100,
  C_HEIGHT - 75,
  C_WIDTH + 200,
  C_HEIGHT
);

function drawText(
  text,
  size = 48,
  color = "white",
  pos = [C_WIDTH / 2, C_HEIGHT / 2 - 100]
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
    // Increase score
    if (score.scoreClock.timer > score.scoreClock.interval) {
      score.current += 1;
      score.scoreClock.timer = 0;
    } else {
      score.scoreClock.timer += delta * 1000;
    }

    // Spawn obstacles
    if (obstacles.spawnClock.timer >= obstacles.spawnClock.interval) {
      obstacles.group.push(Rect.createRectObstacle(canvas));
      obstacles.spawnClock.timer = 0;
      obstacles.spawnClock.interval = getRandomInt(
        obstacles.intOne,
        obstacles.intTwo
      );
    } else {
      obstacles.spawnClock.timer += Math.round(delta * 1000);
    }

    if (obstacles.intervalClock.timer >= obstacles.intervalClock.interval) {
      obstacles.intervalClock.timer = 0;
      obstacles.reduceIntervals();
    } else {
      obstacles.intervalClock.timer += Math.round(delta * 1000);
    }
  }

  for (let obs of obstacles.group) {
    obs.update(delta);

    if (obs.x < -100) {
      obstacles.group.splice(obstacles.group.indexOf(obs), 1);
    }

    if (isCollidingRect(player, obs)) {
      player.gameOverSound.play();
      gameLoop.stop();
      player.runningSound.stop();
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
    for (let obs of obstacles.group) {
      obs.draw(ctx);
    }
  }

  if (toggleText && !gameOver) {
    drawText('Press "Enter" to Start');
  }

  drawText(`Score: ${score.current}`, 38, "white", [C_WIDTH - 150, 75]);
}

const gameLoop = new GameLoop(update, draw, ctx, C_WIDTH, C_HEIGHT);

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
