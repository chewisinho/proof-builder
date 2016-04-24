'use strict';

/**
 * Abstract theorem template.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 *
 * Fields:
 * name (String)   	- the name of the theorem
 * inputSize (int) 	- the number of inputs for this theorem
 * objects (Object) - reference to the relational array of objects
 * result (String)  - string representation of result when theorem is applied
 * 					  to objects
 * toString (Func)  - returns string representation of theorem
 *
 */
var Theorem = function(objects) {
	this.name = "Abstract Theorem";
	this.inputSize = 0;
	this.objects = objects;
	this.result = "Not applied yet.";
	this.toString = function() { return this.name + ": " + this.result; };
};

module.exports = Theorem;
