const StationaryObject = require('./stationary_object');

class PlayerScore extends StationaryObject {
  constructor(pos, sprites, dotstx, scoretx) {
    super(pos, sprites, dotstx, scoretx);
    this.avatar = this.spritesLocations['playerScore'];
    this.score = 0;
  }

  drawScore() {
   this.scoretx.font = '25px arcadePixelated';
   this.scoretx.fillStyle = 'white';
   let scoreText = "Score: " + this.score;
   this.scoretx.fillText(scoreText, this.pos[0], this.pos[1] + 10);
 }


  draw() {
    this.scoretx.clearRect(0, 0, 1000, 1000);
    this.drawScore();
  }
}

module.exports = PlayerScore;
