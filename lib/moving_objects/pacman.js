const MovingObject = require('./moving_object');

class Pacman extends MovingObject {

  constructor(start_pos, pos, vel, sprites, board, ptx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.ptx = ptx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moveQueue = [];
    this.moved = false;
    this.avatar = this.spritesLocations.pacman;
  }

  draw() {
    let dx = 20;
    let dy = 20;
    this.move();

    this.ptx.clearRect(0, 0, 1000, 1000);

    var sx = this.avatar[0];
    var sy = this.avatar[1];
    var destX = this.pos[0] - dx;
    var destY = this.pos[1] - dy;
    var sWidth = this.avatar[2];
    var sHeight = this.avatar[3];
    var destWidth = dx * 2;
    var destHeight = dy * 2;

    this.ptx.drawImage(this.sprites, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);

  }

  available_move(vel) {
    let dx = 20;
    let dy = 20;
    var nextBlockPos;
    var dir;
    if(Math.sign(vel[0]) === -1) {
      nextBlockPos = this.currentBlockPos([this.pos[0] - dx, this.pos[1]]);
      dir = [-1, 0];
    } else if (Math.sign(vel[0]) === 1) {
      nextBlockPos = this.currentBlockPos([this.pos[0] + dx, this.pos[1]]);
      dir = [1, 0];
    } else if (Math.sign(vel[1]) === -1) {
      nextBlockPos = this.currentBlockPos([this.pos[0], this.pos[1] - dy]);
      dir = [0, -1];
    } else if (Math.sign(vel[1]) === 1) {
      nextBlockPos = this.currentBlockPos([this.pos[0], this.pos[1] + dy]);
      dir = [0, 1];
    } else {
      nextBlockPos = this.pos;
      dir = [0, 0];
    }

    nextBlockPos = JSON.stringify(nextBlockPos);

    if (board.wallCollisions['' + nextBlockPos] === 1) {
      var nextBlockPos = JSON.parse(nextBlockPos);
      if(dir[0] === 1) {

          if((nextBlockPos[0] - this.pos[0]) <= dx) {
            this.vel[0] = 0;
            return "false";
          }

      } else if (dir[0] === -1) {

          if((this.pos[0] - nextBlockPos[0]) <= dx) {
            this.vel[0] = 0;
            return "false";
          }

      } else if (dir[1] === 1) {

          if((nextBlockPos[1] - this.pos[1]) <= dy) {
            this.vel[1] === 0;
            return "false";
          }

      } else if (dir[1] === -1) {

          if((this.pos[1] - nextBlockPos[1]) <= dy) {
            this.vel[1] === 0;
            return "false";
          }
      }

    }

    return true;
  }

  move() {
    if (this.board.intersections['' + JSON.stringify(this.pos)]) {
      if (this.available_move(this.moveQueue[0]) !== 'false') {
        this.vel[0] = this.moveQueue[0][0];
        this.vel[1] = this.moveQueue[0][1];
      } else if (this.available_move(this.vel) === 'false') {
        this.vel[0] = 0;
        this.vel[1] = 0;
      }
    }

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
  }

    is_turn(vel) {
      if(this.vel[0] === 0 && this.vel[1] === 0) {
        return false;
      }

      var current_dir = [Math.sign(this.vel[0]), Math.sign(this.vel[1])];
      var new_dir =[Math.sign(vel[0]), Math.sign(vel[1])];
      if (this.vel[0] === 0 && new_dir[1] === current_dir[1] * -1) {
        return false;
      }

      if (this.vel[1] === 0 && new_dir[0] === current_dir[0] * -1) {
        return false;
      }

      return true;
    }

    changeDirection(vel) {
      this.moveQueue.pop();
      this.moveQueue.push(vel);
      this.moved = true;
      if (this.available_move(vel) === "false") {
        return;
      }

      if(!this.is_turn(vel)) {
        this.vel[0] = vel[0];
        this.vel[1] = vel[1];
      }

    }

  }

module.exports = Pacman;