const MovingObject = require('./moving_object');

class Blinky extends MovingObject {
  constructor(start_pos, pos, vel, sprites, board, blinkytx, gtx, dotstx) {
    super(start_pos, pos, vel, sprites, board);
    this.blinkytx = blinkytx;
    this.gtx = gtx;
    this.dotstx = dotstx;
    this.moved = false;
    this.avatar = this.spritesLocations.blinky;
    this.draw = this.draw.bind(this);
  }

  draw() {

    const blinkyImg = new Image();
    blinkyImg.src = 'sprites/mspacman_sprites_2.png';

    blinkyImg.onload = () => {
      let dx = 20;
      let dy = 20;

      this.blinkytx.clearRect(0, 0, 1000, 1000);

      var sx = this.avatar[0];
      var sy = this.avatar[1];
      var destX = this.pos[0] - dx;
      var destY = this.pos[1] - dy;
      var sWidth = this.avatar[2];
      var sHeight = this.avatar[3];
      var destWidth = dx * 2;
      var destHeight = dy * 2;
      this.blinkytx.drawImage(blinkyImg, sx, sy, sWidth, sHeight, destX, destY, destWidth, destHeight);
    };
  }


}

module.exports = Blinky;
