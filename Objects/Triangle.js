'use strict';

var Triangle = function(P1, P2, P3) {
	this.Points = [P1, P2, P3];
	this.lineSegments = [new LineSegment(P1, P2), new LineSegment(P2, P3), new LineSegment(P3, P1)];
	this.angles = new Array();
	this.angle.push(new Angle(this.lineSegments[0],this.lineSegments[1]),P2);
	this.angle.push(new Angle(this.lineSegments[1],this.lineSegments[2]),P3);
	this.angle.push(new Angle(this.lineSegments[2],this.lineSegments[0]),P1);
	this.triname = P1.getname() + P2.getname() + P3.getname();
	this.gettriname = function(){
		return triname;
	}
}

define(['./Point', './LineSegment', './Angles'], function() { return Triangle; });
