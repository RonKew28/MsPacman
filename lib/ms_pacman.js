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

  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(70, 50);
  ctx.moveTo(50, 60);
  ctx.arc(50, 70, 10, 1.5*Math.PI, 0, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(70, 50);
  ctx.lineTo(90, 50);
  ctx.moveTo(90, 60);
  ctx.arc(90, 70, 10, 1.5*Math.PI, 1*Math.PI, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(80, 100);
  ctx.lineTo(100, 100);
  ctx.moveTo(90, 80);
  ctx.arc(80, 80, 10, 0, 0.5*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(120, 100);
  ctx.moveTo(120, 90);
  ctx.arc(120, 80, 10, 0.5*Math.PI, 1*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(200, 70);
  ctx.moveTo(210, 50);
  ctx.arc(220, 50, 10, 1*Math.PI, 0.5*Math.PI, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 70);
  ctx.lineTo(200, 90);
  ctx.moveTo(210, 90);
  ctx.arc(220, 90, 10, 1*Math.PI, 1.5*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(250, 70);
  ctx.lineTo(250, 90);
  ctx.moveTo(240, 70);
  ctx.arc(230, 70, 10, 0, 0.5*Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(250, 70);
  ctx.lineTo(250, 90);
  ctx.moveTo(230, 80);
  ctx.arc(230, 90, 10, 1.5*Math.PI, 0, false);
  ctx.stroke();

});
