
document.addEventListener("DOMContentLoaded", function(){
  var c = document.getElementById("pacman-container");
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(50,50);
  ctx.lineTo(300,300);
  ctx.strokeStyle = "blue";
  ctx.stroke();

});
