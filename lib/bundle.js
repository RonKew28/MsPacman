/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Block {
  constructor(pos, ctx, color) {
    this.ctx = ctx;
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'orange';
    this.ctx.setLineDash([0, 0]);
    this.width = 20;
    this.height = 20;
    this.posX = $('canvas').position().left + 1 + pos[0] * this.width;
    this.posY = $('canvas').position().top + 1 + pos[1] * this.height;
  }
}

module.exports = Block;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);
const UpperLeftCorner = __webpack_require__(23);
const UpperRightCorner = __webpack_require__(26);
const LowerLeftCorner = __webpack_require__(13);
const LowerRightCorner = __webpack_require__(16);
const UpperHorizontalBorder = __webpack_require__(21);
const LowerHorizontalBorder = __webpack_require__(11);
const LeftVerticalBorder = __webpack_require__(10);
const RightVerticalBorder = __webpack_require__(20);
const UpperLeftConnector = __webpack_require__(22);
const UpperRightConnector = __webpack_require__(25);
const LowerLeftConnector = __webpack_require__(12);
const LowerRightConnector = __webpack_require__(15);
const LeftUpperConnector = __webpack_require__(9);
const LeftLowerConnector = __webpack_require__(8);
const RightUpperConnector = __webpack_require__(19);
const RightLowerConnector = __webpack_require__(18);
const UpperLeftCornerSingle = __webpack_require__(24);
const UpperRightCornerSingle = __webpack_require__(27);
const LowerLeftCornerSingle = __webpack_require__(14);
const LowerRightCornerSingle = __webpack_require__(17);
const HorizontalBorderSingle = __webpack_require__(7);
const VerticalBorderSingle = __webpack_require__(28);

const MovingObject = __webpack_require__(1);
const Pacman = __webpack_require__(3);
const Blinky = __webpack_require__(29);

const Node = __webpack_require__(31);

class Board {
  constructor(grid, ctx, gtx, ptx, blinkytx, dotstx) {
    this.blocks = [];
    this.intersections = {};
    this.intersectionsArray = [];
    this.cageNodes = {};
    this.cageCorridor = {};
    this.wallCollisions = {};
    this.levelDim = [];
    this.ghostRespawn = [];
    this.nodes = {};

    this.grid = grid;
    this.ctx = ctx;
    this.gtx = gtx;
    this.ptx = ptx;
    this.blinkytx = blinkytx;
    this.dotstx = dotstx;

    this.movingObjectsArr = [];
    this.setBoardDims();

  }

  drawGrid() {
    this.gtx.strokeStyle = 'grey';
    var dx = 20;
    var dy = 20;

    for (let x = 0; x <= this.grid[0].length; x++) {
      let startXPos = $('#grid-layer').position().left + (x * dx);
      let startYPos = $('#grid-layer').position().top;
      let endYPos = startYPos + (this.grid.length * dy);
      this.gtx.setLineDash([2, 3]);
      this.gtx.moveTo(startXPos, startYPos);
      this.gtx.lineTo(startXPos, endYPos);
    }

    for (let y = 0; y <= this.grid.length; y++) {
      let startXPos = $('#grid-layer').position().left;
      let startYPos = $('#grid-layer').position().top + (y * dy);
      let endXPos = startXPos + (this.grid[0].length * dx);
      this.gtx.setLineDash([2, 3]);
      this.gtx.moveTo(startXPos, startYPos);
      this.gtx.lineTo(endXPos, startYPos);
    }

    this.gtx.stroke();
  }

  setBoardDims() {
    var dx = 20;
    var dy = 20;
    var dimX = this.grid[0].length;
    var dimY = this.grid.length;
    var startXPos = $("#grid-layer").position().left;
    var startYPos = $("#grid-layer").position().top;
    this.levelDim = [ [startXPos, startXPos + (dimX * dx)], [startYPos, startYPos + (dimY * dy)] ];
  }

  isOutOfBounds(pos) {
    if ( (pos[0] < this.levelDim[0][0] + 1) || (pos[0] > this.levelDim[0][1]) ) {
      return true;
    }
  }

  addWallCollision(x, y) {
    var dx = 20;
    var dy = 20;
    var collisionPosX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
    var collisionPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
    var collisionPos = [collisionPosX, collisionPosY];
    collisionPos = JSON.stringify(collisionPos);
    this.wallCollisions["" + collisionPos] = 1;
  }

