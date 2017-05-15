class StationaryObject {
  constructor(pos, sprites, dotstx, scoretx, board) {
    this.pos = pos;
    this.sprites = sprites;
    this.dotstx = dotstx;
    this.scoretx = scoretx;
    this.board = board;
    this.spritesLocations = {
      smallDot: [392, 250, 14, 14],
      largeDot: [389, 295, 20, 20],
      playerScore: [389, 295, 20, 20]
    };
  }
}

module.exports = StationaryObject;
