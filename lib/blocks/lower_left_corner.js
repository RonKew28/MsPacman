const Block = require("./block");

class LowerLeftCorner extends Block {

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX + this.width, this.posY, this.width, 1*Math.PI, 0.5*Math.PI, true);
    this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 1*Math.PI, 0.5*Math.PI, true);
    this.ctx.stroke();
  }
}

module.exports = LowerLeftCorner;
