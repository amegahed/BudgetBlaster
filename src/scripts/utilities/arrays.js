/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              arrays.js                 3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file contains some generalized utilities          |
|        for dealing with arrays in Javascript.                 |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


function isArray(variable) {
  if (variable && typeof(variable) == 'object') 
    return (variable.constructor == Array);
  else
    return false;
}	// isArray
 
 
function inArray(value, array) {
  for (var i = 0; i < array.length; i++)
    if (array[i] == value)
      return true;
  return false;
}	// inArray


function getArrayIndex(value, array) {
  for (var i = 0; i < array.length; i++)
    if (array[i] == value)
      return i;
}	// getArrayIndex


function arrayToString(array, seperator, quotateStrings, addBrackets) {
  var string = "";
  
  // set optional parameter defaults
  //
  if (quotateStrings == undefined)
    quotateStrings = false;
  if (seperator == undefined)
    seperator = "";
  if (addBrackets == undefined)
    addBrackets = false;
  
  if (addBrackets)
    string += "[";
  for (var i = 0; i < array.length; i++) {
    if (i > 0)
	  string += seperator;
	  
    if (isString(array[i]) && quotateStrings)
      string += getQuotatedString(array[i]);
    else if (isArray(array[i]))
	  string += arrayToString(array[i], seperator, quotateStrings, addBrackets);
    else
      string += array[i];
  }
  if (addBrackets)
    string += "]";
	
  return string;
}	// arrayToString