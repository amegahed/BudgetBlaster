/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm            scott-walker.js             3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines information on teachers.             |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


function animateScottWalker(image) {
  var src1 = "images/scott-walker/scott-walker.png";
  var src2 = "images/scott-walker/scott-walker-mouth-open.png";
  var index = 1;
  
  function swapImage(minDelay, maxDelay) {
    var delay = minDelay + (maxDelay - minDelay) * Math.random();
  
    // wait a random amount of time
    //
    var timeout = window.setTimeout(function() {
	  window.clearTimeout(timeout);

      // swap images
	  //
      if (index == 1) {
	    image.src = src2;
		index = 2;
      } else {
	    image.src = src1;
		index = 1;
      }

      // insert random pauses
	  //	  
	  if (index == 1) {
        if (Math.random() < .25) {
	      minDelay = 500;
		  maxDelay = 1000;
	    } else {
	      minDelay = 100;
		  maxDelay = 200;
		}
	  } else {
	    minDelay = 100;
		maxDelay = 200;
	  }
	  	
      // do next swap
	  //
	  swapImage(minDelay, maxDelay);
    }, delay);
  }
  
  swapImage(100, 200);
}	// animateScottWalker