/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              worker.js                 3d      |
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


function Worker(location, scale, velocity, title, salary, messageDisplay) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, "number", Vector2], 0), "Worker " + argumentsType.error);
  
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
  GameElement.call(this, Worker.icon, location, scale, velocity, new Vector2(.25, .25));
  
  // set attributes
  //
  this.title = title;
  this.salary = salary;
  this.messageDisplay = messageDisplay;
  this.vBounce = true;
  
  return this;
}    // Worker


// inherit prototype from "superclass"
//
Worker.prototype = new GameElement();


//
// "object" or "instance" methods
//


Worker.prototype.start = function(intervalTime) {
	
  // call superclass method
  //
  GameElement.prototype.start.call(this, intervalTime);
  
  // start animation thread
  //
  var self = this;
  this.interval = window.setInterval(function() {
    if (self.icon == Worker.icon)
	  self.setIcon(Worker.icon2);
	else
	  self.setIcon(Worker.icon);
  }, 75);
}    // start


Worker.prototype.finish = function() {
  if (this.interval)
    window.clearTimeout(this.interval);
}	// finish


Worker.prototype.explode = function(duration, onexplode) {

  // call superclass method
  //
  GameElement.prototype.explode.call(this, 1000, onexplode);
  
  // flash message
  //
  this.messageDisplay.flash(["You just swatted " + " " + this.title, "earning " + Money.prototype.dollarsToString(this.salary) + " per year."], duration);
}	// explode


Worker.prototype.collide = function(duration, oncollide) {

  // call superclass method
  //
  //GameElement.prototype.explode.call(this, 1000);
  
  // flash message
  //
  this.messageDisplay.flash(["You just got stung by " + this.title, "earning " + Money.prototype.dollarsToString(this.salary) + " per year."], duration);
}	// collide


//
// private methods
//


Worker.prototype.onLoad = function(canvas) {

  // call superclass method
  //
  GameElement.prototype.onLoad.call(this, canvas);
  
  // debug
  //
  // this.showBorder("white", 2);
}	// onLoad

  
Worker.prototype.onUnload = function() {
  if (!this.canvas)
    return;
	
  // call superclass method
  //
  GameElement.prototype.onUnload.call(this);
}	// onUnload


//
// "class" or "static" variables
//


Worker.icon = new Icon("images/bee/bee.png", "center", "middle", new Vector2(0, 0));
Worker.icon2 = new Icon("images/bee/bee2.png", "center", "middle", new Vector2(0, 0));
