/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             Extents2.js                3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a set of 2D extents, which			|
{		 is an axis aligned bounding box in 2D space.           |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Extents2(location, size) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, Vector2]), "HCextents2 " + argumentsType.error);
  
  // set attributes
  //
  this.set(location, size);

  return this;
}    // Extents2


//
// "object" or "instance" methods
//


Extents2.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Extents2.setLocation " + argumentsType.error);

  // set attributes
  //
  this.set(location, this.size);
}    // setLocation



Extents2.prototype.setSize = function(size) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Extents2.setSize " + argumentsType.error);

  // set attributes
  //
  this.set(this.location, size);
}    // setLocation


Extents2.prototype.set = function(location, size) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, Vector2]), "Extents2.set " + argumentsType.error);
  
  // set attributes
  //
  this.location = location;
  this.size = size;
  
  // set mins and maxes
  //
  if (this.size) {
    this.xmin = this.location.x - this.size.x / 2;
    this.xmax = this.location.x + this.size.x / 2;
    this.ymin = this.location.y - this.size.y / 2;  
    this.ymax = this.location.y + this.size.y / 2;
  } else {
    this.xmin = this.location.x;
    this.xmax = this.location.x;
    this.ymin = this.location.y;  
    this.ymax = this.location.y;
  }
}    // set


//
// querying methods
//


Extents2.prototype.contains = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Extents2.contains " + argumentsType.error);

  // find if location is within extents
  //
  return (location.x >= this.xmin) && (location.x <= this.xmax) &&
    (location.y >= this.ymin) && (location.y <= this.ymax);
}    // contains


Extents2.prototype.overlaps = function(extents) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Extents2]), "Extents2.overlaps " + argumentsType.error);

  // check for disjoint extents
  //
  if (this.xmin > extents.xmax)
	return false;
  else if (this.xmax < extents.xmin)
	return false;
  else if (this.ymin > extents.ymax)
	return false;
  else if (this.ymax < extents.ymin)
	return false;
  else
    return true;
}    // overlaps


Extents2.prototype.getUpperLeft = function() {
  return new Vector2(this.xmin, this.ymax);
}	// getUpperLeft


Extents2.prototype.getUpperRight = function() {
  return new Vector2(this.xmax, this.ymax);
}	// getUpperRight


Extents2.prototype.getLowerLeft = function() {
  return new Vector2(this.xmin, this.ymin);
}	// getLowerLeft


Extents2.prototype.getLowerRight = function() {
  return new Vector2(this.xmin, this.ymin);
}	// getLowerRight