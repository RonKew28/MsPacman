const Util = require('./util');
const Node = require('./node');
const Board = require('./board');

class BreadthFirstSearch {
  constructor(node, start, dest, board) {
    this.node = node;
    this.start = start;
    this.dest = dest;
    this.board = board;
  }

  initializeQueue() {
    var queue = [];
    queue.push(this.node);
  }

  initializeParents() {
    var parents = {};
    parents[this.start] = "none";
    while (!this.queue.isEmpty()) {
      var currentNode = this.queue.shift();
      if(currentNode.pos.equals(this.destination)) {
        break;
      }

      this.currentNode.neighbors.forEach(function (neighbor) {
        if (!parents['' + JSON.stringify(neighbor.pos)]) {
          var newNode = this.board.nodes['' + JSON.stringify(neighbor.pos)];
          this.queue.puhs(newNode);
          parents[JSON.stringify(neighbor.pos)] = currentNode;
        }
      });
    }

    return parents;
  }

  createPath(parents, start, dest) {
    var current = dest;
    var path = [current];

    while (!current.equals(start)) {
      current = parents['' + JSON.stringify(current)].pos;
      path.push(current);
    }

    return path;
  }


}

module.exports = BreadthFirstSearch;
