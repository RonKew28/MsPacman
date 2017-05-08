const Board = require('./board');
const MovingObject = require('./moving_objects/moving_object');
const Pacman = require('./moving_objects/pacman');
const Blinky = require('./moving_objects/blinky');
const StationaryObject = require('./stationary_objects/stationary_object');
const smallDot = require('./stationary_objects/small_dot');
const largeDot = require('./stationary_objects/large_dot');

class Game {

  constructor(board, pacman, blinky, stationaryObjectsArr) {
    this.board = board;
    this.pacman = pacman;
    this.blinky = blinky;
    this.movingObjects = [pacman, blinky];
    this.stationaryObjects = stationaryObjectsArr;
  }

}


module.exports = Game;
