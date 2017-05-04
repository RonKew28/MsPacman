const Block = require("./block");

class LowerHorizontalBorder extends Block {
  constructor() {
    super();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
    this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.stroke();
  }
}

module.exports = LowerHorizontalBorder;
