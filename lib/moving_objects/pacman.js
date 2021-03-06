const MovingObject = require('./moving_object');
const Game = require('../game');
const GameView = require('../game_view');
const Util = require('../util');

class Pacman extends MovingObject {

  constructor(start_pos, pos, vel, sprites, board, ptx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.ptx = ptx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moveQueue = [];
    this.moved = false;
    this.respawning = false;
    this.animationFrame = 0;
    this.avatar = this.spritesLocations.pacmanLeft[this.animationFrame % 4];
    this.draw = this.draw.bind(this);
  }

  draw() {
    const pacmanImg = new Image();
    pacmanImg.src = 'sprites/mspacman_sprites_2.png';

    pacmanImg.onload = () => {
      let dx = 20;
      let dy = 20;
      this.move();
      this.warp();

      this.ptx.clearRect(0, 0, 1000, 1000);

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - dx;
      var destY = this.pos[1] - dy;
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx * 2;
      var destHeight = dy * 2;
      this.ptx.drawImage(pacmanImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
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

    if (this.board.wallCollisions['' + nextBlockPos] === 1) {
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

    if (this.respawning) {
      this.resetLevel();
      return;
    }
    this.eatDot();
    this.collideWithGhost();
    if (this.board.intersections['' + JSON.stringify(this.pos)]) {
      if (this.available_move(this.moveQueue[0]) !== 'false') {
        this.vel[0] = this.moveQueue[0][0];
        this.vel[1] = this.moveQueue[0][1];
      } else if (this.available_move(this.vel) === 'false') {
        this.vel[0] = 0;
        this.vel[1] = 0;
      }
    }
    this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
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

    eatDot() {
      let dx = 20;
      let dy = 20;
      if (this.board.stationaryObjects[this.pos] && this.board.stationaryObjects[this.pos].constructor.name === "SmallDot") {
        delete this.board.stationaryObjects[this.pos];
        this.dotstx.clearRect(this.pos[0] - (dx / 2), this.pos[1] - (dy / 2), dx, dy);
        this.board.scoreBoard.score += 10;
      } else if (this.board.stationaryObjects[this.pos] && this.board.stationaryObjects[this.pos].constructor.name === "LargeDot") {
        delete this.board.stationaryObjects[this.pos];
        this.dotstx.clearRect(this.pos[0] - (dx / 2), this.pos[1] - (dy / 2), dx, dy);
        this.board.stationaryObjects[[470, 230]].score += 50;
      }
    }

    isCloseTo(endPos) {
      let dx = 20;
      let distance = Util.distance(this.pos, endPos);
      return (distance < dx + 10) ? true : false;
    }

    collideWithGhost() {
      let that = this;
      $.each(this.board.movingObjectsArr, function(key, movingObject) {
        if (movingObject.constructor.name === "Blinky" && that.isCloseTo(movingObject.pos)) {
          that.respawning = true;
        }

        if (movingObject.constructor.name === "Pinky" && that.isCloseTo(movingObject.pos)) {
          that.respawning = true;
        }

        if (movingObject.constructor.name === "Inky" && that.isCloseTo(movingObject.pos)) {
          that.respawning = true;
        }

        if (movingObject.constructor.name === "Clyde" && that.isCloseTo(movingObject.pos)) {
          that.respawning = true;
        }
      });
    }

    resetLevel() {
      var start_pos = [281, 411];
      this.pos = start_pos;
      this.respawning = false;
      this.vel = [0,0];
      this.moved = false;
      this.animationFrame = 0;
      this.avatar = this.spritesLocations.pacmanLeft[this.animationFrame % 4];
      $.each(this.board.movingObjectsArr, function(key, movingObject) {
        if (movingObject.constructor.name === "Blinky") {
          var start_pos = [281, 291];
          movingObject.pos = start_pos;
          movingObject.vel = [0, 0];
          movingObject.animationFrame = 0;
          movingObject.moved = false;
          movingObject.avatar = this.spritesLocations.blinkyLeft[this.animationFrame % 2];
        }

        if (movingObject.constructor.name === "Pinky") {
          var start_pos = [281, 351];
          movingObject.pos = start_pos;
          movingObject.vel = [0, 0];
          movingObject.animationFrame = 0;
          movingObject.moved = false;
          movingObject.avatar = this.spritesLocations.pinkyLeft[this.animationFrame % 2];
        }

        if (movingObject.constructor.name === "Inky") {
          var start_pos = [241, 351];
          movingObject.pos = start_pos;
          movingObject.vel = [0, 0];
          movingObject.animationFrame = 0;
          movingObject.moved = false;
          movingObject.avatar = this.spritesLocations.inkyLeft[this.animationFrame % 2];
        }

        if (movingObject.constructor.name === "Clyde") {
          var start_pos = [321, 351];
          movingObject.pos = start_pos;
          movingObject.vel = [0, 0];
          movingObject.animationFrame = 0;
          movingObject.moved = false;
          movingObject.avatar = this.spritesLocations.clydeLeft[this.animationFrame % 2];
        }
      });

    }

    changeAvatar(dx, dy) {
      if (dx === 1) {
        this.avatar = this.spritesLocations.pacmanRight[this.animationFrame % 4];
      } else if (dx === -1) {
        this.avatar = this.spritesLocations.pacmanLeft[this.animationFrame % 4];
      } else if (dy === 1) {
        this.avatar = this.spritesLocations.pacmanDown[this.animationFrame % 4];
      } else if (dy === -1) {
        this.avatar = this.spritesLocations.pacmanUp[this.animationFrame % 4];
      }
    }

  }

module.exports = Pacman;
