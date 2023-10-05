/***************************************************************\
| Time                                                          |
| Trafficker                 cookies.js                         |
| .com                                                          |
|***************************************************************|
|                                                               |
|        This file some utility functions for dealing with      |
|        (web browser) cookies.                                 |
|                                                               |
|***************************************************************|
|            Copyright (c) 2010 Time Trafficker.com             |
\***************************************************************/


function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else
    var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}	// createCookie


function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}	// readCookie


function eraseCookie(name) {
  createCookie(name, "", -1);
}	// eraseCookie
