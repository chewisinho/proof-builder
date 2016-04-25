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
		console.error("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return undefined;
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
	if (segment.type !== "LineSegment" || point.type !== "Point") {
		console.error("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return undefined;
	}

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

Midpoints.prototype.toString = function() {
	if (this.pairs.length == 0) return "";
	var result = "Midpoints: ";

	var i;
	for (i = 0; i < this.pairs.length - 1; i++) {
		result += (this.pairs[i][0] + Midpoints.relation +
				   this.pairs[i][1]) + ", ";
	}

	if (i == this.pairs.length - 1)
		result += (this.pairs[i][0] + Midpoints.relation +
				   this.pairs[i][1]);

	return result;
};

module.exports = Midpoints;
