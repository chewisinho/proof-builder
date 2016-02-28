'use strict';

var Triangle = function(P1, P2, P3) {
	this.points = [P1, P2, P3];
	this.angles = new Array();
	this.name = P1.toString() + P2.toString() + P3.toString();
	this.toString = function() {
		return this.name;
	};
}

define(['./Point', './LineSegment'], function() { return Triangle; });
