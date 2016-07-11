'use strict';

/**
 * Point object.
 * label (String) - The name/label of the point.
 */
var Point = function(label) {
	this.type = "Point";
	this.label = label;
};

Point.prototype.equals = function(other) {
	return this.label === other.label;
};

Point.prototype.toString = function() {
	return this.label;
};

module.exports = Point;
