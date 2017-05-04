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
    if (value === 0 || value === "P" || value === "I" || value === "N" || value === 8) {
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

}

module.exports = Board;
