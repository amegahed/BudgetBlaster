/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm               rect.js                  3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a drawable 2D rectangle.             |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Rect(location, size, color, thickness) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, Vector2, "string", "number"]), "HCextents2 " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (color == undefined)
    color = "#FFFFFF";
  if (thickness == undefined)
    thickness = 2;
  
  // set attributes
  //
  this.location = location;
  this.size = size;
  this.color = color;
  this.thickness = thickness;

  return this;
}    // Rect


//
// "object" or "instance" methods
//


Rect.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Rect.setLocation " + argumentsType.error);

  // set attributes
  //
  this.location = location;
  
  // set element style
  //
  if (this.canvas) {
    this.left = this.canvas.origin.x + (this.location.x - this.size.x / 2) * this.canvas.origin.x;
    this.top = this.canvas.origin.y - (this.location.y + this.size.y / 2) * this.canvas.origin.y;
    this.element.style.left = this.left;
    this.element.style.top = this.top;
    if (location.z != undefined)
	  this.element.style.zIndex = location.z;
  }
}    // setLocation



Rect.prototype.setSize = function(size) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Rect.setSize " + argumentsType.error);

  // set attributes
  //
  this.size = size;
  
  // set element style
  //
  if (this.canvas) {
    this.left = this.canvas.origin.x + location.x * this.canvas.origin.x;
    this.top = this.canvas.origin.y - location.y * this.canvas.origin.y;
    this.image.style.left = this.left;
    this.image.style.top = this.top;
  }
}    // setLocation


Rect.prototype.setStyle = function(color, thickness) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["string", "number"]), "Rect.setStyle " + argumentsType.error);

  // set attributes
  //
  this.color = color;
  this.thickness = thickness;
  
  // set element style
  //
  if (this.element)
    this.element.style.border = this.thickness + "px solid " + this.color;
}    // setStyle


Rect.prototype.set = function(location, size) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, Vector2]), "Rect.set " + argumentsType.error);
  
  // set attributes
  //
  this.location = location;
  this.size = size;

  // if loaded
  //
  if (this.canvas) {

    // set dimensions
    //
    this.left = this.canvas.origin.x + (this.location.x - this.size.x / 2) * this.canvas.origin.x;
    this.top = this.canvas.origin.y - (this.location.y + this.size.y / 2) * this.canvas.origin.y;
    this.width = this.canvas.origin.x * this.size.x;
    this.height = this.canvas.origin.y * this.size.y;
	
	// set element style
	//
    this.element.style.left = this.left;
    this.element.style.top = this.top;
	this.element.style.width = this.width;
	this.element.style.height = this.height;
  }
}    // set


//
// private methods
//


Rect.prototype.onLoad = function(canvas) {
	
  // only load once
  //
  if (this.canvas)
    return;

  // create new div element
  //
  this.element = document.createElement("div");
  this.element.style.position = "absolute";
  disableSelection(this.element);
  disableDragging(this.element);
  this.setStyle(this.color, this.thickness);
	
  // store handle to canvas
  //
  this.canvas = canvas;
  
  // add element to canvas
  //
  canvas.element.appendChild(this.element);
  this.set(this.location, this.size);
}	// onLoad


Rect.prototype.onUnload = function() {
  if (this.canvas) {
    this.canvas.element.removeChild(this.element);
    this.canvas = null;
  }
}	// onUnload