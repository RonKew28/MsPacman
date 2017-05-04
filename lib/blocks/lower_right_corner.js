const Block = require("./block");

class LowerRightCorner extends Block {
  constructor() {
    super();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.width, 0, 0.5*Math.PI, false);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerRightCorner;
