/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             missile.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a game sprite missile class.         |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Missile(location, velocity, lifetime, hWrap, vWrap) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, Vector2, "number"]) || argumentsType(arguments, [Vector3, Vector2, "number"]), "Missile " + argumentsType.error);

  // set defaults for optional params
  //
  if (location == undefined)
    location = new Vector2(0, 0);
  if (velocity == undefined)
    velocity = new Vector2(0, 0);
  if (lifetime == undefined)
    lifetime = 1000;
	
  // call superclass constructor
  //
  AnimatedSprite.call(this, Missile.icon, location, 1, velocity, hWrap, vWrap)

  // set attributes
  //
  this.location = location;
  this.velocity = velocity;
  this.lifetime = lifetime;
  this.onfinish = null;
 
  return this;
}    // Missile


// inherit prototype from "superclass"
//
Missile.prototype = new AnimatedSprite();


//
// "object" or "instance" methods
//



Missile.prototype.update = function(intervalTime) {

  // add gravity
  //
  this.velocity.y -= (intervalTime / 1000) * .1;

  // call superclass method
  //
  AnimatedSprite.prototype.update.call(this, intervalTime);
}	// update


Missile.prototype.start = function(intervalTime) {
	
  // call superclass method
  //
  AnimatedSprite.prototype.start.call(this, intervalTime);
  
  // start missile animation thread
  //
  var self = this;
  this.animationInterval = window.setInterval(function() {
    if (self.icon == Missile.icon)
	  self.setIcon(Missile.icon2);
    else
	  self.setIcon(Missile.icon);
  }, 100);
  
  // start timeout 
  //
  this.timeout = window.setTimeout(function() {
    self.finish();
  }, this.lifetime);
}    // start


Missile.prototype.finish = function() {
  window.clearInterval(this.updateInterval);
  window.clearInterval(this.animationInterval);
  window.clearTimeout(this.timeout);
  if (this.canvas)
    this.canvas.unload(this);
  if (this.onfinish)
    this.onfinish();
}    // finish


// class variables
//
Missile.icon = new Icon("images/spaceship/star.png", "center", "middle");
Missile.icon2 = new Icon("images/spaceship/star2.png", "center", "middle");