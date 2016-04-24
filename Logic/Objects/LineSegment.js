'use strict';

/**
 * Line Segment object.
 * start (Point) - the start endpoint of the segment
 * end   (Point) - the other endpoint of the segment
 */
var LineSegment = function(start, end) {
	this.type = "LineSegment";
	this.start = start;
	this.end = end;
};

/**
 * Checks equality to another line segment.
 * other (LineSegment) - the other segment to compare
 */
LineSegment.prototype.equals = function(other) {
	// compare in both directions
	return (this.start.equals(other.start) && this.end.equals(other.end)) ||
		   (this.start.equals(other.end) && this.end.equals(other.start));
};

LineSegment.prototype.toString = function() {
	return this.start.toString() + this.end.toString();
};

module.exports = LineSegment;
