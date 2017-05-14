const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');
const Blinky = require('./moving_objects/blinky');
const Pinky = require('./moving_objects/pinky');
const StationaryObject = require('./stationary_objects/stationary_object');
const smallDot = require('./stationary_objects/small_dot');
const largeDot = require('./stationary_objects/large_dot');

class Game {

  constructor(board, pacman, blinky, pinky, playerScore) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.pinky = pinky;
    this.playerScore = playerScore;
    this.movingObjects = [pacman, blinky, pinky, playerScore];
  }

}


module.exports = Game;
