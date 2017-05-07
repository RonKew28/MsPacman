
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers() {
    var player = this.game.pacman;
    var blinky = this.game.blinky;
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { player.changeDirection(move); });
    });
  }

  start() {
    var gameView = this;
    this.game.board.drawGrid();
    this.game.board.initialize();

    this.timerId = setInterval(
        function () {
          gameView.game.movingObjects.forEach(function(movingObject) {
            movingObject.draw();
          });
        }, 1000 / 60
    );
    this.bindKeyHandlers();
  }

}

GameView.MOVES = {
  "w": [0, -2],
  "a": [-2, 0],
  "s": [0, 2],
  "d": [1, 0],
  "up": [0, -2],
  "down": [0, 2],
  "left": [-2, 0],
  "right": [2, 0],
};

module.exports = GameView;
