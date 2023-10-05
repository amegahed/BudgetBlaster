/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm         javascript_utils.js            3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file contains some generalized javascript         |
|        utilities that add basic features to the language.     |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


function isDefined(variable) {
  return eval('(typeof(' + variable + ') != "undefined");');
}    // isDefined


// To use:
// Send your variable or array as the first variable and a type specifier for the second variable.
// If the type is an array, then send the type specifier as an array of the component type: ["string"] etc.
// This also works for arrays of non-uniform types i.e. ["string", "boolean", "number"] etc.
// If you want to check against a user created object, send the object's constructor as the type specifier.
//
// Examples:
// isType(true, 'boolean')                                                      (true)
// isType(5, 'number')                                                          (true)
// isType([5, 6], ['number']                                                    (true)
// isType([false, 5], ['boolean', 'number'])                                    (true)	
// isType([new HCVector2(0, 0), new HCVector2(0, 1)], [HCVector2])              (true)
// isType([new HCVector2(0, 0), new HCVector2(0, 1)], [HCVector3])              (false)
//
function isType(variable, type) {

  // return if variable is null
  //
  if (variable == null || variable == undefined)
    return false;
	
  if (!isArray(variable)) {
  
    // check primitive types
    //
    if (isArray(type))
      return false;
    else if (type == "boolean")
      return typeof(variable) == "boolean";
    else if (type == "number")
      return typeof(variable) == "number";
    else if (type == "string")
      return typeof(variable) == "string"; 
    else if (type == "function")
	  return typeof(variable) == "function";
    else if (type == "object")
	  return typeof(variable) == "object";

    // check object types
	//
    else
	  return variable instanceof type;

  // check array types
  //	
  } else if (isArray(type)) {
    if (type.length == 1) {
	
      // variables are of a uniform type
      //
      for (var i = 0; i < variable.length; i++)
        if (!isType(variable[i], type[0]))
          return false;
      return true;
    } else {
	
      // variables are of mixed type
      //
      for (var i = 0; i < variable.length; i++)
        if (!isType(variable[i], type[i]))
          return false;
      return true;
    }
	
  } else
    return false;
}	// isType


//
// This method is used to convert a type descriptor to a string.
//


function typeToString(type) {				
  if (isArray(type))
    return "[" + function(type){
	  var str = ""; 
      for (i = 0; i < type.length; i++) {
		if (i > 0)
		  str += ", ";
        str += typeToString(type[i]);
		return str;
      }
    }(type) + "]";
  else if (typeof type == "string")
    return type;
  else
    return type.name;
}	// typeToString

  
function argumentsType(args, types, minParams) {
	
  // if we don't specify the number of mandatory parameters, 
  // then assume that all parameters are mandatory.
  //
  if (minParams == undefined)
    minParams = types.length;


  
  // check the type of each argument in our list of args
  //
  for (var i = 0; i < types.length; i++)
    if (i < minParams) {
		
	  // check mandatory parameters
	  //
      if (!isType(args[i], types[i])) {
	    argumentsType.error = "type mismatch on parameter #" + (i + 1) + " expected " + typeToString(types[i]);
		return false;
	  }
	} else {
		
      // check optional parameters
	  //
      if (!isType(args[i], types[i]) && args[i] != undefined) {
	    argumentsType.error = "type mismatch on optional parameter #" + (i + 1) + " expected " + typeToString(types[i]);
		return false;
      }
    }
  
  return true;
}	// argumentsType


// This function binds a method to a particular
// object for executing at a later time
//
function getClosure(objectName, methodName, variables) {
  function execute() {
    objectName[methodName](variables);
  }
  return execute;
}    // getClosure


// assertion handling - set verbose to true in order to get alerts
//
var verbose = false;


function AssertException(message) {
  this.message = message; 
}
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
}

// This function is used to assert an expression.  For the second
// variable, pass a useful error message, for example:
//   assert(obj != null, 'Object is null');
//
//
function assert(condition, message) {
  if (!condition)
    if (verbose)
      alert("Assertion failed: " + message);
    else
      throw new AssertException(message);
}	// assert