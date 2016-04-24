'use strict';

/**
 * Point object.
 * name (String) - The name of the point.
 */
var Point = function(name) {
	this.type = "Point";
	this.name = name;
};

Point.prototype.equals = function(other) {
	return this.name === other.name;
};

Point.prototype.toString = function() {
	return this.name;
};

module.exports = Point;
