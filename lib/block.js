(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

window.App = {};
var Blocks = window.App.Blocks = {};

var BLOCK_DIM = Blocks.BLOCK_DIM = [20, 20];

var Block = Blocks.Block = function Block(pos, ctx, color) {
  this.ctx = ctx;
  this.ctx.lineWidth = 3;
  this.width = BLOCK_DIM[0];
  this.height = BLOCK_DIM[1];
  this.posX = $('canvas').position().left + 1 + pos[0] * this.width;
  this.posY = $('canvas').position().top + 1 + pos[1] * this.height;
};

var UpperLeftCorner = Blocks.UpperLeftCorner = function UpperLeftCorner(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperLeftCorner, Block);

UpperLeftCorner.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.posX + this.width, this.posY + this.height, this.width, 1.5*Math.PI, 1*Math.PI, true);
  this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 1*Math.PI, true);
  this.ctx.stroke();
};

var UpperRightCorner = Blocks.UpperRightCorner = function UpperRightCorner(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperRightCorner, Block);

UpperRightCorner.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.posX, this.posY + this.height, this.width, 1.5*Math.PI, 0, false);
  this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
  this.ctx.stroke();
};

var LowerLeftCorner = Blocks.LowerLeftCorner = function LowerLeftCorner(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerLeftCorner, Block);

LowerLeftCorner.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.posX + this.width, this.posY, this.width, 1*Math.PI, 0.5*Math.PI, true);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 1*Math.PI, 0.5*Math.PI, true);
  this.ctx.stroke();
};

var LowerRightCorner = Blocks.LowerRightCorner = function LowerRightCorner(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerRightCorner, Block);

LowerRightCorner.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.posX, this.posY, this.width, 0, 0.5*Math.PI, false);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
  this.ctx.stroke();
};

var UpperHorizontalBorder = Blocks.UpperHorizontalBorder = function UpperHorizontalBorder(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperHorizontalBorder, Block);

UpperHorizontalBorder.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY);
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.stroke();
};

var LowerHorizontalBorder = Blocks.LowerHorizontalBorder = function LowerHorizontalBorder(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerHorizontalBorder, Block);

LowerHorizontalBorder.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY + this.height);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.stroke();
};

var LeftVerticalBorder = Blocks.LeftVerticalBorder = function LeftVerticalBorder(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LeftVerticalBorder, Block);

LeftVerticalBorder.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
  this.ctx.stroke();
};

var RightVerticalBorder = Blocks.RightVerticalBorder = function RightVerticalBorder(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(RightVerticalBorder, Block);

RightVerticalBorder.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + this.width, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
  this.ctx.stroke();
};

var UpperLeftConnector = Blocks.UpperLeftConnector = function UpperLeftConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperLeftConnector, Block);

UpperLeftConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY);
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
  this.ctx.stroke();
};

var UpperRightConnector = Blocks.UpperRightConnector = function UpperRightConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperRightConnector, Block);

UpperRightConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY);
  this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 1*Math.PI, true);
  this.ctx.stroke();
};

var LowerLeftConnector = Blocks.LowerLeftConnector = function LowerLeftConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerLeftConnector, Block);

LowerLeftConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY + this.height);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
  this.ctx.stroke();
};

var LowerRightConnector = Blocks.LowerRightConnector = function LowerRightConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerRightConnector, Block);

LowerRightConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY + this.height);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 0.5*Math.PI, 1*Math.PI, false);
  this.ctx.stroke();
};

var LeftUpperConnector = Blocks.LeftUpperConnector = function LeftUpperConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LeftUpperConnector, Block);

LeftUpperConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 1*Math.PI, 0.5*Math.PI, true);
  this.ctx.stroke();
};

var LeftLowerConnector = Blocks.LeftLowerConnector = function LeftLowerConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LeftLowerConnector, Block);

LeftLowerConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY);
  this.ctx.lineTo(this.posX, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY + this.height);
  this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1*Math.PI, 1.5*Math.PI, false);
  this.ctx.stroke();
};

var RightUpperConnector = Blocks.RightUpperConnector = function RightUpperConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(RightUpperConnector, Block);

RightUpperConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + this.width, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
  this.ctx.stroke();
};

var RightLowerConnector = Blocks.RightLowerConnector = function RightLowerConnector(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(RightLowerConnector, Block);

RightLowerConnector.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + this.width, this.posY);
  this.ctx.lineTo(this.posX + this.width, this.posY + this.height);
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
  this.ctx.stroke();
};

var UpperLeftCornerSingle = Blocks.UpperLeftCornerSingle = function UpperLeftCornerSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperLeftCornerSingle, Block);

UpperLeftCornerSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY + this.height);
  this.ctx.arc(this.posX + this.width, this.posY + this.height, (this.width / 2), 1*Math.PI, 1.5*Math.PI, false);
  this.ctx.stroke();
};

var UpperRightCornerSingle = Blocks.UpperRightCornerSingle = function UpperRightCornerSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(UpperRightCornerSingle, Block);

UpperRightCornerSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.arc(this.posX, this.posY + this.height, (this.width / 2), 1.5*Math.PI, 0, false);
  this.ctx.stroke();
};

var LowerLeftCornerSingle = Blocks.LowerLeftCornerSingle = function LowerLeftCornerSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerLeftCornerSingle, Block);

LowerLeftCornerSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.arc(this.posX + this.width, this.posY, (this.width / 2), 0.5*Math.PI, 1*Math.PI, false);
  this.ctx.stroke();
};

var LowerRightCornerSingle = Blocks.LowerRightCornerSingle = function LowerRightCornerSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(LowerRightCornerSingle, Block);

LowerRightCornerSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.arc(this.posX, this.posY, (this.width / 2), 0, 0.5*Math.PI, false);
  this.ctx.stroke();
};

var HorizontalBorderSingle = Blocks.HorizontalBorderSingle = function HorizontalBorderSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(HorizontalBorderSingle, Block);

HorizontalBorderSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX, this.posY + (this.height / 2));
  this.ctx.lineTo(this.posX + this.width, this.posY + (this.height / 2));
  this.ctx.stroke();
};

var VerticalBorderSingle = Blocks.VerticalBorderSingle = function VerticalBorderSingle(options) {
  Block.call(this, options.pos, options.ctx);
};

App.Util.inherits(VerticalBorderSingle, Block);

VerticalBorderSingle.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX + (this.width / 2), this.posY);
  this.ctx.lineTo(this.posX + (this.width / 2), this.posY + this.height);
  this.ctx.stroke();
};


})();
