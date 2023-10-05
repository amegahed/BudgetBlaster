/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              text.js                   3d      |
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


function Text(text, location, hAlign, vAlign, className) {
  if (arguments.length == 0)
    return;
  
  // check argument types
  //
  // assert(argumentsType(arguments, ["string", Vector2, "string", "string", "string"], 2) || argumentsType(arguments, [["string"], Vector2, "string", "string", "string"], 2), "Text " + argumentsType.error);

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
  this.text = text;
  this.hAlign = hAlign;
  this.vAlign = vAlign;
  this.className = className;
	
  return this;
}    // Text


// inherit prototype from "superclass"
//
Text.prototype = new Element();


//
// "object" or "instance" methods
//


Text.prototype.setText = function(text) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["string"]) || argumentsType(arguments, [["string"]]), "Text.setText " + argumentsType.error);

  // set attributes
  //
  this.text = text;
  
  // replace text
  //
  if (this.canvas) {
	  
    // remove previous text
	//
	while (this.element.firstChild != null)
      this.element.removeChild(this.element.firstChild);

    // add text
    //
    if (typeof this.text == "string")
      this.element.appendChild(document.createTextNode(this.text));
    else if (isArray(this.text)) {
      for (var i = 0; i < this.text.length; i++) {
        this.element.appendChild(document.createTextNode(this.text[i]));
	    this.element.appendChild(document.createElement("br"));
	  }
    }
	
    // recompute text offsets
    //
    this.onResize();
	  
    // reposition text
    //
	if (this.hOffset != 0 || this.vOffset != 0)
      this.setLocation(this.location);
  }
}	// setText


Text.prototype.setLocation = function(location) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2]), "Text.setLocation " + argumentsType.error);

  // set attributes
  //
  this.location = location;
  
  // set image location
  //
  if (this.canvas) {
    this.left = (this.canvas.width / 2) + location.x * (this.canvas.width / 2) + this.hOffset;
    this.top = (this.canvas.height / 2) - location.y * (this.canvas.height / 2) + this.vOffset;
    this.element.style.left = this.left;
    this.element.style.top = this.top;
    if (location.z != undefined)
	  this.element.style.zIndex = location.z;
  }
}	// setLocation


Text.prototype.clear = function() {

  // set attributes
  //
  this.text = "";
  
  // replace text
  //
  if (this.canvas) {
	  
    // remove previous text
	//
	while (this.element.firstChild != null)
      this.element.removeChild(this.element.firstChild);
  }
}	// clear


Text.prototype.addText = function(text) {
  if (typeof(text) == "string") {
    if (typeof(this.text) == "string")
	  this.setText(this.text + text);			// add single line text to single line text
	else
	  this.setText(this.text.concat([text]));	// add single line text to multi line text
  } else {
    if (typeof(this.text) == "string")
	  this.setText([this.text].concat(text));	// add multi line text to single line text
	else
	  this.setText(this.text.concat(text));		// add multi line text to multi line text
  }
}	// addText


Text.prototype.flash = function(message, duration) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["string", "number"], 1) || argumentsType(arguments, [["string"], "number"], 1), "Text.flash " + argumentsType.error);

  // clear previous timeout, if necessary
  //
  if (this.timeout)
    window.clearTimeout(this.timeout);
	
  // set current text
  //
  this.show();
  this.setText(message);
  
  // set default duration
  //
  if (duration == undefined)
    duration = 1000;
  
  // schedule text clear after duration
  //
  var self = this;
  this.timeout = window.setTimeout(function() {
    self.hide();
  }, duration);
}	// flash


//
// printing methods
//


Text.prototype.toString = function() {
  return "Text";
}	// toString


//
// private methods
//

	
Text.prototype.onLoad = function(canvas) {
	
  // only load once
  //
  if (this.canvas)
    return;

  // create new image element
  //
  this.element = document.createElement("div");
  this.element.style.position = "absolute";
  if (this.className)
    this.element.setAttribute((document.all ? "className" : "class"), this.className);
	
  // add text
  //
  if (typeof this.text == "string")
	this.element.appendChild(document.createTextNode(this.text));
  else if (isArray(this.text)) {
    for (var i = 0; i < this.text.length; i++) {
      this.element.appendChild(document.createTextNode(this.text[i]));
	  this.element.appendChild(document.createElement("br"));
	}
  }
	
  // disable interaction with element
  //
  disableSelection(this.element);
  disableDragging(this.element);
  
  // add element to canvas
  //
  canvas.element.appendChild(this.element);
  
  // store handle to canvas
  //
  this.canvas = canvas;
  
  // set location of new element
  //
  this.onResize();
  this.setLocation(this.location);
}	// onLoad


Text.prototype.onUnload = function() {
  if (this.canvas) {
    this.canvas.element.removeChild(this.element);
    this.canvas = null;
  }
}	// onUnload


Text.prototype.onResize = function() {
	
  // compute text offsets
  //
  if (this.hAlign == "left")
     this.hOffset = 0;
  else if (this.hAlign == "center")
    this.hOffset = -this.element.clientWidth / 2;
  else if (this.hAlign == "right")
    this.hOffset = -this.element.clientWidth;
  if (this.vAlign == "top")
    this.vOffset = 0;
  else if (this.vAlign == "middle")
    this.vOffset = -this.element.clientHeight / 2;
  else if (this.vAlign == "bottom")
    this.vOffset = -this.element.clientHeight;
}	// onResize