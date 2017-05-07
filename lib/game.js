const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');

class Game {

  constructor(board, pacman, blinky) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
  }

}


module.exports = Game;
