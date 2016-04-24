'use strict';

var LineSegment = require('./LineSegment');

/**
 * Polygon object.
 * Accepts variable length of (Point) arguments.
 */
var Polygon = function() {
	this.type = "Polygon";
	this.points = Array.from(arguments);
};

/**
 * Checks for equality, based on what points the polygon has, and in what order.
 * Note: this is not to be used for checking *congruence*
 *
 * other (Polygon) - the other polygon to compare
 *
 * return - true if the polygons are equal, false if not
 */
Polygon.prototype.equals = function(other) {
	// check if this polygon is of the same order (side number)
	if (this.points.length != other.points.length) return false;

	// check every rotation of this polygon to the other
	var sides = this.points.length;
	for (var i = 0; i < sides; i++) {
		var s; // side being compared

		// in "clockwise" rotation
		for (s = 0; s < sides; s++) {
			var p = (s + i) % sides; // point being compared
			if (!this.points[p].equals(other.points[s])) break;
		} if (s == sides) return true;

		// in "counter-clockwise" rotation
		for (s = 0; s < sides; s++) {
			var p = (sides + i - s) % sides; // point being compared
			if (!this.points[p].equals(other.points[s])) break;
		} if (s == sides) return true;
	}

	return false;
};

/**
 * Returns an array of the LineSegments making up this Polygon
 */
Polygon.prototype.sideSegments = function() {
	var result = [];
	var len = this.points.length;

	// construct segments from this Polygon's points
	for (var i = 0; i < len; i++) {
		var seg = new LineSegment(this.points[i], this.points[(i + 1) % len]);
		result.push(seg);
	}

	return result;
}

Polygon.prototype.toString = function() {
	return this.type + " " +
	this.points.reduce(function(prev, curr, index, arr) {
		return prev.toString() + curr.toString();
	});
};

module.exports = Polygon;
