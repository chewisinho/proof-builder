'use strict';

var Point = require('./Point.js');
var LineSegment = require('./LineSegment.js');

var Triangle = function(P1,P2,P3){
	this.Point1 = P1;
	this.Point2 = P2;
	this.Point3 = P3;
	this.LineSegment1 = new LineSegment(P1,P2);
	this.LineSegment2 = new LineSegment(P2,P3);
	this.LineSegment3 = new LineSegment(P3,P1);
}

module.exports = Triangle;