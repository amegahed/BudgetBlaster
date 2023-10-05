/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm              ascii.js                  3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines conversions between decimal and      |
|        ASCII character values.                                |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


var chars = new Array(
	' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
	'.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
	'<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
	'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '', '�', '�',
	'�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�',
	'�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�',
	'�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�',
	'�', '�', '�', '�', '_', '_', '_', '�', '�', '�', '�', '�', '�', '�',
	'�', '+', '+', '�', '�', '+', '+', '-', '-', '+', '-', '+', '�', '�',
	'+', '+', '-', '-', '�', '-', '+', '�', '�', '�', '�', '�', '�', 'i',
	'�', '�', '�', '+', '+', '_', '_', '�', '�', '_', '�', '�', '�', '�',
	'�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�',
	'_', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '_', ' ');


function charToByte(c) {
  for (var i = 0; i < chars.length; i++)
    if (c == chars[i])
      return i + 32;
  return 0;
}	// charToByte


function byteToChar(n) {
  if (n < 32 || n > 255)
    return " ";
  return chars[n-32];
}	// byteToChar


function stringToUpper(string) {
  if (string != null)
    string = (string.charAt(0)).toUpperCase() + string.substring(1, string.length);
  return string;
}	// stringToUpper


function stringToLower(string) {
  if (string != null)
    string = (string.charAt(0)).toLowerCase() + string.substring(1, string.length);
  return string;
}	// stringToLower