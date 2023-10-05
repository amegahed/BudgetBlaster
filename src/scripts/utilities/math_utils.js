/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm            math_utils.js               3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file contains various simple math utilities.      |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


function random(minVal, maxVal) {
  return minVal + (maxVal - minVal) * Math.random();
}	// random
  
  
function sign(value) {
  if (value < 0)
    return -1;
  else if (value > 0)
    return 1;
  else
    return 0;
}	// sign