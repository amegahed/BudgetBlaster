/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             spaceship.js               3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a game spaceship object.             |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function SpaceShip(location, scale, velocity, hWrap, vWrap) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector2, "number", Vector2, "boolean", "boolean"], 1) || argumentsType(arguments, [Vector3, "number", Vector2, "boolean", "boolean"], 1), "SpaceShip " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (scale == undefined)
    scale = 1;
  if (velocity == undefined)
    velocity = new Vector2(0, 0);

  // call superclass method
  //
  GameElement.call(this, SpaceShip.icon, location, scale, velocity, new Vector2(.35, .35));
	
  // set attributes
  //
  this.thrust = 0;
  this.maxThrust = 1;
  this.minSpeed = .1;
  this.maxSpeed = .5;
  this.upDownSpeed = 2;
  this.onfire = null;
  this.isShieldsUp = false;
  this.shieldsRotation = 0;
  this.missiles = new Array();
  this.missileCount = 0;
  this.shadowY = -.9;
  this.ymin = -.75;
  this.ymax = .75;
  this.shieldsDuration = 5000;
  this.animationInterval = 100;
  
  // create graphics
  //
  this.flamesSprite = new Sprite(SpaceShip.flamesIcon, location);
  this.shieldsSprite = new Sprite(SpaceShip.shieldsIcon, location);
  this.shadowSprite = new Sprite(SpaceShip.shadowIcon, new Vector3(location.x, this.shadowY, location.z));
  
  // create sounds
  //
  this.fireSound = new Sound("sounds/fire.wav");
  this.thrustSound = new Sound("sounds/rocket.wav", true);
  this.explosionSound = new Sound("sounds/explosion.mp3");
  this.shieldsUpSound = new Sound("sounds/chime_up.wav");
  this.shieldsDownSound = new Sound("sounds/chime_down.wav");
  this.sounds = [this.fireSound, this.thrustSound, this.explosionSound, this.shieldsUpSound, this.shieldsDownSound];
  
  // set keyboard keys
  // 
  this.thrustKey = 76;					// the 'L' key
  this.brakeKey = 75;					// the 'K' key
  this.fireKey = 32;					// the space key
  this.upKey = 87;						// the 'W' key
  this.downKey = 83;					// the 'S' key 
  this.shieldsKey = 85;					// the 'U' key 
  
  return this;
}    // SpaceShip


// inherit prototype from "superclass"
//
SpaceShip.prototype = new GameElement();


//
// "object" or "instance" methods
//


SpaceShip.prototype.setLocation = function(location) {
	
  // call superclass method
  //
  GameElement.prototype.setLocation.call(this, location);
  
  // set location of auxilliary sprites
  //
  this.flamesSprite.setLocation(location);
  if (this.isShieldsUp) {
    this.shieldsSprite.setLocation(this.location);
  }
  this.shadowSprite.setLocation(new Vector3(this.location.x, this.shadowY, this.location.z));
}    // setLocation


SpaceShip.prototype.fireMissile = function() {
  if (navigator.appName=="Netscape")
    var aspectRatio = window.innerHeight / window.innerWidth;
  else
    var aspectRatio = document.body.offsetHeight / document.body.offsetWidth;

  // create new missile
  //
  var missileLocation = this.location.plus(new Vector3(.2, 0, 0));
  var lifetime = 2000;
  var velocity = new Vector2(.5, this.velocity.y * .5);
  var missile = new Missile(missileLocation, velocity, lifetime, this.hWrap, this.vWrap);

  // create missile freeing method
  //
  var self = this;
  var index = this.missileCount;
  missile.onfinish = function() {
    self.removeMissile(index);
  }  
  
  // add missile to list
  //
  this.missiles[this.missileCount] = missile;
  this.missileCount++;
  
  // start missile
  //
  this.canvas.load(missile);
  missile.start(this.intervalTime);
  this.fireSound.play();
}	// fireMissile


SpaceShip.prototype.removeMissile = function(index) {
  for (var i = index + 1; i < this.missileCount; i++)
    this.missiles[i - 1] = this.missiles[i];
  this.missileCount--;
}    // removeMissile


SpaceShip.prototype.startFlames = function(interval) {
  var self = this;
  this.flamesAnimation = window.setInterval(function() {
    if (self.flamesSprite.icon == SpaceShip.flamesIcon)
      self.flamesSprite.setIcon(SpaceShip.flamesIcon2);
    else
      self.flamesSprite.setIcon(SpaceShip.flamesIcon);
  }, interval);
}	// startFlames


