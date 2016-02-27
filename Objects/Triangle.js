'use strict';

var Point = require('./Point.js');
var LineSegment = require('./LineSegment.js');

var Triangle = function(P1,P2,P3){
	this.Points = [P1,P2,P3];
	this.LineSegments = [new LineSegment(P1,P2), new LineSegment(P2,P3), new LineSegment(P3,P1)];
}

module.exports = Triangle;