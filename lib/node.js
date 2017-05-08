
class Node {
  constructor(pos) {
    this.neighbors = [];
    this.pos = pos;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}

module.exports = Node;
