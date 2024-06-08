export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function isCollidingRect(player, rect) {
  return !(
    player.x > rect.x + rect.width - 30 ||
    player.x + player.width / 2 + 40 < rect.x ||
    player.y > rect.y + rect.height ||
    player.y + player.height / 2 + 70 < rect.y
  );
}