SpaceShip.prototype.stopFlames = function() {
  window.clearInterval(this.flamesAnimation);
}	// stopFlames


SpaceShip.prototype.startAnimation = function(interval) {
  var self = this;
  this.animation = window.setInterval(function() {
    if (self.icon == SpaceShip.icon)
      self.setIcon(SpaceShip.icon2);
    else
      self.setIcon(SpaceShip.icon);
  }, interval);
}	// startAnimation


SpaceShip.prototype.stopAnimation = function() {
  window.clearInterval(this.animation);
}	// stopAnimation


SpaceShip.prototype.finish = function() {
  this.stopFlames();
  this.stopAnimation();
}    // finish


SpaceShip.prototype.setThrust = function(thrust) {

  // update display
  //
  if (this.isLoaded) {
    if (thrust > 0) {
		
      // start thrust
	  //
      if (this.thrust <= 0) {
        this.canvas.load(this.flamesSprite);
		this.startFlames(100);
	    //this.thrustSound.play();
	  }
    } else {
		
      // stop thrust
	  //
      if (this.thrust > 0) {
        this.canvas.unload(this.flamesSprite);
	    this.stopFlames();
	    //this.thrustSound.stop();
      }	
    }
  }
  
  // set attributes
  //
  this.thrust = thrust;
}    // setThrust


SpaceShip.prototype.moveUp = function() {
  this.velocity.y = this.upDownSpeed;
}    // moveUp


SpaceShip.prototype.moveDown = function() {
  this.velocity.y = -this.upDownSpeed;
}    // moveDown


SpaceShip.prototype.flyRight = function() {
  this.velocity.y = 0;
}    // flyRight


SpaceShip.prototype.stop = function() {
  this.velocity.x = 0;
  this.velocity.y = 0;
}    // stop


SpaceShip.prototype.explode = function() {
  if (!this.exploded) {
    this.stopAnimation();
    this.setThrust(0);
    this.setIcon(SpaceShip.explosionIcon);
    this.explosionSound.play();
	this.disableMouse();
	this.disableKeyboard();
	this.exploded = true;
  }
}    // explode


SpaceShip.prototype.reset = function() {
  this.startAnimation(this.animationInterval);
  this.setThrust(0);
  this.setIcon(SpaceShip.icon);
  this.enableMouse();
  this.enableKeyboard();
  this.exploded = false;
  this.isShieldsUp = false;
}    // reset


SpaceShip.prototype.shieldsUp = function(duration) {
	
  // set optional parameter defaults
  //
  if (duration == undefined)
    duration = this.shieldsDuration;

  // set attributes
  //
  this.isShieldsUp = true;
  
  // display shields
  //
  this.canvas.load(this.shieldsSprite); 
  // this.shieldsUpSound.play()
  
  // start shields animation
  //
  var self = this;
  this.shieldsInterval = window.setInterval(function() {
    if (self.shieldsSprite.icon == SpaceShip.shieldsIcon)
	  self.shieldsSprite.setIcon(SpaceShip.shieldsIcon2);
	else
	  self.shieldsSprite.setIcon(SpaceShip.shieldsIcon);
  }, 100);
  
  // set timeout for shields down
  //
  window.setTimeout(function() {
    self.shieldsDown();
  }, duration);
}	// shieldsUp


SpaceShip.prototype.shieldsDown = function() {
  if (this.shieldsInterval)
    window.clearInterval(this.shieldsInterval);
  this.isShieldsUp = false;
  this.canvas.unload(this.shieldsSprite);
  // this.shieldsDownSound.play();
}	// shieldsDown


SpaceShip.prototype.update = function(intervalTime) {
	
  // set attributes
  //
  this.intervalTime = intervalTime;
  
  // update ship's velocity
  //
  var speed = this.velocity.x;
  if (speed >= this.minSpeed && speed < this.maxSpeed) 
    this.velocity.x += this.thrust * .025;
    
  // slow from friction
  //
  if (speed > this.minSpeed)
	this.velocity.x -= speed * .005;
	
  // clamp speed to allowable range
  //
  if (this.velocity.x < this.minSpeed)
    this.velocity.x = this.minSpeed;
  else if (this.velocity.x > this.maxSpeed)
    this.velocity.x = this.maxSpeed;
	  
  // update ship's location
  //
  var location = this.location.plus(this.velocity.scaledBy(intervalTime / 1000).toVector3());
  if (location.y < this.ymin) {
    location.y = this.ymin;
	this.velocity.y = 0;
  } else if (location.y > this.ymax) {
    location.y = this.ymax;
	this.velocity.y = 0;
  }
  this.setLocation(location);
  
  // update ship's missiles
  //
  for (var i = 0; i < this.missileCount; i++)
    this.missiles[i].update(intervalTime);
}    // update


