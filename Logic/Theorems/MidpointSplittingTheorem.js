'use strict';
var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem');

/**
 * Midpoint Splitting Theorem constructor.
 * objects (ObjectDB) - database of all objects
 * givens  (ProofState) - given facts known so far
 */
var MidpointSplittingTheorem = function(objects, givens) {
	Theorem.call(this, objects);
	this.name = "Midpoint Splitting Theorem";
	this.givens = givens;
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
	return this.givens.contains('midpoint', [null, segment]);
};

MidpointSplittingTheorem.prototype.applyResults = function(segment) {
	var pair = this.givens.get('midpoint', [null, segment]);
	var midpoint = pair[0];

	var ls1 = this.objects.create(new geo.LineSegment(segment.start, midpoint));
	var ls2 = this.objects.create(new geo.LineSegment(midpoint, segment.end));
	this.givens.add('congruence', [ls1, ls2]);

	this.result = midpoint.toString() + " splits " + segment +
				  " into two congruent line segments: " +
				  ls1.toString() + " and " + ls2.toString() + ".";
};

module.exports = MidpointSplittingTheorem;