  isBlankSquare(value) {
    if (value === 0 || value === "P" || value === "I" || value === "N" || value === 97 || value === 96) {
      return true;
    }
  }

  isCageObject(value) {
    if (value === "E" || value === "C" || value === "B") {
      return true;
    }
  }



  addIntersection(posX, posY) {
    var intersectionPos = [posX, posY];
    this.intersections["" + JSON.stringify(intersectionPos)] = 1;
    this.intersectionsArray.push(intersectionPos);
  }


  isIntersection(x, y) {
    return (this.isBlankSquare(this.grid[y+1][x]) || this.isBlankSquare(this.grid[y-1][x]) && this.isBlankSquare(this.grid[y][x+1]) || this.isBlankSquare(this.grid[y][x-1]));
  }

  buildWalls(x, y) {
    let pos = [x, y];
    let ctx = this.ctx;

    if(this.grid[y][x] === 1) {
      var block = new LeftVerticalBorder(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -1) {
      var block = new RightVerticalBorder(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 2) {
      var block = new UpperHorizontalBorder(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -2) {
      var block = new LowerHorizontalBorder(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 3) {
      var block = new UpperLeftConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -3) {
      var block = new LowerLeftConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 4) {
      var block = new UpperRightConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -4) {
      var block = new LowerRightConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 5) {
      var block = new UpperLeftCorner(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -5) {
      var block = new LowerLeftCorner(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 6) {
      var block = new UpperRightCorner(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -6) {
      var block = new LowerRightCorner(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 7) {
      var block = new UpperLeftCornerSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -7) {
      var block = new LowerLeftCornerSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 8) {
      var block = new UpperRightCornerSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === -8) {
      var block = new LowerRightCornerSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 9) {
      var block = new HorizontalBorderSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 10) {
      var block = new VerticalBorderSingle(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 11) {
      var block = new LeftUpperConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 12) {
      var block = new LeftLowerConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 13) {
      var block = new RightUpperConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }

    if(this.grid[y][x] === 14) {
      var block = new RightLowerConnector(pos, ctx);
      this.blocks.push(block);
      this.addWallCollision(x, y);
    }
  }

  initializeMovingObjects(x, y) {
    let dx = 20;
    let dy = 20;

    if(this.grid[y][x] === "P") {
      var posX = $('#level-layer').position().left + 1 + (x * dx) + dx;
      var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
      var msPacman = new Pacman([posX, posY], [posX, posY], [0,0], this.sprites, this, this.ptx, this.gtx, this.dotstx);
      this.movingObjectsArr.push(msPacman);
    }

    if(this.grid[y][x] === "B") {

      var posX = $('#level-layer').position().left + 1 + (x * dx) + dx;
      var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
      var blinky = new Blinky([posX, posY], [posX, posY], [0,0], this.sprites, this, this.blinkytx, this.gtx, this.dotstx);
      this.movingObjectsArr.push(blinky);
    }
  }

  initializeNodes(x, y) {
    let dx = 20;
    let dy = 20;
    if(this.isBlankSquare(this.grid[y][x])) {
      var posX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
      var posY = $('#level-layer').position().top  + 1 + (y * dy) + (dy / 2);
      var node = new Node([posX, posY]);
      this.nodes['' + JSON.stringify([posX, posY])] = node;

      if(this.isBlankSquare(this.grid[y][x + 1])) {
        var neighborPosX = $("#level-layer").position().left + 1 + ((x + 1) * dx) + (dx / 2);
        var neighborPosY = $("#level-layer").position().top + 1 + (y * dy) + (dy / 2);
        node.addNeighbor(new Node([ neighborPosX, neighborPosY]));
      }

      if(this.isBlankSquare(this.grid[y][x - 1])) {
        var neighborPosX = $("#level-layer").position().left + 1 + ((x - 1) * dx) + (dx / 2);
        var neighborPosY = $("#level-layer").position().top + 1 + (y * dy) + (dy / 2);
        node.addNeighbor(new Node([ neighborPosX, neighborPosY]));
      }

      if(this.isBlankSquare(this.grid[y + 1][x])) {
        var neighborPosX = $("#level-layer").position().left + 1 + (x * dx) + (dx / 2);
        var neighborPosY = $("#level-layer").position().top + 1 + ((y + 1) * dy) + (dy / 2);
        node.addNeighbor(new Node([ neighborPosX, neighborPosY]));
      }

      if(this.isBlankSquare(this.grid[y - 1][x])) {
        var neighborPosX = $("#level-layer").position().left + 1 + (x * dx) + (dx / 2);
        var neighborPosY = $("#level-layer").position().top + 1 + ((y - 1) * dy) + (dy / 2);
        node.addNeighbor(new Node([ neighborPosX, neighborPosY]));
      }

      if(this.isCageObject(this.grid[y][x + 1])) {
        var neighborPosX = $('#level-layer').position().left + 1 + ((x + 1) * dx) + dx;
        var neighborPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
        var neighborNode = new Node([neighborPosX, neighborPosY]);

        var dividerNodePosX = $('#level-layer').position().left + 1 + ((x + 1) * dx) + (dx / 2);
        var dividerNodePosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
        var dividerNode = new Node([dividerNodePosX, dividerNodePosY]);

        dividerNode.addNeighbor(neighborNode);
        dividerNode.addNeighbor(node);
        node.addNeighbor(dividerNode);
        this.nodes['' + JSON.stringify([dividerNodePosX, dividerNodePosY])] = dividerNode;
      }

      if(this.isCageObject(this.grid[y][x - 1])) {
        var neighborPosX = $('#level-layer').position().left + 1 + ((x - 2) * dx) + dx;
        var neighborPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
        var neighborNode = new Node([neighborPosX, neighborPosY]);

        var dividerNodePosX = $('#level-layer').position().left + 1 + ((x - 1) * dx) + (dx / 2);
        var dividerNodePosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
        var dividerNode = new Node([dividerNodePosX, dividerNodePosY]);

        dividerNode.addNeighbor(neighborNode);
        dividerNode.addNeighbor(node);
        node.addNeighbor(dividerNode);
        this.nodes['' + JSON.stringify([dividerNodePosX, dividerNodePosY])] = dividerNode;
      }

      if (this.isIntersection(x, y)) {
        var xPosX = $('#level-layer').position().left + 1 + (x * dx) + (dy / 2);
        var xPosY = $('#level-layer').position().left + 1 + (y * dy) + (dy / 2);
        this.addIntersection(xPosX, xPosY);
      }

    }
  }

  initializeCage(x, y) {
    let dx = 20;
    let dy = 20;
     if(this.isCageObject(this.grid[y][x]) && !this.isCageObject(this.grid[y][x-1])) {
          var posX = $('#level-layer').position().left + 1 + (x * dx) + dx;
          var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
          var node = new Node([posX, posY]);
          this.nodes['' + JSON.stringify([posX, posY])] = node;

          if(this.isBlankSquare(this.grid[y][x + 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + ((x + 1) * dx) + (dx / 2);
            var neighborPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }
          if(this.isBlankSquare(this.grid[y][x - 1])) {
            var neighborPosX = $('#level-layer').position().left + 1 + ((x - 1) * dx) + (dx / 2);
            var neighborPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            var dividerNodePosX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
            var dividerNodePosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
            var dividerNode = new Node([dividerNodePosX, dividerNodePosY]);
            node.addNeighbor(dividerNode);
          }

          if(this.isBlankSquare(this.grid[y + 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
            var neighborPosY = $('#level-layer').position().top + 1 + ((y + 1) * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isBlankSquare(this.grid[y - 1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
            var neighborPosY = $('#level-layer').position().top + 1 + ((y - 1) * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isCageObject(this.grid[y][x +1])) {
            if(this.isBlankSquare(this.grid[y][x + 2])) {
              var neighborPosX = $('#level-layer').position().left + 1 + ((x + 2) * dx) + (dx / 2);
              var neighborPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
              var neighborNode =  new Node([neighborPosX, neighborPosY]);

              var dividerNodePosX = $('#level-layer').position().left + 1 + ((x + 1) * dx) + (dx / 2);
              var dividerNodePosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
              var dividerNode = new Node([dividerNodePosX, dividerNodePosY]);
              node.addNeighbor(dividerNode);
            }
          }

          if(this.isCageObject(this.grid[y-1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x * dx) + dx;
            var neighborPosY = $('#level-layer').position().top + 1 + ((y -1) * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }

          if(this.isCageObject(this.grid[y+1][x])) {
            var neighborPosX = $('#level-layer').position().left + 1 + (x * dx) + dx;
            var neighborPosY = $('#level-layer').position().top + 1 + ((y + 1) * dy) + (dy / 2);
            var neighborNode =  new Node([neighborPosX, neighborPosY]);
            node.addNeighbor(neighborNode);
          }
          var intersectionPos = JSON.stringify([posX, posY]);
          this.cageNodes["" + intersectionPos] = 1;
        }

        if(this.isCageObject(this.grid[y][x])) {
          var posX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
          var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
          this.cageCorridor['' + JSON.stringify([posX, posY])] = 1;
        }
  }

  initialize() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        this.buildWalls(x, y);
        this.initializeNodes(x, y);
        this.initializeCage(x, y);
        this.initializeMovingObjects(x, y);
      }
    }

    this.blocks.forEach(function(block) {
      block.draw();
    });

    this.movingObjectsArr.forEach(function(movingObject) {
      movingObject.draw();
    });
  }


}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);

class Pacman extends MovingObject {

  constructor(start_pos, pos, vel, sprites, board, ptx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.ptx = ptx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moveQueue = [];
    this.moved = false;
    this.avatar = this.spritesLocations.pacman;
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const MovingObject = __webpack_require__(1);
const Pacman = __webpack_require__(3);
const Blinky = __webpack_require__(29);

class Game {

  constructor(board, pacman, blinky) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.movingObjects = [pacman, blinky];
  }

}


module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers() {
    var player = this.game.pacman;
    var blinky = this.game.blinky;
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { player.changeDirection(move); });
    });
  }

  start() {
    var gameView = this;
    this.game.board.drawGrid();
    this.game.board.initialize();

    this.timerId = setInterval(
        function () {
          gameView.game.movingObjects.forEach(function(movingObject) {
            movingObject.draw();
          });
        }, 1000 / 60
    );
    this.bindKeyHandlers();
  }

}

GameView.MOVES = {
  "w": [0, -2],
  "a": [-2, 0],
  "s": [0, 2],
  "d": [1, 0],
  "up": [0, -2],
  "down": [0, 2],
  "left": [-2, 0],
  "right": [2, 0],
};

module.exports = GameView;


/***/ }),
/* 6 */
/***/ (function(module, exports) {


class Grids {
	constructor() {
		this.LEVEL_ONE_GRID =
		[
		[5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
		[1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 9, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, 9, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, 10, 98, 98, 10, 0, 10, 98, 98, 98, 10, 0, 10, 10, 0, 10, 98, 98, 98, 10, 0, 10, 98, 98, 10, 0, -1],
		[1, 0, -7, 9, 9, -8, 0, -7, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, -8, 0, -7, 9, 9, -8, 0, -1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 8, 0, 7, 9, 9, 9, 9, 9, 9, 8, 0, 7, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 9, -8, 0, 10, 10, 0, -7, 9, 9, 8, 7, 9, 9, -8, 0, 10, 10, 0, -7, 9, 9, -8, 0, -1],
		[1, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, -1],
		[-5, -2, -2, -2, -2, 8, 0, 10, -7, 9, 9, 8, 97, 10, 10, 97, 7, 9, 9, -8, 10, 0, 7, -2, -2, -2, -2, -6],
		[98, 98, 98, 98, 98, 1, 0, 10, 7, 9, 9, -8, 97, -7, -8, 97, -7, 9, 9, 8, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 97, 97, 97, "B", "C", 97, 97, 97, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 7, -2, -2, "C", "C", -2, -2, 8, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[2, 2, 2, 2, 2, -8, 0, -7, -8, 97, -1, 99, 99, "C", "C", 99, 99, 1, 97, -7, -8, 0, -7, 2, 2, 2, 2, 2],
		[97, 97, 97, 97, 97, 97, 0, 97, 97, 97, -1, "I", 97, "E", "C", 97, "N", 1, 97, 97, 97, 0, 97, 97, 97, 97, 97, 97],
		[-2, -2, -2, -2, -2, 8, 0, 7, 8, 97, -1, 99, 99, 99, 99, 99, 99, 1, 97, 7, 8, 0, 7, -2, -2, -2, -2, -2],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, -7, 2, 2, 2, 2, 2, 2, -8, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 97, 97, 97, "P", 97, 97, 97, 97, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 7, 9, 9, 9, 9, 9, 9, 8, 97, 10, 10, 0, -1,98, 98, 98, 98, 98],
		[5, 2, 2, 2, 2, -8, 0, -7, -8, 97, -7, 9, 9, 8, 7, 9, 9, -8, 97, -7, -8, 0, -7, 2, 2, 2, 2, 6],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 9, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, 9, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 8, 10, 0, -7, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, -8, 0, 10, 7, 9, -8, 0, -1],
		[1, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, -1],
		[11, 9, 8, 0, 10, 10, 0, 7, 8, 0, 7, 9, 9, 9, 9, 9, 9, 8, 0, 7, 8, 0, 10, 10, 0, 7, 9, 13],
		[12, 9, -8, 0, -7, -8, 0, 10, 10, 0, -7, 9, 9, 8, 7, 9, 9, -8, 0, 10, 10, 0, -7, -8, 0, -7, 9, 14],
		[1, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 9, 9, -8, -7, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, -8, -7, 9, 9, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 9, 9, 9, 9, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, 9, 9, 9, 9, 9, -8, 0, -1],
		[1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, -1],
		[-5, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -6],
	];
	}
}

module.exports = Grids;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class HorizontalBorderSingle extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.stroke();
  }
}

module.exports = HorizontalBorderSingle;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LeftLowerConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1*Math.PI, 1.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LeftLowerConnector;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LeftUpperConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 1*Math.PI, 0.5*Math.PI, true);
    this.ctx.stroke();
  }
}

module.exports = LeftUpperConnector;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LeftVerticalBorder extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.stroke();
  }
}

module.exports = LeftVerticalBorder;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerHorizontalBorder extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.stroke();
  }
}

module.exports = LowerHorizontalBorder;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerLeftConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerLeftConnector;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerLeftCorner extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX + this.width, this.posY, this.width, 1*Math.PI, 0.5*Math.PI, true);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 1*Math.PI, 0.5*Math.PI, true);
    this.ctx.stroke();
  }
}

