'use strict';

/**
 * Angle object.
 * ls1 (LineSegment) - the first line segment of the angle
 * ls2 (LineSegment) - the second line segment of the angle
 * cp  (Point)		 - the central point between the two segments,
 * 					   must be a common point shared by ls1, ls2!
 */
var Angle = function (ls1, ls2, cp) {
	this.type = "Angle";
	this.lineSegments = [ls1, ls2];
	this.centralPoint = cp;
};

/**
 * TODO - is this method necessary?
 * Finds the central point of two line segments.
 * ls1 (LineSegment) - the first line segment
 * ls2 (LineSegment) - the second line segment
 */
Angle.prototype.findcp = function(ls1, ls2) {
	if (ls1.start.equals(ls2.start) || ls1.start.equals(ls2.end))
		this.centralPoint = ls1.start;
	else
		this.centralPoint = ls1.end;

	return this.centralPoint;
};

Angle.prototype.equals = function(other) {
	var segsEqual = this.lineSegments[0].equals(other.lineSegments[0]) &&
					this.lineSegments[1].equals(other.lineSegments[1]) ||
					this.lineSegments[0].equals(other.lineSegments[1]) &&
					this.lineSegments[1].equals(other.lineSegments[0]);
	var cpEqual = this.centralPoint.equals(other.centralPoint);
	return segsEqual && cpEqual;
};

Angle.prototype.toString = function() {
	var cp = this.centralPoint.toString();
	var ls1 = this.lineSegments[0];
	var ls2 = this.lineSegments[1];

	return "Angle " +
			(cp.equals(ls1.start) ? ls1.end : ls1.start).toString() + cp +
			(cp.equals(ls2.start) ? ls2.end : ls2.start).toString();
};

module.exports = Angle;
