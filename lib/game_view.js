
class GameView {
  constructor(game, ctx, menutx) {
    this.game = game;
    this.ctx = ctx;
    this.menutx = menutx;
    this.gameStart = false;
    this.start = this.start.bind(this);
    this.pacmanDead = this.game.movingObjects[0].dead;
    debugger
  }

  bindKeyHandlers() {
    var player = this.game.pacman;
    var blinky = this.game.blinky;
    var pinky = this.game.pinky;
    var clyde = this.game.clyde;
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, (e) => {
        player.changeDirection(move);
        e.preventDefault();
      });
    });
  }

  start() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("lose-menu").style.display = "none";
    $("canvas").css({ opacity: 1});
    var gameView = this;
    var statObjs = this.game.stationaryObjects;


    this.timerId = setInterval(
        (function () {
          if(this.game.movingObjects[0].livesRemaining === 0) {
            this.gameStart = false;
            let that = this;
              $("canvas").css({ opacity: 0.1});
              document.getElementById("lose-menu").style.display = "block";
              document.getElementById("replay-button").addEventListener("click", function() {
                clearInterval(that.timerId);
                clearInterval(that.animationId);
                that.game.board.clearBoard();
                that.game.board.initialize();
                that.game.movingObjects[0].livesRemaining = 3;
                that.gameStart = true;
                return;
              });
            }
          gameView.game.movingObjects.forEach(function(movingObject) {
            movingObject.draw();
          });

        }).bind(this), 1000 / 60
    );



    this.animationId = setInterval(
      function() {
        $.each(gameView.game.movingObjects, function(objectKey, object) {
          if(object.moved) {
            object.animationFrame += 1;
          }
        });
      }, 1000 / 15
    );


    this.bindKeyHandlers();
  }


  initialize() {
    let that = this;
    this.pacmanDead = false;
    if (that.gameStart === false) {
      $("canvas").css({ opacity: 0.1});
      document.getElementById("menu").style.display = "block";
      document.getElementById("start-button").addEventListener("click", function() {
        that.gameStart = true;
        that.start();
      });
    }
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
