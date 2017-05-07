const Game = require("./game");
const GameView = require("./game_view");
const Board = require('./board');
const Grids = require('./grids');

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
new GameView(game, this.ctx).start();




});
