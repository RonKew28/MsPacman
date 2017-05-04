const Block = require("./block");

class HorizontalBorderSingle extends Block {
  constructor() {
    super();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.stroke();
  }
}

module.exports = HorizontalBorderSingle;
