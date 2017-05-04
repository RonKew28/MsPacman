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


(function() {
  if (typeOf App === "undefined") {
    window.App = {};
  }

  var Boards = window.App.Boards = {};
  Boards.Blocks = [];
  Boards.Intersections = {};
  Boards.IntersectionArr = [];
  Boards.CageNodes = {};
  Boards.CageCorridor = {};
  Boards.WallCollisions = {};
  Boards.levelDim = [];
  Boards.GhostRespawn = [];
  Boards.Nodes = {};

  var BLOCK_DIM = App.Blocks.BLOCK_DIM;

  Board.prototype.drawGrid = function() {
    this.gtx.strokeStyle = 'grey';
    var dx = BLOCK_DIM[0];
    var dy = BLOCK_DIM[1];

    for (x = 0; x <= this.grid[0].length; x++) {
      startXPos = $('#grid-layer').position().left + (x * dx);
      startYPos = $('#grid-layer').position().top;
      endYPos = startYPos + (this.grid.length * dy);
      this.gtx.setLineDash([2, 3]);
      this.gtx.moveTo(startXPos, startYPos);
      this.gtx.lineTo(startXPos, endYPos);
    }

    for (y = 0; y <= this.grid.length; y++) {
      startXPos = $('#grid-layer').position().left;
      startYPos = $('#grid-layer').position().top + (y * dy);
      endXPos = startXPos + (this.grid[0].length * dx);
      this.gtx.setLineDash([2, 3]);
      this.gtx.moveTo(startXPos, startYPos);
      this.gtx.lineTo(endXPos, startYPos);
    }

    this.gtx.stroke();
  }

  Board.prototype.addWallCollision = function(x, y) {
    var CollisionPosX = $('#level-layer').position().left + 1 + (x * BLOCK_DIM[0]) + (BLOCK_DIM[0] / 2);
    var CollisionPosY = $('#level-layer').position().top + 1 + (y * BLOCK_DIM[1]) + (BLOCK_DIM[1] / 2);
    var collisionPos = [CollisionPosX, CollisionPosY];
    collisionPos = JSON.stringify(collisionPos);
    Boards.WallCollisions["" + collisionPos] = 1;
  }

  Board.prototype.isBlankSquare = function(value) {
    if (value === 0 || value === "P" || value === "I" || value === "N" || value === 8) {
      return true;
    }
  }

  Board.prototype.addIntersection = function(posX, posY) {
    var intersectionPos = [posX, posY];
    Boards.Intersections["" + JSON.stringify(intersectionPos)] = 1;
    Boards.IntersectionArr.push(intersectionPos];
  }

  Board.prototype.isIntersection = function(x, y) {
    return (this.isBlankSquare(this.grid[y+1][x]) || this.isBlankSquare(this.grid[y-1][x]) && this.isBlankSqare(this.grid[y][x+1]) || this.isBlankSquare(this.grid[y][x-1]))
  }

})();

module.exports = Board;
