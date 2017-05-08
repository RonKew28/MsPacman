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

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/block.js'\n    at Error (native)");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/moving_objects/moving_object.js'\n    at Error (native)");

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

const StationaryObject = __webpack_require__(34);
const SmallDot = __webpack_require__(35);
const LargeDot = __webpack_require__(36);
const PlayerScore = __webpack_require__(37);

const Node = __webpack_require__(31);

class Board {
  constructor(grid, ctx, gtx, ptx, blinkytx, dotstx, scoretx) {
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
    this.dotstx = dotstx;
    this.scoretx = scoretx;

    this.movingObjectsArr = [];
    this.stationaryObjectsArr = [];
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
    var posX = $('#score-layer').position().left + 470;
    var posY = $('#score-layer').position().top + 230;
    var playerScore = new PlayerScore([posX, posY], this.sprites, this.dotstx, this.scoretx, this);
    this.stationaryObjects[['playerScore']] = playerScore;
  }

  initialize() {
    this.createScoreBoard();
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

    this.movingObjectsArr.forEach(function(movingObject) {
      movingObject.draw();
    });


  }


}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/moving_objects/pacman.js'\n    at Error (native)");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/game.js'\n    at Error (native)");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/game_view.js'\n    at Error (native)");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/grids.js'\n    at Error (native)");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/horizontal_border_single.js'\n    at Error (native)");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/left_lower_connector.js'\n    at Error (native)");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/left_upper_connector.js'\n    at Error (native)");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/left_vertical_border.js'\n    at Error (native)");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_horizontal_border.js'\n    at Error (native)");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_left_connector.js'\n    at Error (native)");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_left_corner.js'\n    at Error (native)");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_left_corner_single.js'\n    at Error (native)");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_right_connector.js'\n    at Error (native)");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_right_corner.js'\n    at Error (native)");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/lower_right_corner_single.js'\n    at Error (native)");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/right_lower_connector.js'\n    at Error (native)");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/right_upper_connector.js'\n    at Error (native)");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/right_vertical_border.js'\n    at Error (native)");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_horizontal_border.js'\n    at Error (native)");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_left_connector.js'\n    at Error (native)");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_left_corner.js'\n    at Error (native)");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_left_corner_single.js'\n    at Error (native)");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_right_connector.js'\n    at Error (native)");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_right_corner.js'\n    at Error (native)");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/upper_right_corner_single.js'\n    at Error (native)");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/blocks/vertical_border_single.js'\n    at Error (native)");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/moving_objects/blinky.js'\n    at Error (native)");

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

  var scoreEl = document.getElementById("score-layer");
  scoreEl.width = this.levelDimX;
  scoreEl.height = this.levelDimY;
  const scoretx = scoreEl.getContext("2d");


const board = new Board(grid.LEVEL_ONE_GRID, ctx, gtx, ptx, blinkytx, dotstx, scoretx);
board.drawGrid();
board.initialize();

const game = new Game(board, board.movingObjectsArr[1], board.movingObjectsArr[0], board.stationaryObjectsArr);
new GameView(game, ctx).start();




});


/***/ }),
/* 31 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/ronnie/Desktop/MsPacman/lib/node.js'\n    at Error (native)");

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports) {

class StationaryObject {
  constructor(pos, sprites, dotstx, scoretx) {
    this.pos = pos;
    this.sprites = sprites;
    this.dotstx = dotstx;
    this.scoretx = scoretx;
    this.spritesLocations = {
      smallDot: [392, 250, 14, 14],
      largeDot: [389, 295, 20, 20],
      playerScore: [389, 295, 20, 20]
    };
  }
}

module.exports = StationaryObject;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(34);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(34);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const StationaryObject = __webpack_require__(34);

class PlayerScore extends StationaryObject {
  constructor(pos, sprites, dotstx, scoretx) {
    super(pos, sprites, dotstx, scoretx);
    this.avatar = this.spritesLocations['playerScore'];
    this.score = 0;
  }

  drawScore() {
   this.scoretx.font = '25px arcadePixelated';
   this.scoretx.fillStyle = 'white';
   let scoreText = "Score: " + this.score;
   this.scoretx.fillText(scoreText, this.pos[0], this.pos[1] + 10);
 }


  draw() {
    this.scoretx.clearRect(0, 0, 1000, 1000);
    this.drawScore();
  }
}

module.exports = PlayerScore;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map