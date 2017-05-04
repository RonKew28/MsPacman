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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
// const GameView = require("./game_view");
const Board = __webpack_require__(2);
const Grids = __webpack_require__(27);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const gtx = canvasEl.getContext("2d");
  const grid = new Grids();
  const board = new Board(grid.LEVEL_ONE_GRID, ctx, gtx);
  board.drawGrid();
  board.initialize();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);
const UpperLeftCorner = __webpack_require__(21);
const UpperRightCorner = __webpack_require__(24);
const LowerLeftCorner = __webpack_require__(11);
const LowerRightCorner = __webpack_require__(14);
const UpperHorizontalBorder = __webpack_require__(19);
const LowerHorizontalBorder = __webpack_require__(9);
const LeftVerticalBorder = __webpack_require__(8);
const RightVerticalBorder = __webpack_require__(18);
const UpperLeftConnector = __webpack_require__(20);
const UpperRightConnector = __webpack_require__(23);
const LowerLeftConnector = __webpack_require__(10);
const LowerRightConnector = __webpack_require__(13);
const LeftUpperConnector = __webpack_require__(7);
const LeftLowerConnector = __webpack_require__(6);
const RightUpperConnector = __webpack_require__(17);
const RightLowerConnector = __webpack_require__(16);
const UpperLeftCornerSingle = __webpack_require__(22);
const UpperRightCornerSingle = __webpack_require__(25);
const LowerLeftCornerSingle = __webpack_require__(12);
const LowerRightCornerSingle = __webpack_require__(15);
const HorizontalBorderSingle = __webpack_require__(5);
const VerticalBorderSingle = __webpack_require__(26);

class Board {
  constructor(grid, ctx, gtx) {
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

  addIntersection(posX, posY) {
    var intersectionPos = [posX, posY];
    this.intersections["" + JSON.stringify(intersectionPos)] = 1;
    this.intersectionsArray.push(intersectionPos);
  }

  isIntersection(x, y) {
    return (this.isBlankSquare(this.grid[y+1][x]) || this.isBlankSquare(this.grid[y-1][x]) && this.isBlankSqare(this.grid[y][x+1]) || this.isBlankSquare(this.grid[y][x-1]));
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

  initialize() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        this.buildWalls(x, y);
      }
    }

    this.blocks.forEach(function(block) {
      block.draw();
    });
  }

}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Game {

}

Game.DIM_X = 580;
Game.DIM_Y = 620;
Game.BG_COLOR = "#000000";

module.exports = Game;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const Block = __webpack_require__(4);

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
/* 27 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map