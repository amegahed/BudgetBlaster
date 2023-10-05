/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm          animated_sprite.js            3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a DOM animated sprite object.        |
|        An animated sprite is like a normal sprite but         |
|        has additional methods for animation and for           |
|        finding visibility and extents.                        |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function AnimatedSprite(icon, location, scale, velocity, hWrap, vWrap, hBounce, vBounce) {
  if (arguments[0] == null)
    return;
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Icon, Vector2, "number", Vector2, "boolean", "boolean", "boolean", "boolean"], 2) || argumentsType(arguments, [Icon, Vector3, "number", Vector2, "boolean", "boolean", "boolean", "boolean"], 2), "Sprite " + argumentsType.error);   
	
  // set defaults
  //
  if (scale == undefined)
    scale = 1;
  if (velocity == undefined)
    velocity = new Vector2(0, 0);

  // call superclass constructor
  //
  Sprite.call(this, icon, location, scale);  
  
  // set attributes
  //
  this.velocity = velocity;
  this.hWrap = hWrap;
  this.vWrap = vWrap;
  this.hBounce = hBounce;
  this.vBounce = vBounce;
  
  return this;
}    // AnimatedSprite


// inherit prototype from "superclass"
//
AnimatedSprite.prototype = new Sprite();


//
// "object" or "instance" methods
//


AnimatedSprite.prototype.setLocation = function(location) {

  // check for wraparound or bounce
  //
  if (this.hWrap) {
    if (location.x < -1)
      location.x = 1;
	else if (location.x > 1)
	  location.x = -1;
  } else if (this.hBounce) {
    if (location.x < -1) {
	  location.x = -1;
      this.velocity.x = -this.velocity.x;
	} else if (location.x > 1) {
	  location.x = 1;
	  this.velocity.x = -this.velocity.x;
	}
  }
  if (this.vWrap) {
    if (location.y < -1)
      location.y = 1;
    else if (location.y > 1)
      location.y = -1;
  } else if (this.vBounce) {
    if (location.y < -1) {
	  location.y = -1;
      this.velocity.y = -this.velocity.y;
	} else if (location.y > 1) {
      location.y = 1;
	  this.velocity.y = -this.velocity.y;
	}
  }
  
  // call superclass method
  //
  Sprite.prototype.setLocation.call(this, location);

  // invalidate extents
  //
  this.extents = null;
}    // setLocation


AnimatedSprite.prototype.update = function(intervalTime) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["number"], 0), "AnimatedSprite.start " + argumentsType.error);
  
  // update location
  //
  this.setLocation(this.location.plus(this.velocity.scaledBy(intervalTime / 1000).toVector3(0)));
}    // update


AnimatedSprite.prototype.start = function(intervalTime) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["number"], 0), "AnimatedSprite.start " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (intervalTime == undefined)
    intervalTime = 30;

  // set attributes
  //
  this.intervalTime = intervalTime;
  
  // start update thread
  //
  var self = this;
  this.interval = window.setInterval(function() {
    self.update(self.intervalTime);
  }, this.intervalTime);
}    // start


AnimatedSprite.prototype.finish = function() {
  window.clearInterval(this.interval);
}    // finish


//
// private methods
//


AnimatedSprite.prototype.onLoad = function(canvas) {
  if (this.canvas)
    return;

  // call superclass method
  //
  Sprite.prototype.onLoad.call(this, canvas);

  // show bounds
  //
  if (this.showingBounds)
    this.canvas.load(this.boundingBox);
}	// onLoad


AnimatedSprite.prototype.onUnload = function() {
  if (this.showingBounds)
    this.applet.removeOverlay(this.boundingBox);
  
  // call superclass method
  //
  Sprite.prototype.onUnload.call(this);
}	// onUnload


//
// "static" or "class" members
//


AnimatedSprite.screenExtents = new Extents2(new Vector2(0, 0), new Vector2(2, 2));
