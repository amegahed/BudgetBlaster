/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm            items_display.js            3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a display for graphically			|
|        showing the number of items.                           |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function ItemsDisplay(location, icon, scale, value, spacing) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector3, Icon, "number", "number", "number"]), "ItemsDisplay arguments");

  // set defaults
  //
  if (spacing == undefined)
    spacing = .125; 
	
  // set attributes
  //
  this.location = location;
  this.value = value;
  
  // create sprites
  //
  this.sprites = new Array(value);
  var x = this.location.x - ((value - 1) * spacing / 2);
  var y = this.location.y;
  var z = this.location.z;
  for (var i = 0; i < value; i++) {
    this.sprites[i] = new Sprite(icon, new Vector3(x, y, z), scale);
	x += spacing;
  }
  
  return this;
}    // ItemsDisplay


//
// "object" or "instance" methods
//


ItemsDisplay.prototype.decrement = function() {
  if (this.value > 0) {
    this.value--;
    this.canvas.unload(this.sprites[this.value]);
  }
}    // decrement


//
// private methods
//


ItemsDisplay.prototype.onLoad = function(canvas) {

  // set attributes
  //
  this.canvas = canvas;
  
  // add graphics
  //
  this.canvas.load(this.sprites);
}    // onLoad
