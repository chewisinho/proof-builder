'use strict';

var Midpoints = function() {
	this.pairs = [];
};

Midpoints.relation = " is the midpoint of ";

/**
 * Checks relation between a point and a segment.
 */
Midpoints.prototype.contains = function(point, segment) {
	// reject non-matching types
	if (segment.type !== "LineSegment") {
		console.log("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return false;
	}

	// linearly search for a midpoint pair
	for (var i = 0; i < this.pairs.length; i++) {
		var pair = this.pairs[i];
		// allows for checking only if the segment has a midpoint
		if (pair[1].equals(segment)) {
			if (point == null) return true;
			else return pair[0].equals(point);
		}
	}

	return false;
};

Midpoints.prototype.add = function(point, segment) {
	// reject non-matching types
	if (segment.type !== "LineSegment" || point.type !== "Point")
		console.log("Midpoints do not exist for: " + segment.type + " and " +
					point.type);

	// prevent adding an already existing pair
	if (!this.contains(point, segment)) {
		this.pairs.push([point, segment]);
	}
};

Midpoints.prototype.get = function(point, segment) {
	// linearly search for a midpoint pair
	for (var i = 0; i < this.pairs.length; i++) {
		var pair = this.pairs[i];
		// allows for checking only the segment
		if (pair[1].equals(segment)) {
			return pair;
		}
	}
};

module.exports = Midpoints;
