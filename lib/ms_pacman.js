const Maze = require('./maze.js');

document.addEventListener("DOMContentLoaded", function(){
  var c = document.getElementById("pacman-container");
  const ctx = c.getContext("2d");


  let maze = new Maze(8);
  maze.drawWall(ctx);

});
