const MovingObject = require('./moving_object');
const Util = require('../util');
const BreadthFirstSearch = require('../breadth_first_search');

class Blinky extends MovingObject {
  constructor(start_pos, pos, vel, sprites, board, blinkytx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.blinkytx = blinkytx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moved = false;
    this.avatar = this.spritesLocations.blinky;
    this.draw = this.draw.bind(this);
    this.path = [];
  }

  draw() {

    const blinkyImg = new Image();
    blinkyImg.src = 'sprites/mspacman_sprites_2.png';

    blinkyImg.onload = () => {
      let dx = 20;
      let dy = 20;

      this.blinkytx.clearRect(0, 0, 1000, 1000);
      this.move();

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - dx;
      var destY = this.pos[1] - dy;
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx * 2;
      var destHeight = dy * 2;
      this.blinkytx.drawImage(blinkyImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }

  move() {
    var pacman = this.board.movingObjectsArr[1];
    if (!pacman.moved) {
      return;
    }

    if (!this.moved) {
      this.moved = true;
    }

    if(this.board.isOutOfBounds(this.pos)) {
      this.warp();
      this.pos[0] = this.pos[0] + this.vel[0];
      this.pos[1] = this.pos[1] + this.vel[1];
      return;
    }

    this.chase();
  }

  findPath() {
    var pacman = this.board.movingObjectsArr[1];
    var start = this.currentBlockPos(this.pos);
    if ((pacman.currentBlockPos(pacman.pos)) === (this.currentBlockPos(this.pos))) {
      this.path = [this.currentBlockPos(this.pos)];
      return;
    }

    var startNode = this.board.nodes['' + JSON.stringify(start)];
    var dest = this.currentBlockPos(this.pos);

    var newSearch = new BreadthFirstSearch(startNode, start, dest, this.board);
    var parentNodes = newSearch.findParents();
    this.path = newSearch.createPath(parentNodes, start, dest);
    this.path.pop();
  }

  isReverseDir(signDx, signDy) {
    var signVelX = Math.sign(this.vel[0]);
    var signVelY = Math.sign(this.vel[1]);

    if ((signVelX === 1 && signDx === -1) || (signVelX === -1 && signDx === 1) || (signVelY === 1 && signDy === -1) || (signVelY === -1 && signDy === 1)) {
      return true;
    }
  }

  bestNextMove(dest) {

    var currentBlockPos = this.currentBlockPos(this.pos);
    var currentNode = this.board.nodes['' + JSON.stringify(currentBlockPos)];
    var bestNextNode = "none";
    var smallestDistance = Infinity;

    currentNode.neighbors.forEach( function(neighbor) {
      var signDx = Math.sign(neighbor.pos[0] - this.pos[0]);
      var signDy = Math.sign(neighbor.pos[1] - this.pos[1]);

      if (this.isReverseDir(signDx, signDy)) {
        return;
      }

      var currentDistance = Util.distance(neighbor.pos, dest);

      if (currentDistance <= smallestDistance) {
        bestNextNode = neighbor;
        smallestDistance = currentDistance;
      }
    });

    return bestNextNode.pos;
  }

  chase() {
    var pacman = this.board.movingObjectsArr[1];
    var pacmanCurrentBlock = pacman.currentBlockPos(pacman.pos);
    var currentBlockPos = this.currentBlockPos(this.pos);

    if(this.board.intersections['' + JSON.stringify(this.pos)]) {
      this.findPath();
      var nextMove = this.path[this.path.length - 1];
      var velXDir = Math.sign(nextMove[0] - this.pos[0]) * 2;
      var velYDir = Math.sign(nextMove[1] - this.pos[1]) * 2;
      this.vel = [velXDir, velYDir];
    }

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

  }


}

module.exports = Blinky;