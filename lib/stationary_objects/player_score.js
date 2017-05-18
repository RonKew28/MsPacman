const StationaryObject = require('./stationary_object');

class PlayerScore extends StationaryObject {
  constructor(pos, sprites, dotstx, scoretx, board) {
    super(pos, sprites, dotstx, scoretx);
    this.avatar = this.spritesLocations['playerScore'];
    this.board = board;
    this.drawScore = this.drawScore.bind(this);
    this.score;
  }

  drawScore() {
   this.scoretx.font = '20px Main Font';
   this.scoretx.fillStyle = 'white';
   let scoreText = "Score: " + this.board.scoreBoard.score;
   this.scoretx.fillText(scoreText, this.pos[0], this.pos[1] + 10);
 }


  draw() {
    this.scoretx.clearRect(0, 0, 1000, 1000);
    this.drawScore();
  }
}

module.exports = PlayerScore;
