class StationaryObject {
  constructor(pos, sprites, dotstx) {
    this.pos = pos;
    this.sprites = sprites;
    this.dotstx = dotstx;
    this.spritesLocations = {
      smallDot: [392, 250, 14, 14],
      largeDot: [389, 295, 20, 20]
    };
  }
}

module.exports = StationaryObject;
