/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              Vector3.js                3d      |
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


function Vector3(x, y, z) {

  // check argument types
  //
  // assert(argumentsType(arguments, ["number", "number", "number"]), "Vector3 " + argumentsType.error);
  
  // set attributes
  //
  this.x = x;
  this.y = y;
  this.z = z;
  
  return this;
}    // Vector3


//
// "object" or "instance" methods
//


Vector3.prototype.equals = function(vector) {
  if (vector)
    return ((this.x == vector.x) && (this.y == vector.y) && (this.z == vector.z))
  else
    return false;
}    // equals


Vector3.prototype.clone = function() {
  return new Vector3(this.x, this.y, this.z);
}    // clone


Vector3.prototype.toString = function(separator, precision) {
	
  // set optional parameter defaults
  //
  if (!separator)
    separator = Vector3.separator;
  if (!precision)
    precision = Vector3.precision;

  // convert to string
  //
  return this.x.toPrecision(precision) + separator + this.y.toPrecision(precision) + separator + this.z.toPrecision(precision);
}    // toString


Vector3.prototype.toArray = function() {
  return [this.x, this.y, this.z];
}	// toArray


//
// vector arithmetic methods
//


Vector3.prototype.add = function(vector) {
  this.x = this.x + vector.x;
  this.y = this.y + vector.y;
  this.z = this.z + vector.z;
}    // add


Vector3.prototype.subtract = function(vector) {
  this.x = this.x - vector.x;
  this.y = this.y - vector.y;
  this.z = this.z - vector.z;
}    // subtract


Vector3.prototype.multiplyBy = function(vector) {
  this.x = this.x * vector.x;
  this.y = this.y * vector.y;
  this.z = this.z * vector.z;
}    // multiplyBy


Vector3.prototype.divideBy = function(vector) {
  this.x = this.x / vector.x;
  this.y = this.y / vector.y;
  this.z = this.z / vector.z;
}    // divideBy


Vector3.prototype.scaleBy = function(scalar) {
  this.x = this.x * scalar;
  this.y = this.y * scalar;
  this.z = this.z * scalar;
}    // scaleBy


Vector3.prototype.normalize = function() {
  this.scaleBy(1 / this.length());
}	// normalize


//
// vector arithmetic functions
//


Vector3.prototype.plus = function(vector) {
  var x = this.x + vector.x;
  var y = this.y + vector.y;
  var z = this.z + vector.z;
  return new Vector3(x, y, z);
}    // plus


Vector3.prototype.minus = function(vector) {
  var x = this.x - vector.x;
  var y = this.y - vector.y;
  var z = this.z - vector.z;
  return new Vector3(x, y, z);
}    // minus


Vector3.prototype.times = function(vector) {
  var x = this.x * vector.x;
  var y = this.y * vector.y;
  var z = this.z * vector.z;
  return new Vector3(x, y, z);
}    // times


Vector3.prototype.dividedBy = function(vector) {
  var x = this.x / vector.x;
  var y = this.y / vector.y;
  var z = this.z / vector.z;
  return new Vector3(x, y, z);
}    // dividedBy


Vector3.prototype.scaledBy = function(scalar) {
  var x = this.x * scalar;
  var y = this.y * scalar;
  var z = this.z * scalar;
  return new Vector3(x, y, z);
}    // scaledBy


Vector3.prototype.normalized = function() {
  return this.scaledBy(1 / this.length());
}	// normalized


//
// operators
// 


Vector3.prototype.dot = function(vector) {
  return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z);
}    // dot


Vector3.prototype.cross = function(vector) {
  var x = (this.y * vector.z) - (this.z * vector.y);
  var y = (this.z * vector.x) - (this.x * vector.z);
  var z = (this.x * vector.y) - (this.y * vector.x);
  return new Vector3(x, y, z);
}    // cross


Vector3.prototype.parallel = function(vector) {
  var denominator = vector.dot(vector);
  if (denominator != 0)
    return vector.scaledBy(this.dot(vector) / denominator);
  else
    return this;
}	// parallel


Vector3.prototype.perpendicular = function(vector) {
  return this.minus(this.parallel(vector));
}	// perpendicular


Vector3.prototype.length = function() {
  return Math.sqrt(this.dot(this));
}	// length


//
// rotation methods
//


Vector3.prototype.rotateBy = function(angle, axis) {
  var length = axis.length();
    
  if (length != 0) {
    var xAxis = this.perpendicular(axis);
    var yAxis = (axis.cross(xAxis)).scaledBy(1 / length);
    var zAxis = this.parallel(axis);
    var x = Math.cos(angle * Math.PI/180);
    var y = Math.sin(angle * Math.PI/180);
    var xAxis2 = xAxis.scaledBy(x);
    var yAxis2 = yAxis.scaledBy(y);
    var vector = (xAxis2.plus(yAxis2)).plus(zAxis);
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
  };
}	// rotateBy


Vector3.prototype.rotatedBy = function(angle, axis) {
  var length = axis.length();
    
  if (length != 0) {
    var xAxis = this.perpendicular(axis);
    var yAxis = (axis.cross(xAxis)).scaledBy(1 / length);
    var zAxis = this.parallel(axis);
    var x = Math.cos(angle * Math.PI/180);
    var y = Math.sin(angle * Math.PI/180);
    var xAxis2 = xAxis.scaledBy(x);
    var yAxis2 = yAxis.scaledBy(y);	
    return (xAxis2.plus(yAxis2)).plus(zAxis);
  } else
    return this;
}	// rotatedBy


//
// conversion methods
//


Vector3.prototype.toVector2 = function() {
  return new Vector2(this.x, this.y);
}    // toVector2


//
// "class" or "static" members
//


Vector3.precision = 3;
Vector3.separator = ", ";