module.exports = LowerLeftCorner;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerLeftCornerSingle extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 0.5*Math.PI, 1*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerLeftCornerSingle;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerRightConnector extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 0.5*Math.PI, 1*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerRightConnector;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerRightCorner extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.width, 0, 0.5*Math.PI, false);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerRightCorner;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class LowerRightCornerSingle extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerRightCornerSingle;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class RightLowerConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
    this.ctx.stroke();
  }
}

module.exports = RightLowerConnector;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class RightUpperConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = RightUpperConnector;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class RightVerticalBorder extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + this.width, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.stroke();
  }
}

module.exports = RightVerticalBorder;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperHorizontalBorder extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.stroke();
  }
}

module.exports = UpperHorizontalBorder;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperLeftConnector extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
    this.ctx.stroke();
  }
}

module.exports = UpperLeftConnector;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperLeftCorner extends Block {


  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width, 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.stroke();
  }
}

module.exports = UpperLeftCorner;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperLeftCornerSingle extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1*Math.PI, 1.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = UpperLeftCornerSingle;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperRightConnector extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.posX + this.width, this.posY);
    this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 1*Math.PI, true);
    this.ctx.stroke();
  }
}

module.exports = UpperRightConnector;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperRightCorner extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY + this.height, this.width, 1.5*Math.PI, 0, false);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
    this.ctx.stroke();
  }
}

