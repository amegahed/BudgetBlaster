/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm          hc_game_interface.js          3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a game interface using the           |
|        Hypercosm MarkUp API.                                  |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function HCGameInterface(numLives, score, time, numEnemies) {
  
  // set optional parameter defaults
  //
  if (numLives == undefined)
    numLives = 3;
  if (score == undefined)
    score = 0;
  if (time == undefined)
    time = 3;
  if (numEnemies == undefined)
    numEnemies = 0;
	
  // check argument types
  //
  // assert(argumentsType(arguments, ["number", "number", "number", "number"]), "HCGameInterface arguments"); 

  var labelOffset = .125;
  var digitSpacing = .075;
  
  // create displays
  //
  this.messageFont = new HCFont("Impact", 48)
  this.messageDisplay = new HCText("", new HCVector2(0, .5), "center", "middle", white, this.messageFont); 
  
  // create lives display at upper left
  //
  this.livesDisplay = new HCLivesDisplay(new HCVector3(-.75, .75, 0), HCSpaceShip.icon, numLives - 1, digitSpacing); 
  this.livesDisplayLabel = new HCText("Lives Remaining:", new HCVector2(-.75, .75 + labelOffset), "center", "middle", white, new HCFont("Impact", 20)); 
  
  // create score display at upper right
  //
  this.scoreDisplay = new HCDigitalDisplay(new HCVector3(.75, .75, 0), "LED_.png", score, 3, yellow, "center", digitSpacing); 
  this.scoreDisplayLabel = new HCText("Score:", new HCVector2(.75, .75 + labelOffset), "center", "middle", white, new HCFont("Impact", 20));
  
  // create digital clock at lower left
  //
  this.digitalClock = new HCDigitalClock(new HCVector3(-.75, -.85, 0), "LED_.png", undefined, time, 0, green, "center", digitSpacing);
  this.digitalClockLabel = new HCText("Time Remaining:", new HCVector2(-.75, -.85 + labelOffset), "center", "middle", white, new HCFont("Impact", 20)); 
  
  // create enemy display at lower right
  //
  this.enemyDisplay = new HCDigitalDisplay(new HCVector3(.75, -.85, 0), "LED_.png", numEnemies, 2, red, "center", digitSpacing);
  this.enemyDisplayLabel = new HCText("Enemies Remaining:", new HCVector2(.75, -.85 + labelOffset), "center", "middle", white, new HCFont("Impact", 20));

  return this;
}    // HCGameInterface


//
// private methods
//


HCGameInterface.prototype.onLoad = function(applet, layer) {
	
  // add lives display
  //
  applet.load(this.livesDisplay);
  applet.addOverlay(this.livesDisplayLabel); 

  // add score display
  //
  applet.load(this.scoreDisplay);
  applet.addOverlay(this.scoreDisplayLabel); 
  
  // add enemy display
  //
  applet.load(this.enemyDisplay);
  applet.addOverlay(this.enemyDisplayLabel);

  // add digital clock
  //
  applet.load(this.digitalClock);
  applet.addOverlay(this.digitalClockLabel);
  this.digitalClock.speed = -1;
  this.digitalClock.start();
  
  // add message display
  //
  applet.addOverlay(this.messageDisplay);
}	// onLoad


HCGameInterface.prototype.onUnload = function() {
  if (!this.applet)
    return;

  this.applet.unload(this.livesDisplay);
  this.applet.removeOverlay(this.livesDisplayLabel); 

  // add score display
  //
  this.applet.unload(this.scoreDisplay);
  this.applet.removeOverlay(this.scoreDisplayLabel); 
  
  // add enemy display
  //
  this.applet.unload(this.enemyDisplay);
  this.applet.removeOverlay(this.enemyDisplayLabel);

  // add digital clock
  //
  this.applet.unload(this.digitalClock);
  this.applet.removeOverlay(this.digitalClockLabel);
  
  // add message display
  //
  this.applet.removeOverlay(this.messageDisplay);

  this.applet = null;
}	// onUnload
