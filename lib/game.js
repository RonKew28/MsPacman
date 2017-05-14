const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');
const Blinky = require('./moving_objects/blinky');
const StationaryObject = require('./stationary_objects/stationary_object');
const smallDot = require('./stationary_objects/small_dot');
const largeDot = require('./stationary_objects/large_dot');

class Game {

  constructor(board, pacman, blinky, playerScore) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.playerScore = playerScore;
    this.movingObjects = [pacman, blinky, playerScore];
  }

}


module.exports = Game;
