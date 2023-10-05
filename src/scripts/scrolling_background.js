/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm        scrolling_background.js         3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a scrolling background utility       |
|        that can be used for 2D scroller games.                |
|                                                               |
|***************************************************************|
|                Copyright (c) 2007 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function ScrollingBackground(length, imageNames, offset, vAlign, imagePath, zIndex) {

  // check argument types
  //
  // assert(argumentsType(arguments, ["number", ["string"], "number", "string", "string", "number"], 1), "ScrollingBackground " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (offset == undefined)
    offset = 0;
  if (vAlign != "top" && vAlign != "bottom")
    vAlign = "top";
  if (imagePath == undefined)
    imagePath = "";
  if (zIndex == undefined)
    zIndex = 0;
  
  // set attributes
  //
  this.length = length;
  this.imageNames = imageNames;
  this.offset = offset;
  this.vAlign = vAlign;
  this.zIndex = zIndex;
  
  // create array of images
  //
  this.images = new Array(imageNames.length);
  for (var i = 0; i < imageNames.length; i++) {
    this.images[i] = new Image();
    if (imagePath)
      this.images[i].src = imagePath + imageNames[i];
    else
      this.images[i].src = imageNames[i];
  }
 
  return this;
}    // ScrollingBackground


//
// "object" or "instance" methods
//


ScrollingBackground.prototype.addOffset = function(offset) {

  // check argument types
  //
  // assert(argumentsType(arguments, ["number"]), "ScrollingBackground.addOffset arguments");
  
  // set attribute
  //
  this.offset += offset;
  this.xmin = -1 + offset;
  this.xmax = 1 + offset;
  
  // set left image
  //
  var leftIndex = Math.floor(this.offset % this.images.length);
  if (offset > 0 && leftIndex != this.leftIndex && this.leftIndex != undefined) {
	  
    // unload previous left image
	//
	if (this.leftImage) {
      this.leftImage.parentNode.removeChild(this.leftImage);	
	  this.leftImage.loaded = false;
	}
  }
  this.leftIndex = leftIndex;
  this.leftImage = this.images[this.leftIndex];
  if (this.leftImage) {
    this.leftImage.left = -Math.floor((this.offset - Math.floor(this.offset)) * this.canvas.width);  
    this.leftImage.style.left = this.leftImage.left; 
    this.leftImage.style.zIndex = this.zIndex;
  }
  
  // load new left image if necessary
  //
  if (this.leftImage && !this.leftImage.loaded) {
    this.canvas.element.appendChild(this.leftImage); 
    this.leftImage.loaded = true;
  }
  
  // set right image
  //
  var rightIndex = Math.floor((this.offset + 1) % this.images.length);
  if (offset < 0 && rightIndex != this.rightIndex && this.rightIndex != undefined) {
	  
    // unload previous right image
	//
	if (this.rightImage) {
      this.rightImage.parentNode.removeChild(this.rightImage);
	  this.rightImage.loaded = false;
	}
  }
  this.rightIndex = rightIndex;
  this.rightImage = this.images[this.rightIndex];
  if (this.rightImage) {
    this.rightImage.left = -Math.floor((this.offset - Math.floor(this.offset + 1)) * this.canvas.width);  
    this.rightImage.style.left = this.rightImage.left; 
    this.rightImage.style.zIndex = this.zIndex;
  }
  
  // load new right image if necessary
  //
  if (this.rightImage && !this.rightImage.loaded) {
    this.canvas.element.appendChild(this.rightImage); 
    this.rightImage.loaded = true;
  }
}    // addOffset


//
// private methods
//


ScrollingBackground.prototype.onLoad = function(canvas) {
  this.canvas = canvas;
  
  // add visible polygons
  //
  for (var i = 0; i < this.images.length; i++) {
    var image = this.images[i];
    image.style.position = "absolute";
	
    // make image unselectable
    //
    disableSelection(image);
    disableDragging(image);
	
    // set image width and height
    //
    image.width = canvas.width;

    // set image position
    //
	if (this.vAlign == "top") {
      image.top = 0;
      image.left = 0;
      image.style.top = image.top + "px";
      image.style.left = image.left + "px";
	} else if (this.vAlign == "bottom") {
      image.top = canvas.height - image.height;
      image.left = 0;
      image.style.top = image.top + "px";
      image.style.left = image.left + "px";
	}
  }
  
  // load visible images
  //
  this.addOffset(0);
}    // onLoad


ScrollingBackground.prototype.onUnload = function() {
  
  // remove images
  //
  for (i = 0; i < this.images.length; i++)
    this.canvas.removeChild(this.images[i]);
  
  // reset attributes
  //
  this.images = null;
  
  // reset reference to canvas
  //
  this.canvas = null;
}    // onUnload