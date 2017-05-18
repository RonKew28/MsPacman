const Util = require('../util');
const BreadthFirstSearch = require('../breadth_first_search');

class MovingObject {
  constructor(start_pos, pos, vel, sprites, board) {
    this.start_pos = start_pos;
    this.pos = pos;
    this.vel = vel;
    this.sprites = sprites;
    this.board = board;
    this.spritesLocations = {
      pacmanLeft: [[800, 377, 40, 44], [800, 283, 40, 44], [800, 330, 40, 44], [800, 283, 40, 44]],
      pacmanRight: [[800, 2, 40, 44], [800, 98, 40, 44], [800, 49, 40, 44], [800, 96, 40, 44]],
      pacmanUp: [[800, 424, 40, 44], [800, 472, 40, 44], [800, 520, 40, 44], [800, 472, 40, 44] ],
      pacmanRespawning: [[335, 0, 40, 40], [335, 49, 40, 40], [335, 98, 40, 40], [335, 143, 40, 40], [335, 193, 40, 40], [335, 243, 40, 40], [335, 293, 40, 40], [335, 339, 40, 40], [335, 388, 40, 40], [335, 435, 40, 40], [335, 481, 40, 40]],
      pacmanDown: [[800, 143, 40, 44], [800, 235, 40, 44], [800, 189, 40, 44], [800, 236, 40, 44] ],
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
      fleeingFast: [[0, 515, 40, 43], [50, 515, 40, 43]],
      fleeing: [[0, 515, 40, 43], [0, 560, 40, 43]],
      respawnLeft: [[280, 330, 40, 40]],
      respawnRight: [[280, 240, 40, 40]],
      respawnUp: [[280, 375, 40, 40]],
      respawnDown: [[280, 285, 40, 40]]

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

  currentCageNode() {
    let dx = 20;
    let dy = 20;
    var nearGridY = Math.floor((this.pos[1]-1)/dy);
    var blockX= this.pos[0];
    var blockY = dy * nearGridY + (dy / 2) + 1;
    return [blockX, blockY];
  }

  inCage() {
    if (this.board.cageNodes["" + JSON.stringify(this.pos)] || this.board.cageNodes["" + JSON.stringify(this.currentBlockPos(this.pos))] || this.board.cageNodes["" + JSON.stringify(this.currentCageNode(this.pos))] ) {
      return true;
    }
    return false;
  }

  warp() {
   var warpPosX = [this.board.levelDim[0][0]- 20 - 1, this.board.levelDim[0][1] + 20 + 3];
   if(this.pos[0] < warpPosX[0]){
     this.pos[0] = warpPosX[1];
   } else if(this.pos[0] > warpPosX[1]) {
     this.pos[0] = warpPosX[0];
   }
 }

 findRegenerationPath(options) {
   let dx = 20;
   let dy = 20;
   var pacman = this.board.movingObjectsArr[4];
   var start = this.currentBlockPos(this.pos);

   if (Util.equals((pacman.currentBlockPos(pacman.pos)), (this.currentBlockPos(this.pos)))) {
     this.path = [this.currentBlockPos(this.pos)];
     return;
   }

   var startNode = this.board.nodes['' + JSON.stringify(start)];
   var dest = this.currentBlockPos(pacman.pos);

   if (options && options.start) {
     start = options.start;
   }

   if (options && options.dest) {
     dest = options.dest;
   }

   if (options && options.offset) {
     var dirX = Math.sign(pacman.vel[0]);
     var dirY = Math.sign(pacman.vel[1]);
     var offsetDest = [dest[0] + dirX + (options.offset * dx), dest[1] + (dirY * 2 * dx)];
     if (this.board.nodes['' + JSON.stringify(offsetDest)]) {
       dest = [dest[0] + (dirX * options.offset * dx), dest[1] + (dirY * 2 * dx)];
     }
   }

   var newSearch = new BreadthFirstSearch(startNode, start, dest, this.board);
   var parentNodes = newSearch.findParents();
   this.path = newSearch.createPath(parentNodes, start, dest);
   this.path.pop();
 }

}

module.exports = MovingObject;
