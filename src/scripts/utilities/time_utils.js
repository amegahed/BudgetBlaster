/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             time_utils.js              3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file contains some javascript utilities that      |
|        are used to work with time.                            |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


function setRandomInterval(action, minTime, maxTime) {

  // set attributes
  //
  this.action = action;
  this.minTime = minTime;
  this.maxTime = maxTime;
  
  var self = this;
  this.timeout = window.setTimeout(function() {
											
    // clear previous timeout
	//
    window.clearTimeout(self.timeout);
	
	// perform action
	//
    self.action();
	
    // schedule next timeout
	//
	setRandomInterval(self.action, self.minTime, self.maxTime); 

  }, minTime + (maxTime - minTime) * Math.random());


  // provide method for stopping interval
  //
  this.clear = function() {
    window.clearTimeout(self.timeout);  
  }
  
  return this;
} 	// setRandomInterval