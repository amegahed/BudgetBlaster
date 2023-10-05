/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              democrat.js               3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a class of game element.             |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Democrat(location, scale, velocity, name, district, photoIcon, messageDisplay, imageDisplay) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, "number", Vector2], 0), "Democrat " + argumentsType.error);
  
  // set defaults for optional params
  //
  if (location == undefined)
    location = new Vector2(0, 0);
  if (scale == undefined)
    scale = 1;
  if (velocity == undefined)
    velocity = new Vector2(0, 0);

  // call superclass constructor
  //
  GameElement.call(this, Democrat.icon, location, scale, velocity, new Vector2(.25, .25));
  
  // set attributes
  //
  this.name = name;
  this.district = district;
  this.photoIcon = photoIcon;
  this.messageDisplay = messageDisplay;
  this.imageDisplay = imageDisplay;
  this.vBounce = true;
  
  return this;
}    // Democrat


// inherit prototype from "superclass"
//
Democrat.prototype = new GameElement();


//
// "object" or "instance" methods
//


Democrat.prototype.start = function(intervalTime) {
	
  // call superclass method
  //
  GameElement.prototype.start.call(this, intervalTime);
  
  // start animation thread
  //
  var self = this;
  this.interval = window.setInterval(function() {
    if (self.icon == Democrat.icon)
	  self.setIcon(Democrat.icon2);
    else if (self.icon == Democrat.icon2)
	  self.setIcon(Democrat.icon3);
    else if (self.icon == Democrat.icon3)
	  self.setIcon(Democrat.icon4);
	else
	  self.setIcon(Democrat.icon);
  }, 100);
}    // start


Democrat.prototype.finish = function() {
  if (this.interval)
    window.clearTimeout(this.interval);
}	// finish


Democrat.prototype.explode = function(duration, onexplode) {

  // call superclass method
  //
  GameElement.prototype.explode.call(this, 1000, onexplode);
  
  // flash message
  //
  this.messageDisplay.flash(["You just blasted " + this.name, "from district " + this.district + "."], duration);
  
  // show photo
  //
  this.imageDisplay.setIcon(this.photoIcon);
  if (!this.imageDisplay.canvas)
    this.canvas.load(this.imageDisplay);
  this.imageDisplay.showBorder("black", 2);
  
  // set timeout for removing photo
  //
  var self = this;
  window.setTimeout(function() {
    if (self.imageDisplay.icon == self.photoIcon)
	  if (self.imageDisplay.canvas)
        self.imageDisplay.canvas.unload(self.imageDisplay);
  }, duration);
}	// explode


Democrat.prototype.collide = function(duration, oncollide) {

  // call superclass method
  //
  //GameElement.prototype.explode.call(this, 1000);
  
  // flash message
  //
  this.messageDisplay.flash(["You just got blasted by " + this.name, "from district " + this.district + "."], duration);
  
  // show photo
  //
  this.imageDisplay.setIcon(this.photoIcon);
  if (!this.imageDisplay.canvas)
    this.canvas.load(this.imageDisplay);
  this.imageDisplay.showBorder("black", 2);
  
  // set timeout for removing photo
  //
  var self = this;
  window.setTimeout(function() {
    if (self.imageDisplay.icon == self.photoIcon)
	  if (self.imageDisplay.canvas)
        self.imageDisplay.canvas.unload(self.imageDisplay);
  }, duration);
}	// collide


//
// private methods
//


Democrat.prototype.onLoad = function(canvas) {

  // call superclass method
  //
  GameElement.prototype.onLoad.call(this, canvas);
  
  // debug
  //
  // this.showBorder("white", 2);
}	// onLoad

  
Democrat.prototype.onUnload = function() {
  if (!this.canvas)
    return;
	
  // call superclass method
  //
  GameElement.prototype.onUnload.call(this);
}	// onUnload


//
// "class" or "static" variables
//


Democrat.icon = new Icon("images/donkey/donkey1.png", "center", "middle", new Vector2(0, 0));
Democrat.icon2 = new Icon("images/donkey/donkey2.png", "center", "middle", new Vector2(0, 0));
Democrat.icon3 = new Icon("images/donkey/donkey3.png", "center", "middle", new Vector2(0, 0));
Democrat.icon4 = new Icon("images/donkey/donkey4.png", "center", "middle", new Vector2(0, 0));
