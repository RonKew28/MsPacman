const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');
const Blinky = require('./moving_objects/blinky');
const Pinky = require('./moving_objects/pinky');
const Clyde = require('./moving_objects/clyde');
const Inky = require('./moving_objects/inky');
const StationaryObject = require('./stationary_objects/stationary_object');
const smallDot = require('./stationary_objects/small_dot');
const largeDot = require('./stationary_objects/large_dot');

class Game {

  constructor(board, pacman, blinky, pinky, clyde, inky, playerScore) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.pinky = pinky;
    this.clyde = clyde;
    this.inky = inky;
    this.playerScore = playerScore;
    this.movingObjects = [pacman, blinky, pinky, clyde, inky, playerScore];
  }

}


module.exports = Game;
