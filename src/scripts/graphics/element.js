/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             element.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines the Javascript behavior of a         |
|        graphics element.                                      |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Element(location) {
  if (arguments.length == 0)
    return;
  
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]) || argumentsType(arguments, [Vector3]), "Sprite " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (location == undefined)
    location = new Vector2(0, 0);

  // set attributes
  //
  this.location = location.clone();
  this.canvas = null;
	
  return this;
}    // Element


//
// "object" or "instance" methods
//


Element.prototype.isLoaded = function() {
  return (this.canvas != null);
}	// isLoaded


Element.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector3]), "Element.setLocation " + argumentsType.error);
  
  // set attributes
  //
  this.location = location;
}	// setLocation


Element.prototype.hide = function() {

  // modify page element
  //
  if (this.element)
    this.element.style.display = 'none'; 
}	// hide


Element.prototype.show = function() {

  // modify page element
  //
  if (this.element)
    this.element.style.display = 'block'; 
}	// show


//
// printing methods
//


Element.prototype.toString = function() {
  return "Element";
}	// toString


//
// private methods
//


Element.prototype.onLoad = function(canvas) {
	
  // only load once
  //
  if (this.canvas)
    return;

  // set attributes
  //
  this.canvas = canvas;
  this.loaded = true;
}	// onLoad