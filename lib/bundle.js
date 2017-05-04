/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



WALLS = [
    [
      { "move": [0, 9.5] }, { "line": [3, 9.5] },
      { "curve": [3.5, 9.5, 3.5, 9] }, { "line": [3.5, 8] },
      { "curve": [3.5, 7.5, 3, 7.5] }, { "line": [1, 7.5] },
      { "curve": [0.5, 7.5, 0.5, 7] }, { "line": [0.5, 1] },
      { "curve": [0.5, 0.5, 1, 0.5] }, { "line": [9, 0.5] },
      { "curve": [9.5, 0.5, 9.5, 1] }, { "line": [9.5, 3.5] }
    ]
    // [
    //   { "move": [9.5, 1] },
    //   { "curve": [9.5, 0.5, 10, 0.5] }, { "line": [18, 0.5] },
    //   { "curve": [18.5, 0.5, 18.5, 1] }, { "line": [18.5, 7] },
    //   { "curve": [18.5, 7.5, 18, 7.5] }, { "line": [16, 7.5] },
    //   { "curve": [15.5, 7.5, 15.5, 8] }, { "line": [15.5, 9] },
    //   { "curve": [15.5, 9.5, 16, 9.5] }, { "line": [19, 9.5] }
    // ],
    // [
    //   { "move": [2.5, 5.5] }, { "line": [3.5, 5.5] }
    // ],
    // [
    //   { "move": [3, 2.5] },
    //   { "curve": [3.5, 2.5, 3.5, 3] },
    //   { "curve": [3.5, 3.5, 3, 3.5] },
    //   { "curve": [2.5, 3.5, 2.5, 3] },
    //   { "curve": [2.5, 2.5, 3, 2.5] }
    // ],
    // [
    //   { "move": [15.5, 5.5] }, { "line": [16.5, 5.5] }
    // ],
    // [
    //   { "move": [16, 2.5] }, { "curve": [16.5, 2.5, 16.5, 3] },
    //   { "curve": [16.5, 3.5, 16, 3.5] }, { "curve": [15.5, 3.5, 15.5, 3] },
    //   { "curve": [15.5, 2.5, 16, 2.5] }
    // ],
    // [
    //   { "move": [6, 2.5] }, { "line": [7, 2.5] }, { "curve": [7.5, 2.5, 7.5, 3] },
    //   { "curve": [7.5, 3.5, 7, 3.5] }, { "line": [6, 3.5] },
    //   { "curve": [5.5, 3.5, 5.5, 3] }, { "curve": [5.5, 2.5, 6, 2.5] }
    // ],
    // [
    //   { "move": [12, 2.5] }, { "line": [13, 2.5] }, { "curve": [13.5, 2.5, 13.5, 3] },
    //   { "curve": [13.5, 3.5, 13, 3.5] }, { "line": [12, 3.5] },
    //   { "curve": [11.5, 3.5, 11.5, 3] }, { "curve": [11.5, 2.5, 12, 2.5] }
    // ],
    // [
    //   { "move": [7.5, 5.5] }, { "line": [9, 5.5] }, { "curve": [9.5, 5.5, 9.5, 6] },
    //   { "line": [9.5, 7.5] }
    // ],
    // [
    //   { "move": [9.5, 6] }, { "curve": [9.5, 5.5, 10.5, 5.5] },
    //   { "line": [11.5, 5.5] }
    // ],
    // [
    //   { "move": [5.5, 5.5] }, { "line": [5.5, 7] }, { "curve": [5.5, 7.5, 6, 7.5] },
    //   { "line": [7.5, 7.5] }
    // ],
    // [
    //   { "move": [6, 7.5] }, { "curve": [5.5, 7.5, 5.5, 8] }, { "line": [5.5, 9.5] }
    // ],
    // [
    //   { "move": [13.5, 5.5] }, { "line": [13.5, 7] },
    //   { "curve": [13.5, 7.5, 13, 7.5] }, { "line": [11.5, 7.5] }
    // ],
    // [
    //   { "move": [13, 7.5] }, { "curve": [13.5, 7.5, 13.5, 8] },
    //   { "line": [13.5, 9.5] }
    // ],
    // [
    //   { "move": [0, 11.5] }, { "line": [3, 11.5] }, { "curve": [3.5, 11.5, 3.5, 12] },
    //   { "line": [3.5, 13] }, { "curve": [3.5, 13.5, 3, 13.5] }, { "line": [1, 13.5] },
    //   { "curve": [0.5, 13.5, 0.5, 14] }, { "line": [0.5, 17] },
    //   { "curve": [0.5, 17.5, 1, 17.5] }, { "line": [1.5, 17.5] }
    // ],
    // [
    //   { "move": [1, 17.5] }, { "curve": [0.5, 17.5, 0.5, 18] }, { "line": [0.5, 21] },
    //   { "curve": [0.5, 21.5, 1, 21.5] }, { "line": [18, 21.5] },
    //   { "curve": [18.5, 21.5, 18.5, 21] }, { "line": [18.5, 18] },
    //   { "curve": [18.5, 17.5, 18, 17.5] }, { "line": [17.5, 17.5] }
    // ],
    // [
    //   { "move": [18, 17.5] }, { "curve": [18.5, 17.5, 18.5, 17] },
    //   { "line": [18.5, 14] }, { "curve": [18.5, 13.5, 18, 13.5] },
    //   { "line": [16, 13.5] }, { "curve": [15.5, 13.5, 15.5, 13] },
    //   { "line": [15.5, 12] }, { "curve": [15.5, 11.5, 16, 11.5] },
    //   { "line": [19, 11.5] }
    // ],
    // [
    //   { "move": [5.5, 11.5] }, { "line": [5.5, 13.5] }
    // ],
    // [
    //   { "move": [13.5, 11.5] }, { "line": [13.5, 13.5] }
    // ],
    // [
    //   { "move": [2.5, 15.5] }, { "line": [3, 15.5] },
    //   { "curve": [3.5, 15.5, 3.5, 16] }, { "line": [3.5, 17.5] }
    // ],
    // [
    //   { "move": [16.5, 15.5] }, { "line": [16, 15.5] },
    //   { "curve": [15.5, 15.5, 15.5, 16] }, { "line": [15.5, 17.5] }
    // ],
    // [
    //   { "move": [5.5, 15.5] }, { "line": [7.5, 15.5] }
    // ],
    // [
    //   { "move": [11.5, 15.5] }, { "line": [13.5, 15.5] }
    // ],
    // [
    //   { "move": [2.5, 19.5] }, { "line": [5, 19.5] },
    //   { "curve": [5.5, 19.5, 5.5, 19] }, { "line": [5.5, 17.5] }
    // ],
    // [
    //   { "move": [5.5, 19]}, { "curve": [5.5, 19.5, 6, 19.5]},
    //   { "line": [7.5, 19.5]}
    // ],
    // [
    //   { "move": [11.5, 19.5] }, { "line": [13, 19.5] },
    //   { "curve": [13.5, 19.5, 13.5, 19] }, { "line": [13.5, 17.5] }
    // ],
    // [
    //   { "move": [13.5, 19] }, { "curve": [13.5, 19.5, 14, 19.5] },
    //   { "line": [16.5, 19.5] }
    // ],
    // [
    //   { "move": [7.5, 13.5] }, { "line": [9, 13.5] },
    //   { "curve": [9.5, 13.5, 9.5, 14] }, { "line": [9.5, 15.5] }
    // ],
    // [
    //   { "move": [9.5, 14] }, { "curve": [9.5, 13.5, 10, 13.5] },
    //   { "line": [11.5, 13.5] }
    // ],
    // [
    //   { "move": [7.5, 17.5] }, { "line": [9, 17.5] },
    //   { "curve": [9.5, 17.5, 9.5, 18] }, { "line": [9.5, 19.5] }
    // ],
    // [
    //   { "move": [9.5, 18] }, { "curve": [9.5, 17.5, 10, 17.5] },
    //   { "line": [11.5, 17.5] }
    // ],
    // [
    //   { "move": [8.5, 9.5] }, { "line": [8, 9.5] }, { "curve": [7.5, 9.5, 7.5, 10] },
    //   { "line": [7.5, 11] }, { "curve": [7.5, 11.5, 8, 11.5] },
    //   { "line": [11, 11.5] }, { "curve": [11.5, 11.5, 11.5, 11] },
    //   { "line": [11.5, 10] }, { "curve": [11.5, 9.5, 11, 9.5] },
    //   { "line": [10.5, 9.5] }
    // ]
  ];

const Maze = function (size){
  this.height = null;
  this.width = null;
  this.blockSize = size;
  this.pillSize = 0;
  this.maze = null;
};

Maze.prototype.drawWall = function (ctx) {
  let i, j, p, line;
  ctx.strokeStyle = "#0000FF";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (i = 0; i < WALLS.length; i += 1) {
    line = WALLS[i];
    ctx.beginPath();
    for (j = 0; j < line.length; j += 1) {
      p = line[j];
      if (p.move) {
        ctx.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize);
      } else if (p.line) {
        ctx.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize);
      } else if (p.curve) {
        ctx.quadraticCurveTo(
          p.curve[0] * this.blockSize,
          p.curve[1] * this.blockSize,
          p.curve[2] * this.blockSize,
          p.curve[3] * this.blockSize
        );
      }
    }
    ctx.stroke();
  }
};
module.exports = Maze;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Maze = __webpack_require__(0);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map