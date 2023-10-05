/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm         teacher_game_level.js          3d      |
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


function TeacherGameLevel(length, player, teachers, money, messageDisplay, imageDisplay, livesDisplay) {
	
  // check argument types
  //
  // assert(argumentsType(arguments, [ScrollingBackground, "number", Sprite], 0), "TeacherGameLevel " + argumentsType.error);

  // starting point
  //
  if (length) {
    var xmin = 1;
    var xmax = length * 2 - 1;
  }
  
  // create teachers
  //
  this.teachers = new Array(teachers.length);
  for (var i = 0; i < teachers.length; i++) {
    var location = new Vector3(random(xmin, xmax), random(player.ymin, player.ymax), 5);
    var scale = 1;
    var velocity = new Vector2(-.1, random(-.5, .5));
    var collisionMessage = teachers[i][0];
    var explosionMessage = teachers[i][1];
    this.teachers[i] = new Teacher(location, scale, velocity, collisionMessage, explosionMessage, messageDisplay);
  }
  
  // create money
  //
  this.money = new Array(money.length);
  for (var i = 0; i < money.length; i++) {
    var location = new Vector3(random(xmin, xmax), random(player.ymin, player.ymax), 6);
    var scale = 1;
    var velocity = new Vector2(0, 0);
    var donor = money[i][0];
    var amount = money[i][1];
    var icon = new Icon(money[i][2]);
    this.money[i] = new Money(location, scale, velocity, amount, donor, icon, messageDisplay, imageDisplay);
  }
  
  // call superclass constructor
  //
  GameLevel.call(this, length, this.teachers.concat(this.money), player);
  
  // set attributes
  //
  this.messageDisplay = messageDisplay;
  this.imageDisplay = imageDisplay;
  this.livesDisplay = livesDisplay;

  // create level backgrounds
  //
  this.background = new ScrollingBackground(length, [
    "farmland.png", "farmland.png"
    ], 0, "bottom", "images/backgrounds/", 1);
  this.nearBackground = new ScrollingBackground(2, [
    "fields.png", "fields.png"
    ], 0, "bottom", "images/backgrounds/", 2);
  this.farBackground = new ScrollingBackground(2, [
    "horizon.png", "horizon.png"
    ], 0, "bottom", "images/backgrounds/", 0);
  this.skyBackground = new ScrollingBackground(2, [
    "clouds.png", "clouds.png"
    ], 0, "top", "images/backgrounds/", 0);

  return this;
}    // TeacherGameLevel


// inherit prototype from "superclass"
//
TeacherGameLevel.prototype = new GameLevel();


//
// "object" or "instance" methods
//


TeacherGameLevel.prototype.addOffset = function(offset) {
	
  // call superclass method
  //
  GameLevel.prototype.addOffset.call(this, offset);
  
  // offset backgrounds
  //
  this.background.addOffset(offset);
  this.nearBackground.addOffset(offset * 1.5);
  this.farBackground.addOffset(offset * .5);
  this.skyBackground.addOffset(offset * .1);
}	// addOffset


TeacherGameLevel.prototype.collide = function(element) {
	
  // call superclass method
  //
  GameLevel.prototype.collide.call(this, element);

  // decrement lives display
  //
  var self = this;
  window.setTimeout(function() {
    self.livesDisplay.decrement();
  }, 2000);
}	// collide


//
// private methods
//


TeacherGameLevel.prototype.onLoad = function(canvas) {

  // call superclass method
  //
  GameLevel.prototype.onLoad.call(this, canvas);
  
  // load backgrounds
  //
  canvas.load(this.background);
  canvas.load(this.nearBackground);
  canvas.load(this.farBackground);
  canvas.load(this.skyBackground);
}    // onLoad


// "static" or "class" attributes
//
TeacherGameLevel.teachers = [
  ["algebra teacher", "What? I have a calculator."],
  ["art teacher", "What practical use is art, anyway?"],
  ["band teacher", "I'll just play my iPod instead."],
  ["biology teacher", "I already know all the biology I need."],
  ["botany teacher", "Do I look like a farmer?"],
  ["chemistry teacher", "Chemistry stinks."],
  ["calculus teacher", "Calculus is derivative."],  
  ["computer science teacher", "Computers are for eggheads."],  
  ["economics teacher", "Economics isn't a real science anyway."],
  ["english teacher", "Writing good is overrated."],
  ["French teacher", "Oh, la, la.  Quel dommage."],
  ["geography teacher", "I like your latitude."],
  ["history teacher", "Don't know much 'bout history."],
  ["math teacher", "Math is hard."],
  ["physics teacher", "Physics is just theoretical."],
  ["science teacher", "Science is for nerds."],
  ["trigonometry teacher", "Trig is for squares."]
];