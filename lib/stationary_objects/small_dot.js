const StationaryObject = require('./stationary_object');

class SmallDot extends StationaryObject {
  constructor(pos, sprites, dotstx) {
    super(pos, sprites, dotstx);
    this.avatar = this.spritesLocations['smallDot'];
  }

  draw() {
    const smallDotImg = new Image();
    smallDotImg.src = 'sprites/mspacman_sprites_2.png';
    smallDotImg.onload = () => {
      let dx = 20;
      let dy = 20;

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - (dx / 4);
      var destY = this.pos[1] - (dy / 4);
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx / 2;
      var destHeight = dy / 2;

      this.dotstx.clearRect(destX, destY, destWidth, destHeight);
      this.dotstx.drawImage(smallDotImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }
}

module.exports = SmallDot;
