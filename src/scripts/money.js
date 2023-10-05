/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm               money.js                 3d      |
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


function Money(location, scale, velocity, amount, donor, logoIcon, messageDisplay, imageDisplay) {

  // check argument types
  //
  // assert(argumentsType(arguments, [Vector3, "number", Vector2, "number", "number", Text]), "Money " + argumentsType.error);
  
  // set defaults for optional params
  //
  if (location == undefined)
    location = new Vector3(0, 0, 0);
  if (scale == undefined)
    scale = 1;
  if (velocity == undefined)
    velocity = new Vector2(0, 0);

  // call superclass constructor
  //
  GameElement.call(this, Money.icon, location, scale, velocity);
  
  // set attributes
  //
  this.amount = amount;
  this.donor = donor;
  this.logoIcon = logoIcon;
  this.messageDisplay = messageDisplay;
  this.imageDisplay = imageDisplay;
  
  return this;
}    // Money


// inherit prototype from "superclass"
//
Money.prototype = new GameElement();


//
// "object" or "instance" methods
//


Money.prototype.pad = function(number, digits) {
  var str = '' + number;
  while (str.length < digits) {
    str = '0' + str;
  }
  return str;
}	// pad


Money.prototype.dollarsToString = function(amount) {
  var dollars = "$";
  if (amount > 1000) {
    var thousands = Math.floor(amount / 1000);
    dollars += thousands;
    dollars += ",";
    dollars += this.pad(amount - thousands * 1000, 3);
  } else
    dollars += amount;
  return dollars;
}	// dollarsToString


Money.prototype.take = function(duration) {
  
  // flash message
  //
  this.messageDisplay.flash(["You just took " + this.dollarsToString(this.amount), "from " + this.donor + "."], duration);
  
  // show logo
  //
  this.imageDisplay.setIcon(this.logoIcon);
  if (!imageDisplay.canvas)
    this.canvas.load(this.imageDisplay);
  this.imageDisplay.showBorder("black", 2);
  
  // set timeout for removing logo
  //
  var self = this;
  window.setTimeout(function() {
    if (self.imageDisplay.icon == self.logoIcon)
      if (self.imageDisplay.canvas)
        self.imageDisplay.canvas.unload(self.imageDisplay);
  }, duration);
}	// take


//
// "class" or "static" variables
//


Money.icon = new Icon("images/sprites/money.png", "center", "middle", new Vector2(0, 0));
