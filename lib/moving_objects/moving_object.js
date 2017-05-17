
class MovingObject {
  constructor(start_pos, pos, vel, sprites, board) {
    this.start_pos = start_pos;
    this.pos = pos;
    this.vel = vel;
    this.sprites = sprites;
    this.board = board;
    this.spritesLocations = {
      pacmanLeft: [[800, 380, 40, 40], [800, 280, 40, 44], [800, 330, 40, 42], [800, 280, 40, 44]],
      pacmanRight: [[800, 0, 40, 44], [800, 100, 40, 40], [800, 50, 40, 42], [800, 100, 40, 40]],
      pacmanUp: [[800, 425, 40, 40], [800, 475, 40, 40], [800, 525, 40, 40], [800, 475, 40, 40] ],
      pacmanRespawning: [[335, 0, 40, 40], [335, 49, 40, 40], [335, 98, 40, 40], [335, 143, 40, 40], [335, 193, 40, 40], [335, 243, 40, 40], [335, 293, 40, 40], [335, 339, 40, 40], [335, 388, 40, 40], [335, 435, 40, 40], [335, 481, 40, 40]],
      pacmanDown: [[800, 145, 40, 40], [800, 237, 40, 42], [800, 189, 40, 40], [800, 237, 40, 42] ],
      blinkyLeft: [[610, 190, 40, 40], [610, 235, 40, 40]],
      blinkyRight: [[612, 3, 40, 43], [612, 48, 40, 43]],
      blinkyUp: [[612, 283, 40, 43], [612, 328, 40, 43]],
      blinkyDown: [[612, 95, 40, 43], [612, 143, 40, 43]],
      pinkyLeft: [[657, 190, 40, 40], [657, 235, 40, 40]],
      pinkyRight: [[659, 3, 40, 43], [659, 48, 40, 43]],
      pinkyUp: [[659, 283, 40, 43], [659, 328, 40, 43]],
      pinkyDown: [[659, 95, 40, 43], [659, 143, 40, 43]],
      inkyLeft: [[702, 190, 40, 40], [702, 235, 40, 40]],
      inkyRight: [[704, 3, 40, 43], [704, 48, 40, 43]],
      inkyUp: [[704, 283, 40, 43], [704, 328, 40, 43]],
      inkyDown: [[704, 95, 40, 43], [704, 143, 40, 43]],
      clydeLeft: [[749, 190, 40, 40], [749, 235, 40, 40]],
      clydeRight: [[751, 3, 40, 43], [751, 48, 40, 43]],
      clydeUp: [[751, 283, 40, 43], [751, 328, 40, 43]],
      clydeDown: [[751, 95, 40, 43], [751, 143, 40, 43]],
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
   var warpPosX = [this.board.levelDim[0][0]- 20 - 1, this.board.levelDim[0][1] + 20 + 3];
   if(this.pos[0] < warpPosX[0]){
     this.pos[0] = warpPosX[1];
   } else if(this.pos[0] > warpPosX[1]) {
     this.pos[0] = warpPosX[0];
   }
 }

}

module.exports = MovingObject;
