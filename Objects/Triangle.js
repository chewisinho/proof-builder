'use strict';

var Triangle = function(P1, P2, P3) {
	this.points = [P1, P2, P3];
	this.lineSegments = [new LineSegment(P1, P2), new LineSegment(P2, P3), new LineSegment(P3, P1)];
	this.toString = function() {
		return "Triangle " + this.points[0].toString() + this.points[1].toString() + this.points[2].toString();
	};
}

define(['./Point', './LineSegment'], function() { return Triangle; });
