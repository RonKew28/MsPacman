

const Util = {

  distance(start, dest) {
    var dx = Math.abs(start[0] - dest[0]);
    var dy = Math.abs(start[1] - dest[1]);
    return dx + dy;
  },

  isEmpty(arr) {
    return arr.length === 0;
  },

  equals(arr1, arr2) {
    if (arr1 && arr2 && (arr1[0] === arr2[0] && arr1[1] === arr2[1])) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = Util;
