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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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

class StationaryObject {
  constructor(pos, sprites, dotstx, scoretx, board) {
    this.pos = pos;
    this.sprites = sprites;
    this.dotstx = dotstx;
    this.scoretx = scoretx;
    this.board = board;
    this.spritesLocations = {
      smallDot: [392, 250, 14, 14],
      largeDot: [389, 295, 20, 20],
      playerScore: [389, 295, 20, 20]
    };
  }
}

module.exports = StationaryObject;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


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
      pacmanDown: [[800, 145, 40, 40], [800, 237, 40, 42], [800, 189, 40, 40], [800, 237, 40, 42] ],
      blinkyLeft: [[610, 190, 40, 40], [610, 235, 40, 40]],
      blinkyRight: [[612, 3, 40, 43], [612, 48, 40, 43]],
      blinkyUp: [[612, 283, 40, 43], [612, 328, 40, 43]],
      blinkyDown: [[612, 95, 40, 43], [612, 143, 40, 43]],
      pinkyLeft: [[657, 190, 40, 40], [657, 235, 40, 40]],
      pinkyRight: [[659, 3, 40, 43], [659, 48, 40, 43]],
      pinkyUp: [[659, 283, 40, 43], [659, 328, 40, 43]],
      pinkyDown: [[659, 95, 40, 43], [659, 143, 40, 43]],
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(0);
const UpperLeftCorner = __webpack_require__(29);
const UpperRightCorner = __webpack_require__(32);
const LowerLeftCorner = __webpack_require__(19);
const LowerRightCorner = __webpack_require__(22);
const UpperHorizontalBorder = __webpack_require__(27);
const LowerHorizontalBorder = __webpack_require__(17);
const LeftVerticalBorder = __webpack_require__(16);
const RightVerticalBorder = __webpack_require__(26);
const UpperLeftConnector = __webpack_require__(28);
const UpperRightConnector = __webpack_require__(31);
const LowerLeftConnector = __webpack_require__(18);
const LowerRightConnector = __webpack_require__(21);
const LeftUpperConnector = __webpack_require__(15);
const LeftLowerConnector = __webpack_require__(14);
const RightUpperConnector = __webpack_require__(25);
const RightLowerConnector = __webpack_require__(24);
const UpperLeftCornerSingle = __webpack_require__(30);
const UpperRightCornerSingle = __webpack_require__(33);
const LowerLeftCornerSingle = __webpack_require__(20);
const LowerRightCornerSingle = __webpack_require__(23);
const HorizontalBorderSingle = __webpack_require__(13);
const VerticalBorderSingle = __webpack_require__(34);

const MovingObject = __webpack_require__(2);
const Pacman = __webpack_require__(8);
const Blinky = __webpack_require__(7);
const Pinky = __webpack_require__(38);

const StationaryObject = __webpack_require__(1);
const SmallDot = __webpack_require__(11);
const LargeDot = __webpack_require__(10);
const PlayerScore = __webpack_require__(37);

const Node = __webpack_require__(9);

class Board {
  constructor(grid, ctx, gtx, ptx, blinkytx, pinkytx, dotstx, scoretx, menutx) {
    this.blocks = [];
    this.intersections = {};
    this.intersectionsArray = [];
    this.cageNodes = {};
    this.cageCorridor = {};
    this.wallCollisions = {};
    this.stationaryObjects = {};
    this.levelDim = [];
    this.ghostRespawn = [];
    this.nodes = {};

    this.grid = grid;
    this.ctx = ctx;
    this.gtx = gtx;
    this.ptx = ptx;
    this.blinkytx = blinkytx;
    this.pinkytx = pinkytx;
    this.dotstx = dotstx;
    this.scoretx = scoretx;
    this.menutx = menutx;

    this.movingObjectsArr = [];
    this.stationaryObjectsArr = [];
    this.scoreBoard = null;
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

    if(this.grid[y][x] === "E") {
      var posX = $('#level-layer').position().left + 1 + (x * dx) + dx;
      var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
      var pinky = new Pinky([posX, posY], [posX, posY], [0,0], this.sprites, this, this.pinkytx, this.gtx, this.dotstx);
      this.movingObjectsArr.push(pinky);
    }
  }

