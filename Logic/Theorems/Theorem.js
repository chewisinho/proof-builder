'use strict';

/**
 * Abstract theorem template.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 *
 * Fields:
 * long_name (String)      - the name of the theorem
 * requires ({String:int}) - what this theorem requires as input, as a relational
 *							 array of the object type, and the number needed
 * objects (Object) - reference to the relational array of objects
 * result (String)  - string representation of result when theorem is applied
 * 					  to objects
 * toString (Func)  - returns string representation of theorem
 *
 */
var Theorem = function(objects) {
	this.requires = {};
	this.objects = objects;
	this.result = "Not applied yet.";
	this.appliedString = function() { return this.title + ": " + this.result; };
};

Theorem.title = "Abstract Theorem";

module.exports = Theorem;
