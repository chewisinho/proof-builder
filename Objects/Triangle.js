'use strict';

var Triangle = function(P1, P2, P3) {
	this.Points = [P1, P2, P3];
	this.lineSegments = [new LineSegment(P1, P2), new LineSegment(P2, P3), new LineSegment(P3, P1)];
}

define(['./Point', './LineSegment'], function() { return Triangle; });
