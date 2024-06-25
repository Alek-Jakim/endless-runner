import { GameLoop } from "./components/gameLoop";
import { Player } from "./components/player";
import { Rect } from "./components/rect";
import { Input } from "./components/input";
import { Score } from "./components/score";
import { Bat } from "./components/bat";
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
      const randomObstacle = getRandomInt(0, 1);

      if (randomObstacle === 0) {
        obstacles.group.push(Rect.createRectObstacle(canvas));
      } else {
        obstacles.group.push(new Bat(C_WIDTH + 100, 425, "bat.png"));
      }

      obstacles.spawnClock.timer = 0;
      obstacles.spawnClock.interval = getRandomInt(
        obstacles.intOne,
        obstacles.intTwo
      );
    } else {
      obstacles.spawnClock.timer += Math.round(delta * 1000);
    }

    // Reduce the spawn intervals
    if (obstacles.intervalClock.timer >= obstacles.intervalClock.interval) {
      obstacles.intervalClock.timer = 0;
      obstacles.reduceIntervals();
    } else {
      obstacles.intervalClock.timer += Math.round(delta * 1000);
    }

    // Make obstacles faster
    if (Rect.speedClock.timer >= Rect.speedClock.interval) {
      Rect.speedClock.timer = 0;
      Rect.increaseSpeed();
    } else {
      Rect.speedClock.timer += Math.round(delta * 1000);
    }

    if (player.isSliding) {
      if (player.slideClock.timer >= player.slideClock.interval) {
        player.slideClock.timer = 0;
        player.isSliding = false;
      } else {
        player.slideClock.timer += Math.round(delta * 1000);
      }
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
      player.playAnimation("idle");
    }
  }

  // Player jump
  if (
    input.pressedKey === "Space" &&
    gameStarted &&
    player.isOnFloor() &&
    !player.isSliding
  ) {
    player.jump();
    player.jumpSound.play();
  }

  // Player slide
  if (input.pressedKey === "KeyK" && gameStarted && player.isOnFloor()) {
    player.isSliding = true;
  }

  if (player.isSliding && gameStarted) {
    player.playAnimation("slide");
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
    player.isSliding = false;
    gameLoop.reset(resetGameState);
  }
});
