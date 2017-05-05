const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');

class Game {

  constructor(board, pacman) {
    this.board = board;
    this.pacman = pacman;
  }

}


module.exports = Game;
