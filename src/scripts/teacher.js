/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              teacher.js                 3d      |
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


function Teacher(location, scale, velocity, collisionMessage, explosionMessage, messageDisplay) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, "number", Vector2], 0), "Teacher " + argumentsType.error);
  
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
  GameElement.call(this, Teacher.icon, location, scale, velocity, new Vector2(.25, .25));
  
  // set attributes
  //
  this.collisionMessage = collisionMessage;
  this.explosionMessage = explosionMessage;
  this.messageDisplay = messageDisplay;
  this.vBounce = true;
  
  return this;
}    // Teacher


// inherit prototype from "superclass"
//
Teacher.prototype = new GameElement();


//
// "object" or "instance" methods
//


Teacher.prototype.start = function(intervalTime) {
	
  // call superclass method
  //
  GameElement.prototype.start.call(this, intervalTime);
  
  // start animation thread
  //
  var self = this;
  this.interval = window.setInterval(function() {
    if (self.icon == Teacher.icon)
	  self.setIcon(Teacher.icon2);
	else
	  self.setIcon(Teacher.icon);
  }, 75);
}    // start


Teacher.prototype.finish = function() {
  if (this.interval)
    window.clearTimeout(this.interval);
}	// finish


Teacher.prototype.explode = function(duration, onexplode) {

  // call superclass method
  //
  GameElement.prototype.explode.call(this, 1000, onexplode);
  
  // flash message
  //
  this.messageDisplay.flash(this.explosionMessage, duration);
}	// explode


Teacher.prototype.collide = function(duration, oncollide) {

  // call superclass method
  //
  //GameElement.prototype.explode.call(this, 1000);
  
  // flash message
  //
  this.messageDisplay.flash(this.collisionMessage, duration);
}	// collide


//
// private methods
//


Teacher.prototype.onLoad = function(canvas) {

  // call superclass method
  //
  GameElement.prototype.onLoad.call(this, canvas);
  
  // debug
  //
  // this.showBorder("white", 2);
}	// onLoad

  
Teacher.prototype.onUnload = function() {
  if (!this.canvas)
    return;
	
  // call superclass method
  //
  GameElement.prototype.onUnload.call(this);
}	// onUnload


//
// "class" or "static" variables
//


Teacher.icon = new Icon("images/owl/owl.png", "center", "middle", new Vector2(0, 0));
Teacher.icon2 = new Icon("images/owl/owl2.png", "center", "middle", new Vector2(0, 0));
