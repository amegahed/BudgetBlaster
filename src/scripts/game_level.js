/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm            game_level.js               3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a game level and its collection      |
|        of various enemy and friendly objects.                 |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function GameLevel(length, elements, player, xOffset) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [ScrollingBackground, GameElement, Sprite, "number"], 0), "GameLevel " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (xOffset == undefined)
    xOffset = -.6;

  // set attributes
  //
  this.length = length;
  this.elements = elements;
  if (elements)
    this.numElements = elements.length;
  this.player = player;
  this.xOffset = xOffset;
  this.offset = 0;
  
  // sort array of enemies by x coordinate
  //
  if (this.elements)
    this.elements.sort(function(a, b) {
      return a.location.x - b.location.x;
    });
  
  return this;
}    // GameLevel


//
// "object" or "instance" methods
//


GameLevel.prototype.addOffset = function(offset) {
  this.offset += offset;
  
  // offset elements
  //
  for (var i = 0; i < this.numElements; i++) 
    if (this.elements[i]) {
      var x = this.elements[i].location.x - offset * 2;
	  if (x > -1) {
        if (this.elements[i].loaded)
          this.elements[i].setLocation(new Vector3(x, this.elements[i].location.y, this.elements[i].location.z));
        else {
          this.elements[i].location.x = x;
          if (x < 1)
            this.canvas.load(this.elements[i]);
        }
      } else {
        if (!this.elements[i].exploded && this.onmiss)
          this.onmiss(this.elements[i]);
        this.removeElement(this.elements[i]);
      }
    }
}	// addOffset


GameLevel.prototype.getIndex = function(element) {
  for (var i = 0; i < this.elements.length; i++)
    if (element == this.elements[i])
      return i;
}	// getIndex


GameLevel.prototype.removeElement = function(element) {
  var index = this.getIndex(element);
  
  // finish up animation etc.
  //
  this.elements[index].finish();
  
  // remove from display
  //
  this.canvas.unload(this.elements[index]);
  var element = this.elements[index];

  // remove from array
  //
  for (var i = index + 1; i < this.numElements; i++)
    this.elements[i - 1] = this.elements[i];
  this.numElements--;
 
  // call user defined callback
  //
  if (this.onremove)
    this.onremove(element);
}	// removeElement


GameLevel.prototype.collide = function(element) {
	
  // save collision location
  //
  this.crashLocation = this.player.location.clone();
  this.crashOffset = this.player.offset;

  // perform collision action for element
  //
  if (element.collide)
    element.collide(3000, this.oncollide);

  // perform user defined callback
  //
  if (this.oncollide)
    this.oncollide(element);
}	// collide


GameLevel.prototype.update = function(intervalTime) {

  // update player
  //
  this.player.update(intervalTime);
	
  // pan background to follow player
  //
  if (this.offset < this.length - 1 && !this.player.exploded) {
    this.player.offset = this.xOffset + (this.player.velocity.x - this.player.minSpeed) / 4;	
    var offset = -(this.player.offset - this.player.location.x);	
	    
    // offset level
    //
    this.addOffset(offset);
	  
    // offset player
    //
    this.player.setLocation(new Vector3(this.player.offset, this.player.location.y, this.player.location.z));
  } else {
  	
    // check to see if we're finished
    //
    if (this.player.location.x > 1.25 && !this.player.exploded) {
		
      // clear animation thread
      //
      window.clearInterval(this.interval);
	  
      // call user defined callback
      //
      if (this.onfinish)
        this.onfinish();
    }
  }

  // check for collisions with enemies
  //
  var playerExtents = this.player.getExtents();
  if (!this.player.isShieldsUp && !this.player.exploded)
    for (var i = 0; i < this.numElements; i++) {
      var element = this.elements[i];
      var extents = element.getExtents();
      if (extents && playerExtents.overlaps(extents) && !element.exploded) {
        if (element instanceof Money) {
          this.player.shieldsUp();
          element.take(3000);
          this.removeElement(element);
        } else if (this.player.location.x < 1)	{
          this.player.explode();
          this.collide(element);
          return;
        }
      }
    }
  
  // check for impacts of missiles
  //
  for (var i = 0; i < this.numElements; i++) {
    var element = this.elements[i];
    if (element.location.x < 1 && !element.exploded) {
      var extents = element.getExtents();
      if (extents) {
        for (var j = 0; j < this.player.missileCount; j++) {
          var missile = this.player.missiles[j];
          if (extents.contains(missile.location.toVector2())) {
            missile.finish();

            // explode
            //
            var self = this;
            element.explode(3000, function() {
              self.removeElement(element);
            });
            if (this.onhit)
              this.onhit(element);
          }
        }  // for
      }  // if extents
    }  // if element
  }  // for
}	// update


GameLevel.prototype.start = function(intervalTime) {
	
  // set attributes
  //
  this.intervalTime = intervalTime;
  
  // start game elements
  //
  for (var i = 0; i < this.elements.length; i++)
    if (this.elements[i].start)
	  this.elements[i].start(intervalTime);
	  
  // start update thread
  //
  var self = this;
  this.interval = window.setInterval(function() {
    self.update(self.intervalTime);
  }, intervalTime);

  // set player attributes
  //
  this.player.setLocation(new Vector3(this.xOffset, 0, this.player.location.z));
  this.player.velocity = new Vector2(this.player.minSpeed, 0);
  this.player.hWrap = false;
}    // start


//
// private methods
//


GameLevel.prototype.onLoad = function(canvas) {

  // set attributes
  //
  this.canvas = canvas;
}    // onLoad


GameLevel.prototype.onUnload = function() {
  
  // unload game elements
  //
  this.canvas.unload(this.elements);
  
  // set attributes
  //
  this.canvas = null;
}    // onUnload