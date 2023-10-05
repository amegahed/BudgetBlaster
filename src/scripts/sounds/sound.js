/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm               sound.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines a Javascript sound object.           |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Sound(name, looping, duration) {

  // check argument types
  //
  // assert(argumentsType(arguments, ["string", "boolean", "number"], 1), "Sound " + argumentsType.error);
  
  // set optional parameter defaults
  //
  if (looping == undefined)
    looping = false;
  if (duration == undefined)
    duration = 1000;
	
  // set attributes
  //
  this.name = name;
  this.looping = looping;
  this.duration = duration;
  
  return this;
}    // Sound


//
// "object" or "instance" methods
//


Sound.prototype.play = function() {

  //this.audio = new Audio();
  //this.audio.src = "sounds/moshguitarloop.ogg";
  //this.audio.addEventListener('MozAudioAvailable', function(){}, false);
  
  // create new sound element
  //
  /*
  this.element = document.createElement("embed");
  this.element.setAttribute("src", this.name);
  this.element.setAttribute("type", this.getMimeType());
  this.element.setAttribute("hidden", true);
  this.element.setAttribute("autostart", true);
  this.element.setAttribute("loop", this.looping);
  this.element.setAttribute("enablejavascript", true);
  
  // add element to canvas
  //
  this.canvas.element.appendChild(this.element);
  */
}	// play


Sound.prototype.stop = function() {
}	// stop


//
// "private" methods
//



		
Sound.prototype.getMimeType = function() {
  var mimeType = "application/x-mplayer2"; //default
  var agt = navigator.userAgent.toLowerCase();

  // non-IE, no-Windows
  //
  if (navigator.mimeTypes && agt.indexOf("windows") == -1) {
    var plugin = navigator.mimeTypes["audio/mpeg"].enabledPlugin;
    if (plugin)
      mimeType="audio/mpeg" // Mac/ Safari & Linux/FFox
  }
  
  return mimeType
}	// getMimeType


Sound.prototype.onLoad = function(canvas) {
  this.canvas = canvas;
}	// onLoad


Sound.prototype.onUnload = function() {

  // remove sound element
  //
  this.canvas.element.removeChild(this.element);
}	// onUnload