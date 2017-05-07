

const Util = {

  distance(start, dest) {
    var dx = Math.abs(start[0] - dest[0]);
    var dy = Math.abs(start[1] - dest[1]);
    return dx + dy;
  },

  isEmpty(arr) {
    return arr.length === 0;
  }
};

module.exports = Util;
