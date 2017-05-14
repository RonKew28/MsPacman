const MovingObject = require('./moving_object');
const Util = require('../util');
const BreadthFirstSearch = require('../breadth_first_search');

class Pinky extends MovingObject {
  constructor(start_pos, pos, vel, sprites, board, pinkytx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.pinkytx = pinkytx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moved = false;
    this.animationFrame = 0;
    this.avatar = this.spritesLocations.pinkyLeft[this.animationFrame % 2];
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.path = [];

    this.frightened = false;
    this.eaten = false;
  }

  draw() {

    const pinkyImg = new Image();
    pinkyImg.src = 'sprites/mspacman_sprites_2.png';

    pinkyImg.onload = () => {
      let dx = 20;
      let dy = 20;

      this.pinkytx.clearRect(0, 0, 1000, 1000);
      this.move();

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - dx;
      var destY = this.pos[1] - dy;
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx * 2;
      var destHeight = dy * 2;
      this.pinkytx.drawImage(pinkyImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }

  move() {
    var pacman = this.board.movingObjectsArr[2];
    var blinky = this.board.movingObjectsArr[0];

    if (!blinky.moved || blinky.animationFrame < 14) {
      return;
    }

    if (pacman.respawning) {
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

    if (this.animationFrame === 350 || this.animationFrame % 350 < 245) {
      this.chase();

    } else {
      this.scatter();
    }

  }

  findPath(options) {
    let dx = 20;
    let dy = 20;
    var pacman = this.board.movingObjectsArr[2];
    var start = this.currentBlockPos(this.pos);

    if (Util.equals((pacman.currentBlockPos(pacman.pos)), (this.currentBlockPos(this.pos)))) {
      this.path = [this.currentBlockPos(this.pos)];
      return;
    }


    if (options && options.start) {
      start = options.start;
    }

    var startNode = this.board.nodes['' + JSON.stringify(start)];

    var dest;
    var pacmanVelX = Math.sign(pacman.vel[0]);
    var pacmanVelY = Math.sign(pacman.vel[1]);
    var counter = 4;
    dest = this.currentBlockPos([pacman.pos[0] + (pacmanVelX * dx * counter), pacman.pos[1] + (pacmanVelY * dx * counter)]);
    while (!this.board.nodes['' + JSON.stringify(dest)]) {
      counter -= 1;
      dest = this.currentBlockPos([pacman.pos[0] + (pacmanVelX * dx * counter), pacman.pos[1] + (pacmanVelY * dx * counter)]);
    }
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

  scatter() {
    var currentBlockPos = this.currentBlockPos(this.pos);
    var scatterDestPos = this.currentBlockPos([560,0]);

    if ( this.board.intersections['' + JSON.stringify(this.pos)] || Util.equals(this.vel, [0,0] )) {
      var currentNode = this.board.nodes['' + JSON.stringify(currentBlockPos)];
      var betterNode = "none";
      var smallestDistance = Infinity;

      if (this.board.cageNodes['' + JSON.stringify(this.pos)]) {
        currentNode = this.board.nodes['' + JSON.stringify(this.pos)];
      }

      currentNode.neighbors.forEach( function(neighbor) {
        let dx = Math.sign(neighbor.pos[0] - this.pos[0]);
        let dy = Math.sign(neighbor.pos[1] - this.pos[1]);
        if(this.isReverseDir(dx, dy)) {
          return;
        }

        let distance = Util.distance(neighbor.pos, scatterDestPos);
        if (distance <= smallestDistance) {
          betterNode = neighbor;
          smallestDistance = distance;
        }
      }.bind(this));

      this.vel = [Math.sign(betterNode.pos[0] - this.pos[0]) * 2, Math.sign(betterNode.pos[1] - this.pos[1]) * 2];
    }

    this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

  }



  chase() {
    var pacman = this.board.movingObjectsArr[2];
    var pacmanCurrentBlock = pacman.currentBlockPos(pacman.pos);

    var currentBlockPos = this.currentBlockPos(this.pos);

    if(this.board.intersections['' + JSON.stringify(this.pos)]) {
      this.findPath();
      var nextMove = this.path[this.path.length - 1];
      var velXDir = Math.sign(nextMove[0] - this.pos[0]) * 2;
      var velYDir = Math.sign(nextMove[1] - this.pos[1]) * 2;
      this.vel = [velXDir, velYDir];
    } else if (this.board.cageNodes['' + JSON.stringify(this.pos)]) {
      this.findPath({ start: this.pos });
      var nextMove = this.path[this.path.length - 1];
      var velXDir = Math.sign(nextMove[0] - this.pos[0]) * 2;
      var velYDir = Math.sign(nextMove[1] - this.pos[1]) * 2;
      this.vel = [velXDir, velYDir];
    }
    this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

  }

  changeAvatar(dx, dy) {
    if (dx === 1) {
      this.avatar = this.spritesLocations.pinkyRight[this.animationFrame % 2];
    } else if (dx === -1) {
      this.avatar = this.spritesLocations.pinkyLeft[this.animationFrame % 2];
    } else if (dy === 1) {
      this.avatar = this.spritesLocations.pinkyDown[this.animationFrame % 2];
    } else if (dy === -1) {
      this.avatar = this.spritesLocations.pinkyUp[this.animationFrame % 2];
    }
  }


}

module.exports = Pinky;