module.exports = UpperRightCorner;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class UpperRightCornerSingle extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
    this.ctx.stroke();
  }
}

module.exports = UpperRightCornerSingle;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);

class VerticalBorderSingle extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.stroke();
  }
}

module.exports = VerticalBorderSingle;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(32);
const BreadthFirstSearch = __webpack_require__(33);

class Blinky extends MovingObject {
  constructor(start_pos, pos, vel, sprites, board, blinkytx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.blinkytx = blinkytx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moved = false;
    this.avatar = this.spritesLocations.blinky;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
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

  findPath(options) {
    let dx = 20;
    let dy = 20;
    var pacman = this.board.movingObjectsArr[1];
    var start = this.currentBlockPos(this.pos);

    if ((pacman.currentBlockPos(pacman.pos)) === (this.currentBlockPos(this.pos))) {
      this.path = [this.currentBlockPos(this.pos)];
      return;
    }

    var startNode = this.board.nodes['' + JSON.stringify(start)];
    var dest = this.currentBlockPos(pacman.pos);

    if (options && options.start) {
      start = options.start;
    }

    if (options && options.offset) {
      var dirX = Math.sign(pacman.vel[0]);
      var dirY = Math.sign(pacman.vel[1]);
      var offsetDest = [dest[0] + dirX + (options.offset * dx), dest[1] + (dirY * 2 * dx)];
      if (this.board.nodes['' + JSON.stringify(offsetDest)]) {
        dest = [dest[0] + (dirX * options.offset * dx), dest[1] + (dirY * 2 * dx)]
      }
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
    } else if (this.board.cageNodes['' + JSON.stringify(this.pos)]) {

      this.findPath({ start: this.pos, offset: 1});
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


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(5);
const Board = __webpack_require__(2);
const Grids = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", function(){

  const grid = new Grids();
  this.levelDimX = grid.LEVEL_ONE_GRID[0].length * 20 + 2;
  this.levelDimY = grid.LEVEL_ONE_GRID.length * 20 + 2;

  var playerEl = document.getElementById("player-layer");
  playerEl.width = this.levelDimX;
  playerEl.height = this.levelDimY;
  const ptx = playerEl.getContext("2d");

  var gridEl = document.getElementById("grid-layer");
  gridEl.width = this.levelDimX;
  gridEl.height = this.levelDimY;
  const gtx = gridEl.getContext("2d");

  var dotsEl = document.getElementById("dots-layer");
  dotsEl.width = this.levelDimX;
  dotsEl.height = this.levelDimY;
  const dotstx = dotsEl.getContext("2d");

  var canvasEl = document.getElementById("level-layer");
  canvasEl.width = this.levelDimX;
  canvasEl.height = this.levelDimY;
  const ctx = canvasEl.getContext("2d");

  var blinkyEl = document.getElementById("blinky-layer");
  blinkyEl.width = this.levelDimX;
  blinkyEl.height = this.levelDimY;
  const blinkytx = blinkyEl.getContext("2d");


const board = new Board(grid.LEVEL_ONE_GRID, ctx, gtx, ptx, blinkytx, dotstx);
board.drawGrid();
board.initialize();

const game = new Game(board, board.movingObjectsArr[1], board.movingObjectsArr[0]);
new GameView(game, ctx).start();




});


/***/ }),
/* 31 */
/***/ (function(module, exports) {


class Node {
  constructor(pos) {
    this.neighbors = [];
    this.pos = pos;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}

module.exports = Node;


/***/ }),
/* 32 */
/***/ (function(module, exports) {



const Util = {

  distance(start, dest) {
    var dx = Math.abs(start[0] - dest[0]);
    var dy = Math.abs(start[1] - dest[1]);
    return dx + dy;
  },

  isEmpty(arr) {
    return arr.length === 0;
  },

  equals(arr1, arr2) {
    if (arr1 && arr2 && (arr1[0] === arr2[0] && arr1[1] === arr2[1])) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = Util;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(32);
const Node = __webpack_require__(31);
const Board = __webpack_require__(2);

class BreadthFirstSearch {
  constructor(node, start, dest, board) {
    this.node = node;
    this.start = start;
    this.dest = dest;
    this.board = board;
    this.queue = [];
    this.parents = {};
    this.initializeQueue = this.initializeQueue.bind(this);
  }

  initializeQueue() {
    this.queue.push(this.node);
  }

  findParents() {
    this.initializeQueue();
    this.parents[this.start] = "none";
    while (!Util.isEmpty(this.queue)) {
      var currentNode = this.queue.shift();
      if(Util.equals(currentNode.pos, this.dest)) {
        break;
      }
      let board = this.board;
      let queue = this.queue;
      let parents = this.parents;

      currentNode.neighbors.forEach(function (neighbor) {

        if (!parents['' + JSON.stringify(neighbor.pos)]) {
          var newNode = board.nodes['' + JSON.stringify(neighbor.pos)];

          queue.push(newNode);
          parents[JSON.stringify(neighbor.pos)] = currentNode;
        }

      });
    }
    return this.parents;

  }

  createPath(parents, start, dest) {

    var current = dest;
    var path = [current];

    while (!(Util.equals(current, start))) {
      current = parents['' + JSON.stringify(current)].pos;

      path.push(current);
    }

    return path;
  }


}

module.exports = BreadthFirstSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map