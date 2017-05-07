const Util = require('./util');
const Node = require('./node');
const Board = require('./board');

class BreadthFirstSearch {
  constructor(node, start, dest, board) {
    this.node = node;
    this.start = start;
    this.dest = dest;
    this.board = board;
    this.queue = [];
    this.initializeQueue = this.initializeQueue.bind(this);
  }

  initializeQueue() {
    this.queue.push(this.node);
  }

  findParents() {
    this.initializeQueue();
    var parents = {};
    parents[this.start] = "none";
    while (!Util.isEmpty(this.queue)) {
      var currentNode = this.queue.shift();
      if(currentNode.pos === this.destination) {
        break;
      }
      let board = this.board;
      let queue = this.queue;
      currentNode.neighbors.forEach(function (neighbor) {
        if (!parents['' + JSON.stringify(neighbor.pos)]) {
          var newNode = board.nodes['' + JSON.stringify(neighbor.pos)];
          queue.push(newNode);
          parents[JSON.stringify(neighbor.pos)] = currentNode;
        }
      });
    }

    return parents;
  }

  createPath(parents, start, dest) {
    var current = dest;
    var path = [current];

    while (!(current === start)) {
      current = parents['' + JSON.stringify(current)].pos;
      path.push(current);
    }

    return path;
  }


}

module.exports = BreadthFirstSearch;
