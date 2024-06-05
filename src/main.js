import { GameLoop } from "./components/gameLoop";
import { Player } from "./components/player";
import { Rect } from "./components/rect";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.body.style.backgroundColor = "#3b3541";

canvas.style.width = 1280;
canvas.style.width = 720;

let gameStarted = false;

const player = new Player(ctx, "player-spritesheet.png", 10);

const floor = new Rect(
  -100,
  canvas.height - 75,
  canvas.width + 100,
  canvas.height,
  "#5380a3",
  -100,
  canvas.height - 75,
  canvas.width + 200,
  canvas.height
);

function update(delta) {
  // update game state here

  player.update(delta);
}

function draw() {
  floor.draw(ctx);

  player.draw(ctx);
}

const gameLoop = new GameLoop(update, draw, ctx, canvas.width, canvas.height);

gameLoop.start();

addEventListener("keypress", (e) => {
  if (e.code === "Space" && !gameStarted) {
    // start game
    gameStarted = true;
    player.playAnimation("run");
  }
});
