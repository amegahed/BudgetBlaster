/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              sprite.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a DOM graphics sprite overlay.       |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Sprite(icon, location, scale) {
  if (arguments.length == 0)
    return;
  
  // check argument types
  //
  // assert(argumentsType(arguments, [Icon, Vector2, "number"], 1) || argumentsType(arguments, [Icon, Vector3, "number"], 1), "Sprite " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (location == undefined)
    location = new Vector2(0, 0);
  if (scale == undefined)
    scale = 1;
	
  // call superclass constructor
  //
  Element.call(this, location);
  
  // set attributes
  //
  this.icon = icon;
  this.scale = scale;
	
  return this;
}    // Sprite


// inherit prototype from "superclass"
//
Sprite.prototype = new Element();


//
// "object" or "instance" methods
//


Sprite.prototype.setIcon = function(icon) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Icon]), "Sprite.setIcon " + argumentsType.error);
  
  // set attributes
  //
  this.icon = icon;
  
  // load new image
  //
  if (this.canvas) {
	this.image.src = icon.image.src;
	this.onResize();
  }
}	// setIcon


Sprite.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Sprite.setLocation " + argumentsType.error);

  // set attributes
  //
  this.location = location;
  
  // set image location
  //
  if (this.canvas) {
    this.left = (this.canvas.origin.x) + location.x * (this.canvas.origin.x) - (this.icon.origin.x + this.icon.anchor.x) * this.scale;
    this.top = (this.canvas.origin.y) - location.y * (this.canvas.origin.y) - (this.icon.origin.y + this.icon.anchor.y) * this.scale;
    this.image.style.left = this.left;
    this.image.style.top = this.top;
    if (location.z != undefined)
	  this.image.style.zIndex = location.z;
  }
}	// setLocation


Sprite.prototype.showBorder = function(color, thickness) {
  if (color == undefined)
    color = "white";
  if (thickness == undefined)
    thickness = 2;
	
  this.image.style.border = thickness + "px solid " + color;
}    // showBorder


Sprite.prototype.hideBorder = function() {
  this.image.style.border = "none";
}    // hideBorder


//
// query methods
//


Sprite.prototype.getSize = function() {
  return this.size;
}	// getSize


//
// query methods
//


Sprite.prototype.isVisible = function() {
  return AnimatedSprite.screenExtents.overlaps(this.getExtents());
}	// isVisible


Sprite.prototype.getExtents = function() {
  if (this.extents)
    return this.extents;
  else if (this.image && this.image.loaded)
    return new Extents2(this.location, this.getSize());
  else
    return null;
}	// getExtents


//
// printing methods
//


Sprite.prototype.toString = function() {
  return "Sprite";
}	// toString


//
// private methods
//

	
Sprite.prototype.onLoad = function(canvas) {
	
  // call superclass method
  //
  Element.prototype.onLoad.call(this, canvas);

  // create new image element
  //
  this.image = new Image();
  this.image.style.position = "absolute";
  disableSelection(this.image);
  disableDragging(this.image);

  // store handle to canvas
  //
  this.canvas = canvas;
  
  // process image when it loads
  //
  var self = this;
  this.image.onload = function() {
    self.onResize();	  

    // add element to canvas
    //
	if (!self.image.loaded)
      canvas.element.appendChild(self.image);
    self.image.loaded = true;
  }
  
  // initiate image download
  //
  this.image.src = this.icon.image.src; 
}	// onLoad


Sprite.prototype.onUnload = function() {
  if (this.canvas) {
    this.canvas.element.removeChild(this.image);
    this.canvas = null;
  }
}	// onUnload


Sprite.prototype.onResize = function() {
	
  // set image width and height
  //
  this.width = this.icon.image.width * this.scale;
  this.height = this.icon.image.height * this.scale;
  this.image.style.width = this.width + "px";
  this.image.style.height = this.height + "px";
  
  // set size
  //
  if (this.canvas)
    this.size = new Vector2(this.width / this.canvas.width, this.height / this.canvas.height);
	
  // set location
  //
  this.setLocation(this.location);
}	// onResize