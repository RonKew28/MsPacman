const Block = require("./block");

class UpperRightCorner extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY + this.height, this.width, 1.5*Math.PI, 0, false);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
    this.ctx.stroke();
  }
}

module.exports = UpperRightCorner;
