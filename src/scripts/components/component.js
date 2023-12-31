/***************************************************************\
| |\  /|                                                We Put  |
| | >< Hypercosm             Component.js               3d      |
| |/  \|                                                To Work |
|***************************************************************|
|                                                               |
|        This file defines the Javascript behaviors of a        |
|        generalized user interface Component.                  |
|                                                               |
|***************************************************************|
|                Copyright (c) 2011 Hypercosm, LLC.             |
\***************************************************************/


//
// "class" constructor
//


function Component(element, parent) {
  if (!element)
    return this;
  
  // the element parameter can refer to a document
  // element object or it can refer to its id
  //
  if (typeof(element) == "string") {
    if (parent) {
      if (parent.element)
        this.element = getElementById(element, parent.element);
	  else
	    this.element = getElementById(element, parent);
	} else
      this.element = document.getElementById(element);
  } else
    this.element = element;

  // add component to parent
  //
  if (parent && parent.addComponent)
    parent.addComponent(this);
	
  // set attributes
  //
  this.visible = (this.element != undefined) && (this.element.style.display != "none");
  this.width = this.getWidth();
  this.height = this.getHeight();
  
  return this;
}    // Componennt


//
// "object" or "instance" methods
//


Component.prototype.getTop = function() {
  var top = this;
  while (top.parent)
	top = top.parent;
  return top;
}    // getTop


Component.prototype.getWidth = function() {
  if (this.element) {
    if (this.element.offsetWidth != 0)
      return this.element.offsetWidth;
    else if (this.element.width)
      return this.element.width;
    else
      return this.element.getAttribute("width");
  } else
    return 0;
}    // getWidth


Component.prototype.getHeight = function() {
  if (this.element) {
    if (this.element.offsetHeight != 0)
      return this.element.offsetHeight;
    else if (this.element.height)
      return this.element.height;
    else
      return this.element.getAttribute("height");
  } else
    return 0;
}    // getHeight


Component.prototype.getLeft = function() {
  var left = 0;
  var element = this.element;
  if (element.offsetParent) {
    do {
      left += element.offsetLeft;
    } while (element = element.offsetParent);
    return left;
  }
}	// getLeft


Component.prototype.getTop = function() {
  var top = 0;
  var element = this.element;
  if (element.offsetParent) {
    do {
      top += element.offsetTop;
    } while (element = element.offsetParent);
    return top;
  }
}	// getTop


//
// component attribute setting methods
//


Component.prototype.setElement = function(element) {
  if (this.element.parentNode)
    this.element.parentNode.replaceChild(element, this.element);
  this.element = element;
}	// setElement


//
// component visibility methods
//


Component.prototype.setVisible = function(visible) {
	
  // set attributes
  //
  this.visible = visible;

  // modify page element
  //
  if (this.element) {
    if (visible)
      this.element.style.display = 'block'; 
    else
      this.element.style.display = 'none'; 
  }
}	// setVisible


Component.prototype.isVisible = function() {
  return this.visible && (!this.parent || !this.parent.isVisible || this.parent.isVisible());
}	// isVisible


Component.prototype.toggleVisible = function() {
  this.setVisible(!this.isVisible());
}	// toggleVisible