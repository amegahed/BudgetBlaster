/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              icon.js                   3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines the Javascript behaviors of a        |
|        Hypercosm icon.                                        |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Icon(image, hAlign, vAlign, anchor) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Image, "string", "string", Vector2], 1) || argumentsType(arguments, ["string", "string", "string", Vector2], 1), "Icon " + argumentsType.error);

  // set optional parameter defaults
  //
  if (hAlign == undefined)
    hAlign = "center";
  if (vAlign == undefined)
    vAlign = "middle";
  if (anchor == undefined)
    anchor = new Vector2(0, 0);
	
  // set attributes
  //
  if (typeof image == "string")
    this.image = new Image();
  else
    this.image = image;
  this.hAlign = hAlign;
  this.vAlign = vAlign;
  this.anchor = anchor;
  this.origin = new Vector2(0, 0);
 
  // create callback for when image is loaded
  //
  var self = this;
  this.image.onload = function() {
    self.onLoad();
  }
  
  // initiate image download
  //
  if (typeof image == "string")
    this.image.src = image;
	
  return this;
}    // Icon


//
// printing methods
//


Icon.prototype.toString = function() {
  return "Icon";
}	// toString


//
// private methods
//


Icon.prototype.onLoad = function() {
	
  // set image origin according to alignment
  //
  if (this.hAlign == "left")
    this.origin.x = 0;
  else if (this.hAlign == "center")
    this.origin.x = this.image.width / 2;
  else if (this.hAlign == "right")
    this.origin.x = this.image.width;
	
  if (this.vAlign == "top")
    this.origin.y = 0;
  else if (this.vAlign == "middle")
    this.origin.y = this.image.height / 2;
  else if (this.vAlign == "bottom")
    this.origin.y = this.image.height;

  // call user defined callback
  //
  if (this.onload)
    this.onload();
}	// onLoad