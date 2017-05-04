const Game = require("./game");
// const GameView = require("./game_view");
const Board = require('./board');
const Grids = require('./grids');

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const gtx = canvasEl.getContext("2d");
  const grid = new Grids();
  const board = new Board(grid.LEVEL_ONE_GRID, ctx, gtx);
  board.drawGrid();
});
