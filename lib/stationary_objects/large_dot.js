const StationaryObject = require('./stationary_object');

class LargeDot extends StationaryObject {
  constructor(pos, sprites, dotstx) {
    super(pos, sprites, dotstx);
    this.avatar = this.spritesLocations['largeDot'];
  }

  draw() {
    const largeDotImg = new Image();
    largeDotImg.src = 'sprites/mspacman_sprites_2.png';
    largeDotImg.onload = () => {
      let dx = 20;
      let dy = 20;

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - (dx / 2);
      var destY = this.pos[1] - (dy / 2);
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx;
      var destHeight = dy;

      this.dotstx.clearRect(destX, destY, destWidth, destHeight);
      this.dotstx.drawImage(largeDotImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }
}

module.exports = LargeDot;
