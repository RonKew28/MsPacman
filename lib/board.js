const Block = require('./blocks/block');
const UpperLeftCorner = require('./blocks/upper_left_corner');
const UpperRightCorner = require('./blocks/upper_right_corner');
const LowerLeftCorner = require('./blocks/lower_left_corner');
const LowerRightCorner = require('./blocks/lower_right_corner');
const UpperHorizontalBorder = require('./blocks/upper_horizontal_border');
const LowerHorizontalBorder = require('./blocks/lower_horizontal_border');
const LeftVerticalBorder = require('./blocks/left_vertical_border');
const RightVerticalBorder = require('./blocks/right_vertical_border');
const UpperLeftConnector = require('./blocks/upper_left_connector');
const UpperRightConnector = require('./blocks/upper_right_connector');
const LowerLeftConnector = require('./blocks/lower_left_connector');
const LowerRightConnector = require('./blocks/lower_right_connector');
const LeftUpperConnector = require('./blocks/left_upper_connector');
const LeftLowerConnector = require('./blocks/left_lower_connector');
const RightUpperConnector = require('./blocks/right_upper_connector');
const RightLowerConnector = require('./blocks/right_lower_connector');
const UpperLeftCornerSingle = require('./blocks/upper_left_corner_single');
const UpperRightCornerSingle = require('./blocks/upper_right_corner_single');
const LowerLeftCornerSingle = require('./blocks/lower_left_corner_single');
const LowerRightCornerSingle = require('./blocks/lower_right_corner_single');
const HorizontalBorderSingle = require('./blocks/horizontal_border_single');
const VerticalBorderSingle = require('./blocks/vertical_border_single');

const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');
const Blinky = require('./moving_objects/blinky');

const StationaryObject = require('./stationary_objects/stationary_object');
const SmallDot = require('./stationary_objects/small_dot');
const LargeDot = require('./stationary_objects/large_dot');
const PlayerScore = require('./stationary_objects/player_score');

const Node = require('./node');

class Board {
  constructor(grid, ctx, gtx, ptx, blinkytx, dotstx, scoretx, menutx) {
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
    this.menutx = menutx;

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

  initializeMenu() {
    var posX = $('#menu-layer').position().left + 470;
    var posY = $('#menu-layer').position().top + 230;
    this.menutx.strokeStyle = "#FF0000";
      this.menutx.beginPath();
      this.menutx.moveTo(0, 0);
      this.menutx.lineTo(posX, posY);
      this.menutx.stroke();
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

    this.movingObjectsArr.forEach(function(movingObject) {
      movingObject.draw();
    });


  }


}

module.exports = Board;
