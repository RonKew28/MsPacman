

const Util = {

  equals(arr) {
    if (arr && ((this[0] === arr[0]) && (this[1] === arr[1]))) {
      return true;
    } else {
      return false;
    }
  },

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
