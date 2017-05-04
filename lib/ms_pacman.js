const Maze = require('./maze.js');

document.addEventListener("DOMContentLoaded", function(){
  var c = document.getElementById("pacman-container");
  const ctx = c.getContext("2d");
  ctx.strokeStyle = 'white';

  ctx.beginPath();

  ctx.arc(25, 25, 20, 1.5*Math.PI, 1*Math.PI, true);
  ctx.moveTo(25, 15);
  ctx.arc(25, 25, 10, 1.5*Math.PI, 1*Math.PI, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(275, 25, 20, 1.5*Math.PI, 0, false);
  ctx.moveTo(275, 15);
  ctx.arc(275, 25, 10, 1.5*Math.PI, 0, false);
  ctx.stroke();


  ctx.beginPath();
  ctx.arc(25, 125, 20, 1*Math.PI, 0.5*Math.PI, true);
  ctx.moveTo(15, 125);
  ctx.arc(25, 125, 10, 1*Math.PI, 0.5*Math.PI, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(275, 125, 20, 0, 0.5*Math.PI, false);
  ctx.moveTo(285, 125);
  ctx.arc(275, 125, 10, 0, 0.5*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(25, 5);
  ctx.lineTo(45, 5);
  ctx.moveTo(25, 15);
  ctx.lineTo(45, 15);
  ctx.stroke();



});
