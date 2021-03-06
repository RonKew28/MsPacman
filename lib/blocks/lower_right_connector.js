const Block = require("./block");

class LowerRightConnector extends Block {
  
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY + this.height);
    this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
    this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
    this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 0.5*Math.PI, 1*Math.PI, false);
    this.ctx.stroke();
  }
}

module.exports = LowerRightConnector;