  initializeNodes(x, y) {
    let dx = 20;
    let dy = 20;
    if(this.isBlankSquare(this.grid[y][x]) && y !== 0 && y !== 1 && y !== 2 && y !== 34 && y !== 35) {
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
        var xPosX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
        var xPosY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
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
            var neighborPosY = $('#level-layer').position().top + 1 + ((y - 1) * dy) + (dy / 2);
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

  createDots(x, y) {
    let dx = 20;
    let dy = 20;
    if (this.grid[y][x] === 0) {
      var posX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
      var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
      var dot = new SmallDot([posX, posY], this.sprites, this.dotstx);
      this.stationaryObjects[[posX, posY]] = dot;
    }

    if (this.grid[y][x] === 96) {
      var posX = $('#level-layer').position().left + 1 + (x * dx) + (dx / 2);
      var posY = $('#level-layer').position().top + 1 + (y * dy) + (dy / 2);
      var dot = new LargeDot([posX, posY], this.sprites, this.dotstx);
      this.stationaryObjects[[posX, posY]] = dot;
    }
  }

  createScoreBoard() {
    var posX = $('#level-layer').position().left + 430;
    var posY = $('#level-layer').position().top + 20;
    var playerScore = new PlayerScore([posX, posY], this.sprites, this.dotstx, this.scoretx, this);
    this.scoreBoard = playerScore;
    this.scoreBoard.score = 0;
  }

  initializeMenu() {
    var posX = $('#menu-layer').position().left;
    var posY = $('#menu-layer').position().top;
    this.menutx.fillStyle = "#FF0000";
    this.menutx.fillRect(20, 20, 300, 300);

  }

  initialize() {
    this.createScoreBoard();
    this.initializeMenu();
    let statObjs = this.stationaryObjects;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        this.buildWalls(x, y);
        this.createDots(x, y);
        this.initializeNodes(x, y);
        this.initializeCage(x, y);
        this.initializeMovingObjects(x, y);
      }
    }

    this.blocks.forEach(function(block) {
      block.draw();
    });
    Object.keys(statObjs).forEach(function(key) {
      var stationaryObject = statObjs[key];
      stationaryObject.draw();
    });



  }


}

module.exports = Board;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const MovingObject = __webpack_require__(2);
const Pacman = __webpack_require__(8);
const Blinky = __webpack_require__(7);
const Pinky = __webpack_require__(38);
const StationaryObject = __webpack_require__(1);
const smallDot = __webpack_require__(11);
const largeDot = __webpack_require__(10);

class Game {

  constructor(board, pacman, blinky, pinky, playerScore) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.pinky = pinky;
    this.playerScore = playerScore;
    this.movingObjects = [pacman, blinky, pinky, playerScore];
  }

}


module.exports = Game;


