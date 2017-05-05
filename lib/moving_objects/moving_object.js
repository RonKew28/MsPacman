
class MovingObject {
  constructor(start_pos, pos, vel, sprites, board) {
    this.start_pos = start_pos;
    this.pos = pos;
    this.vel = vel;
    this.sprites = sprites;
    this.board = board;
    this.spritesLocations = {
      pacman: [852, 400, 48, 50]
    };
  }

  currentBlockPos(pos) {
    let dx = 20;
    let dy = 20;
    let closestBlockXPos = Math.floor((pos[0] - 1) / dx);
    let closestBlockYPos = Math.floor((pos[1] - 1) / dy);
    var currentBlockXPos = (dx * closestBlockXPos) + (dx / 2) + 1;
    var currentBlockYPos = (dy * closestBlockYPos) + (dy / 2) + 1;
    return [currentBlockXPos, currentBlockYPos];
  }

}

module.exports = MovingObject;
