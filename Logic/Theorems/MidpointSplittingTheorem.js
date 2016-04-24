'use strict';
var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem');

/**
 * Midpoint Splitting Theorem constructor.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 * midpoints   (Obj<-Midpoints)   - midpoints of the system
 * congruences (Obj<-Congruences) - congruences of the system
 */
var MidpointSplittingTheorem = function(objects, midpoints, congruences) {
	Theorem.call(this, objects);
	this.name = "Midpoint Splitting Theorem";
	this.midpoints = midpoints;
	this.congruences = congruences;
	this.requires = {"LineSegment": 1};
};

// Inherit from Theorem
MidpointSplittingTheorem.prototype = Object.create(Theorem.prototype);
MidpointSplittingTheorem.prototype.constructor = MidpointSplittingTheorem;

/**
 * Checks that the given line segment has a midpoint.
 * segment (LineSegment) - the segment to check
 */
MidpointSplittingTheorem.prototype.checkConditions = function(segment) {
	// search simply for the segment containing a midpoint
	return this.midpoints.contains(null, segment);
};

MidpointSplittingTheorem.prototype.applyResults = function(segment) {
	var pair = this.midpoints.get(null, segment);
	var midpoint = pair[0];

	var ls1 = new geo.LineSegment(segment.start, midpoint);
	var ls2 = new geo.LineSegment(midpoint, segment.end);
	this.objects.linesegs.push(ls1, ls2);
	this.congruences.add(ls1, ls2);

	this.result = midpoint.toString() + " splits " + segment +
				  " into two congruent line segments: " +
				  ls1.toString() + " and " + ls2.toString() + ".";
};

module.exports = MidpointSplittingTheorem;
