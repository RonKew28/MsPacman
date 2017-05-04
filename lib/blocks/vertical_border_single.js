const Block = require("./block");

class VerticalBorderSingle extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
    this.ctx.stroke();
  }
}

module.exports = VerticalBorderSingle;