/***/ }),
/* 6 */
/***/ (function(module, exports) {


class GameView {
  constructor(game, ctx, menutx) {
    this.game = game;
    this.ctx = ctx;
    this.menutx = menutx;
    this.gameStart = false;
  }

  bindKeyHandlers() {
    var player = this.game.pacman;
    var blinky = this.game.blinky;
    var pinky = this.game.pinky;
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { player.changeDirection(move); });
    });
  }

  start() {
    var gameView = this;
    var statObjs = this.game.stationaryObjects;


    this.timerId = setInterval(

        function () {
          gameView.game.movingObjects.forEach(function(movingObject) {
            movingObject.draw();
          });

        }, 1000 / 60
    );

    this.animationId = setInterval(
      function() {
        $.each(gameView.game.movingObjects, function(objectKey, object) {
          if(object.moved) {
            object.animationFrame += 1;
          }
        });
      }, 1000 / 15
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(4);
const BreadthFirstSearch = __webpack_require__(35);

class Blinky extends MovingObject {
  constructor(start_pos, pos, vel, sprites, board, blinkytx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.blinkytx = blinkytx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moved = false;
    this.animationFrame = 0;
    this.avatar = this.spritesLocations.blinkyLeft[this.animationFrame % 2];
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.path = [];

    this.frightened = false;
    this.eaten = false;
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
    var pacman = this.board.movingObjectsArr[2];
    if (pacman && !pacman.moved) {
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
        dest = [dest[0] + (dirX * options.offset * dx), dest[1] + (dirY * 2 * dx)];
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

  scatter() {
    var currentBlockPos = this.currentBlockPos(this.pos);
    var scatterDestPos = this.currentBlockPos([0,0]);

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
    if(Util.equals(this.pos, pacmanCurrentBlock)) {

      let nextMove = this.bestNextMove(pacman.pos);
      this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2];
      this.pos[0] = this.pos[0] + this.vel[0];
      this.pos[1] = this.pos[1] + this.vel[1];
      return;
    }

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
    this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

  }

  changeAvatar(dx, dy) {
    if (dx === 1) {
      this.avatar = this.spritesLocations.blinkyRight[this.animationFrame % 2];
    } else if (dx === -1) {
      this.avatar = this.spritesLocations.blinkyLeft[this.animationFrame % 2];
    } else if (dy === 1) {
      this.avatar = this.spritesLocations.blinkyDown[this.animationFrame % 2];
    } else if (dy === -1) {
      this.avatar = this.spritesLocations.blinkyUp[this.animationFrame % 2];
    }
  }


}

module.exports = Blinky;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Game = __webpack_require__(5);
const GameView = __webpack_require__(6);
const Util = __webpack_require__(4);

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
          movingObject.avatar = this.spritesLocations.blinkyLeft[this.animationFrame % 2];
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


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(1);

class LargeDot extends StationaryObject {
  constructor(pos, sprites, dotstx) {
    super(pos, sprites, dotstx);
    this.avatar = this.spritesLocations['largeDot'];
  }

  draw() {
    const largeDotImg = new Image();
    largeDotImg.src = 'sprites/mspacman_sprites_2.png';
    largeDotImg.onload = () => {
      let dx = 20;
      let dy = 20;

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - (dx / 2);
      var destY = this.pos[1] - (dy / 2);
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx;
      var destHeight = dy;

      this.dotstx.clearRect(destX, destY, destWidth, destHeight);
      this.dotstx.drawImage(largeDotImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }
}

module.exports = LargeDot;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(1);

class SmallDot extends StationaryObject {
  constructor(pos, sprites, dotstx) {
    super(pos, sprites, dotstx);
    this.avatar = this.spritesLocations['smallDot'];
  }

  draw() {
    const smallDotImg = new Image();
    smallDotImg.src = 'sprites/mspacman_sprites_2.png';
    smallDotImg.onload = () => {
      let dx = 20;
      let dy = 20;

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - (dx / 4);
      var destY = this.pos[1] - (dy / 4);
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx / 2;
      var destHeight = dy / 2;

      this.dotstx.clearRect(destX, destY, destWidth, destHeight);
      this.dotstx.drawImage(smallDotImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }
}

module.exports = SmallDot;


/***/ }),
/* 12 */
/***/ (function(module, exports) {


class Grids {
	constructor() {
		this.LEVEL_ONE_GRID =
		[
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
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
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
	];
}
}

module.exports = Grids;


/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const Node = __webpack_require__(9);
const Board = __webpack_require__(3);

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


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);
const GameView = __webpack_require__(6);
const Board = __webpack_require__(3);
const Grids = __webpack_require__(12);

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

  var pinkyEl = document.getElementById("pinky-layer");
  pinkyEl.width = this.levelDimX;
  pinkyEl.height = this.levelDimY;
  const pinkytx = pinkyEl.getContext("2d");

  var scoreEl = document.getElementById("score-layer");
  scoreEl.width = this.levelDimX;
  scoreEl.height = this.levelDimY;
  const scoretx = scoreEl.getContext("2d");

  var menuEl = document.getElementById("menu-layer");
  menuEl.width = this.levelDimX;
  menuEl.height = this.levelDimy;
  const menutx = menuEl.getContext("2d");


const board = new Board(grid.LEVEL_ONE_GRID, ctx, gtx, ptx, blinkytx, pinkytx, dotstx, scoretx, menutx);
board.initialize();
board.drawGrid();
const game = new Game(board, board.movingObjectsArr[2], board.movingObjectsArr[0], board.movingObjectsArr[1], board.scoreBoard);
new GameView(game, ctx).start();




});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(1);

class PlayerScore extends StationaryObject {
  constructor(pos, sprites, dotstx, scoretx, board) {
    super(pos, sprites, dotstx, scoretx);
    this.avatar = this.spritesLocations['playerScore'];
    this.board = board;
    this.drawScore = this.drawScore.bind(this);
    this.score;
  }

  drawScore() {
   this.scoretx.font = '25px arcadePixelated';
   this.scoretx.fillStyle = 'white';
   let scoreText = "Score: " + this.board.scoreBoard.score;
   this.scoretx.fillText(scoreText, this.pos[0], this.pos[1] + 10);
 }


  draw() {
    this.scoretx.clearRect(0, 0, 1000, 1000);
    this.drawScore();
  }
}

module.exports = PlayerScore;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(4);
const BreadthFirstSearch = __webpack_require__(35);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map