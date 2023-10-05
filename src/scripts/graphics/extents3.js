/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             Extents3.js                3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a set of 3D extents, which			|
{		 is an axis aligned bounding box in 3D space.           |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Extents3(location, size) {

  // check argument types
  //
  // assert(argumentsType(arguments, [vector3, vector3]), "Extents3 " + argumentsType.error);
  
  // set attributes
  //
  this.set(location, size);

  return this;
}    // Extents3


//
// "object" or "instance" methods
//


Extents3.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [vector3]), "Extents3.setLocation " + argumentsType.error);

  // set attributes
  //
  this.set(location, this.size);
}    // setLocation



Extents3.prototype.setSize = function(size) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [vector3]), "Extents3.setSize " + argumentsType.error);

  // set attributes
  //
  this.set(this.location, size);
}    // setLocation


Extents3.prototype.set = function(location, size) {

  // check argument types
  //
  // assert(argumentsType(arguments, [vector3, vector3]), "Extents3.set " + argumentsType.error);
  
  // set attributes
  //
  this.location = location;
  this.size = size;
  
  // set mins and maxes
  //
  this.xmin = this.location.x - this.size.x / 2;
  this.xmax = this.location.x + this.size.x / 2;
  this.ymin = this.location.y - this.size.y / 2;
  this.ymax = this.location.y + this.size.y / 2; 
  this.zmin = this.location.z - this.size.z / 2;
  this.zmax = this.location.z + this.size.z / 2; 
}    // set


//
// querying methods
//


Extents3.prototype.contains = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [vector3]), "Extents3.contains " + argumentsType.error);

  // find if location is within extents
  //
  return this.xmin <= location.x && location.x <= this.xmax && 
    this.ymin <= location.y && location.y <= this.ymax && 
	this.zmin <= location.z && location.z <= this.zmax;
}    // contains


Extents3.prototype.overlaps = function(extents) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [extents3]), "Extents3.overlaps " + argumentsType.error);

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
  else if (this.zmin > extents.zmax)
	return false;
  else if (this.zmax < extents.zmin)
	return false;
  else
    return true;
}    // overlaps