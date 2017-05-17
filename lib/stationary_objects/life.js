const StationaryObject = require('./stationary_object');

class Life extends StationaryObject {
  constructor(pos, sprites, dotstx, scoretx, board) {
    super(pos, sprites, dotstx, scoretx);
    this.avatar = this.spritesLocations['life'];
    this.board = board;
  }



  draw() {
    const lifeImg = new Image();
    lifeImg.src = 'sprites/mspacman_sprites_2.png';
    lifeImg.onload = () => {
      let dx = 20;
      let dy = 20;

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - dx;
      var destY = this.pos[1] - dy;
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx * 2;
      var destHeight = dy * 2;
      this.dotstx.clearRect(destX, destY, destWidth, destHeight);
      this.dotstx.drawImage(lifeImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }

}

module.exports = Life;
