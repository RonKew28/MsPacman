
class MovingObject {
  constructor(start_pos, pos, vel, sprites, board) {
    this.start_pos = start_pos;
    this.pos = pos;
    this.vel = vel;
    this.sprites = sprites;
    this.board = board;
    this.spritesLocations = {
      pacman: [800, 380, 40, 40],
      blinky: [0, 196, 40, 40]
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

  warp() {
   var warpPosX = [this.board.levelDim[0][0]- 20 - 1, this.board.levelDim[0][1] + 20 + 3]
   if(this.pos[0] < warpPosX[0]){
     this.pos[0] = warpPosX[1];
   } else if(this.pos[0] > warpPosX[1]) {
     this.pos[0] = warpPosX[0];
   }
 }

}

module.exports = MovingObject;
