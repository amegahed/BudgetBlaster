/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm         digital_display.js             3d      |
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


function DigitalDisplay(value, location, hAlign, vAlign, className, precision, decimals) {
  if (arguments.length == 0)
    return;
  
  // check argument types
  //
  // assert(argumentsType(arguments, ["number", Vector2, "string", "string", "string", "number"], 2), "DigitalDisplay " + argumentsType.error);

  // set optional parameter defaults
  //
  if (hAlign == undefined)
    hAlign = "center";
  if (vAlign == undefined)
    vAlign = "middle";
	
  // call superclass constructor
  //
  Element.call(this, location);
  
  // set attributes
  //
  this.value = value;
  this.hAlign = hAlign;
  this.vAlign = vAlign;
  this.className = className;
  this.precision = precision;
  this.decimals = decimals;
  
  // set initial state
  //
  this.setValue(value);
	
  return this;
}    // DigitalDisplay


// inherit prototype from "superclass"
//
DigitalDisplay.prototype = new Text();


//
// "object" or "instance" methods
//


DigitalDisplay.prototype.setValue = function(value) {
	
  // set attributes
  //
  this.value = value;

  // call superclass method
  //
  if (this.decimals)
    this.setText(this.value.toPrecision(this.precision));
  else {
    this.setText(this.pad(this.value.toString()));
  }
}	// setValue


//
// printing methods
//


DigitalDisplay.prototype.toString = function() {
  return "DigitalDisplay";
}	// toString

//
//
//

DigitalDisplay.prototype.pad = function(number) {
  var str = '' + number;
  while (str.length < this.precision) {
    str = '0' + str;
  }
  return str;
}