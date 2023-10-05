/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm           game_element.js              3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a class of game elements.            |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function GameElement(icon, location, scale, velocity, size) {
  if (arguments[0] == null)
    return;

  // check argument types
  //
  // assert(argumentsType(arguments, [Icon, Vector2, "number", Vector2, Vector2], 2), "GameElement " + argumentsType.error);  
  
  // set defaults for optional params
  //
  if (scale == undefined)
    scale = 1;
  if (velocity == undefined)
    velocity = new Vector2(0, 0);

  // call superclass constructor
  //
  AnimatedSprite.call(this, icon, location, scale, velocity);
  
  // set attributes
  //
  this.size = size;
  
  return this;
}    // GameElement


// inherit prototype from "superclass"
//
GameElement.prototype = new AnimatedSprite();


//
// "object" or "instance" methods
//


GameElement.prototype.setLocation = function(location) {
	
  // call superclass method
  //
  AnimatedSprite.prototype.setLocation.call(this, location);
  
  // set border location
  //
  if (this.border)
    this.border.setLocation(location);
}    // setLocation


GameElement.prototype.getSize = function() {
  if (this.size)
    return this.size;
  else
    return Sprite.prototype.getSize.call(this);
}    // getSize


GameElement.prototype.showBorder = function(color, thickness) {
  if (this.border) {
    this.border.setStyle(color, thickness);
  } else {
    this.border = new Rect(this.location, this.size, color, thickness);
	if (this.canvas)
	  this.canvas.load(this.border);
  }
}    // showBorder


GameElement.prototype.hideBorder = function() {
  if (this.canvas) {
    this.canvas.unload(this.border);
	this.border = null;
  }
}    // hideBorder


GameElement.prototype.explode = function(duration, onfinish) {
  if (!this.exploded) {
	  
    // stop current animation
	//
    if (this.finish)
	  this.finish();
	  
    // explode
	//
    this.setIcon(GameElement.explosionIcon);
    //GameElement.explosionSound.play();

    // remove object from display after explosion
	//
    var self = this;
    this.timeout = window.setTimeout(function() {
      if (self.canvas)
	    self.canvas.unload(self);
    }, duration);
	
    this.exploded = true;
  }
}    // explode


//
// private methods
//


GameElement.prototype.onLoad = function(canvas) {
	
  // call superclass method
  //
  AnimatedSprite.prototype.onLoad.call(this, canvas);  
  
  // load sounds
  //
  this.canvas.load(GameElement.explosionSound);
}    // onLoad


GameElement.prototype.onUnload = function() {
	
  // unload border
  //
  if (this.border)
    this.canvas.unload(this.border);
	
  // call superclass method
  //
  AnimatedSprite.prototype.onUnload.call(this);  
}    // onUnload


// class variables
//
GameElement.explosionIcon = new Icon("images/sprites/blue_blasts.gif", "center", "middle", new Vector2(0, 0));
//GameElement.explosionIcon = new Icon("images/sprites/mushroom-cloud.png", "center", "middle", new Vector2(0, 0));
GameElement.explosionSound = new Sound("sounds/explosion.mp3");