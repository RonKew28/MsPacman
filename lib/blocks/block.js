class Block {
  constructor(pos, ctx, color) {
    this.ctx = ctx;
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#FD5F00";
    this.ctx.setLineDash([0, 0]);
    this.width = 20;
    this.height = 20;
    this.posX = $('canvas').position().left + 1 + pos[0] * this.width;
    this.posY = $('canvas').position().top + 1 + pos[1] * this.height;
  }
}

module.exports = Block;