SpaceShip.prototype.enableMouse = function(eventSource) { 

  // set optional parameter defaults
  //
  if (eventSource == undefined)
    eventSource = document;

  // add mouse event handlers
  //
  var self = this;
  this.mouseMoveListener = $(eventSource).mousemove(function(event) {
    var location = self.canvas.toScreenCoords(new Vector2(event.pageX - self.canvas.left, event.pageY - self.canvas.top));
	var offset = -.5;
	if (location.x - offset > 0) {
	  self.setThrust(self.maxThrust * (location.x - offset));
	} else if (location.x - offset < -.1 && self.velocity.x > 0) {
	  self.setThrust(self.maxThrust * (location.x - offset));
	} else 
	  self.setThrust(0);

    if (Math.abs(location.y) > .1) {
	  self.velocity.y = self.upDownSpeed * location.y;
	} else
	  self.velocity.y = 0;
  });
  this.mouseDownListener = $(eventSource).click(function(event) {
    self.fireMissile();
  });
}	// enableMouse


SpaceShip.prototype.enableKeyboard = function(eventSource) {

  // set optional parameter defaults
  //
  if (eventSource == undefined)
    eventSource = document;

  // add keyboard event handler
  //
  var self = this;
  this.keyPressListener = $(eventSource).keypress(function(event) {
    self.fireMissile();
  });
}	// enableKeyboard


SpaceShip.prototype.disableMouse = function(eventSource) {
	
  // set optional parameter defaults
  //
  if (eventSource == undefined)
    eventSource = document;

  // remove mouse event handlers
  //
  $(eventSource).unbind('mousemove');
  $(eventSource).unbind('click');
}	// disableMouse


SpaceShip.prototype.disableKeyboard = function(eventSource) {
	
  // set optional parameter defaults
  //
  if (eventSource == undefined)
    eventSource = document;

  // remove keyboard event handler
  //
  $(eventSource).unbind('keypress');  
}	// disableKeyboard
	
	
//
// private methods
//


SpaceShip.prototype.onLoad = function(canvas) {

  // call superclass method
  //
  GameElement.prototype.onLoad.call(this, canvas); 
  
  // load resources
  //
  canvas.load(this.shadowSprite);
  canvas.load(this.sounds);

  // enable user interaction
  //
  this.enableMouse();
  this.enableKeyboard();

  // start spaceship animation
  //
  this.startAnimation(this.animationInterval);
  
  // debug
  //
  // this.showBorder("white", 2);
}    // onLoad


SpaceShip.prototype.onUnload = function() {
  this.finish();
  
  // unload resources
  //
  this.canvas.unload(this.shadowSprite);
  this.canvas.unload(this.sounds);
  
  // disable user interaction
  //
  this.disableMouse();
  this.disableKeyboard();
  
  // call superclass method
  //
  GameElement.prototype.onUnload.call(this, canvas); 
}    // finish


// class variables
//
SpaceShip.icon = new Icon("images/spaceship/scott-walker-flying1.png", "center", "middle", new Vector2(7, 15));
SpaceShip.icon2 = new Icon("images/spaceship/scott-walker-flying2.png", "center", "middle", new Vector2(7, 15));
SpaceShip.flamesIcon = new Icon("images/spaceship/flames1.png", "right", "middle", new Vector2(90, 0));
SpaceShip.flamesIcon2 = new Icon("images/spaceship/flames2.png", "right", "middle", new Vector2(90, 0));
SpaceShip.shieldsIcon = new Icon("images/spaceship/shields.png", "center", "middle", new Vector2(15, 0));
SpaceShip.shieldsIcon2 = new Icon("images/spaceship/shields2.png", "center", "middle", new Vector2(15, 0));
SpaceShip.shadowIcon = new Icon("images/spaceship/shadow.png", "center", "middle", new Vector2(0, 0));
SpaceShip.explosionIcon = new Icon("images/sprites/red_blasts.gif", "center", "middle", new Vector2(0, 0));