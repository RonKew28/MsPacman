const Block = require("./block");

class UpperLeftCornerSingle extends Block {
  constructor() {
    super();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1*Math.PI, 1.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = UpperLeftCornerSingle;
