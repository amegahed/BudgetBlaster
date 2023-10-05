/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              canvas.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines the Javascript behavior of a         |
|        graphics canvas.                                       |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Canvas(element, parent) {
  if (arguments.length == 0)
    return;
  
  // check argument types
  //
  // assert(argumentsType(arguments, ["string", "object"], 1), "canvas " + argumentsType.error);

  // call superclass constructor
  //
  Component.call(this, element, parent);
  
  // set attributes
  //
  this.width = this.element.clientWidth;
  this.height = this.element.clientHeight;
  this.left = getWindowLeft(this.element);
  this.top = getWindowTop(this.element);
  this.origin = new Vector2(this.width / 2, this.height / 2);

  // create resize event handler
  //
  var self = this;
  window.onresize = function() {
    self.onResize();
  }
  
  return this;
}    // Canvas


// inherit prototype from "superclass"
//
Canvas.prototype = new Component();


//
// "object" or "instance" methods
//


Canvas.prototype.setColor = function(color) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["string"]), "Canvas.setColor " + argumentsType.error);
  
  // set attributes
  //
  this.element.style.background = color;
}	// setColor


Canvas.prototype.load = function(element) {
  if (!element)
    return;
	
  // load array elements
  //
  if (isArray(element)) {
    for (var i = 0; i < element.length; i++)
      if (element[i] && element[i].onLoad)
        element[i].onLoad(this);
		
  // load non array elements
  //
  } else if (element.onLoad)
    element.onLoad(this);
}	// load


Canvas.prototype.unload = function(element) {
  
  // unload array elements
  //
  if (isArray(element)) {
    for (var i = 0; i < element.length; i++)
      if (element[i] && element[i].onLoad)
        element[i].onUnload(this);
		
  // unload non array elements
  //
  } else if (element.onUnload)
    element.onUnload(this);
}	// unload


Canvas.prototype.toScreenCoords = function(pixel) {
  var x = (pixel.x / this.width) * 2 - 1;
  var y = (pixel.y / this.height) * -2 + 1;
  return new Vector2(x, y);
}	// toScreenCoords


//
// printing methods
//


Canvas.prototype.toString = function() {
  return "canvas";
}	// toString


//
// private methods
//


Canvas.prototype.onResize = function() {
	
  // reset attributes
  //
  this.width = this.element.clientWidth;
  this.height = this.element.clientHeight;
  this.left = getWindowLeft(this.element);
  this.top = getWindowTop(this.element);
  this.origin = new Vector2(this.width / 2, this.height / 2);
}	// onResize