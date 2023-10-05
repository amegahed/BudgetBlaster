/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              vector2.js                3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a simple three dimensional           |
|        vector type and a few basic vector operations.         |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Vector2(x, y) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["number", "number"]), "Vector2 " + argumentsType.error);

  // set attributes
  //
  this.x = x;
  this.y = y;
  
  return this;
}    // Vector2


//
// "object" or "instance" methods
//


Vector2.prototype.equals = function(vector) {
  if (vector)
    return ((this.x == vector.x) && (this.y == vector.y))
  else
    return false;
}    // equals


Vector2.prototype.clone = function() {
  return new Vector2(this.x, this.y);
}    // clone


Vector2.prototype.toString = function(separator, precision) {
	
  // set optional parameter defaults
  //
  if (!separator)
    separator = Vector2.separator;
  if (!precision)
    precision = Vector2.precision;

  // convert to string
  //
  return this.x.toPrecision(precision) + separator + this.y.toPrecision(precision);
}    // toString


//
// vector arithmetic methods
//


Vector2.prototype.add = function(vector) {
  this.x = this.x + vector.x;
  this.y = this.y + vector.y;
}    // add


Vector2.prototype.subtract = function(vector) {
  this.x = this.x - vector.x;
  this.y = this.y - vector.y;
}    // subtract


Vector2.prototype.multiplyBy = function(vector) {
  this.x = this.x * vector.x;
  this.y = this.y * vector.y;
}    // multiplyBy


Vector2.prototype.divideBy = function(vector) {
  this.x = this.x / vector.x;
  this.y = this.y / vector.y;
}    // divideBy


Vector2.prototype.scaleBy = function(scalar) {
  this.x = this.x * scalar;
  this.y = this.y * scalar;
}    // scaleBy


Vector2.prototype.normalize = function() {
  this.scaleBy(1 / this.length());
}	// normalize


//
// vector function methods
//


Vector2.prototype.plus = function(vector) {
  var x = this.x + vector.x;
  var y = this.y + vector.y;
  return new Vector2(x, y);
}    // plus


Vector2.prototype.minus = function(vector) {
  var x = this.x - vector.x;
  var y = this.y - vector.y;
  return new Vector2(x, y);
}    // minus


Vector2.prototype.times = function(vector) {
  var x = this.x * vector.x;
  var y = this.y * vector.y;
  return new Vector2(x, y);
}    // times


Vector2.prototype.dividedBy = function(vector) {
  var x = this.x / vector.x;
  var y = this.y / vector.y;
  return new Vector2(x, y);
}    // dividedBy


Vector2.prototype.scaledBy = function(scalar) {
  var x = this.x * scalar;
  var y = this.y * scalar;
  return new Vector2(x, y);
}    // scaledBy


Vector2.prototype.normalized = function() {
  return this.scaledBy(1 / this.length());
}	// normalized


//
// operators
// 


Vector2.prototype.dot = function(vector) {
  return (this.x * vector.x) + (this.y * vector.y);
}    // dot


Vector2.prototype.length = function() {
  return Math.sqrt(this.dot(this));
}	// length


//
// rotation methods
//


Vector2.prototype.rotateBy = function(angle) {
  var x = this.x * Math.cos(angle * Math.PI/180) - this.y * Math.sin(angle * Math.PI/180);
  var y = this.x * Math.sin(angle * Math.PI/180) + this.y * Math.cos(angle * Math.PI/180);
  this.x = x;
  this.y = y;
}	// rotateBy


Vector2.prototype.rotatedBy = function(angle) {
  var x = this.x * Math.cos(angle * Math.PI/180) - this.y * Math.sin(angle * Math.PI/180);
  var y = this.x * Math.sin(angle * Math.PI/180) + this.y * Math.cos(angle * Math.PI/180);
  return new Vector2(x, y);
}	// rotatedBy


//
// conversion methods
//


Vector2.prototype.toVector3 = function(z) {
  if (z == undefined)
    z = 0;
  return new Vector3(this.x, this.y, z);
}    // toVector3


//
// "class" or "static" members
//


Vector2.precision = 3;
Vector2.separator = ", ";