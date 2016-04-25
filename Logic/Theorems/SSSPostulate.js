'use strict';

var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem')

var SSSPostulate = function(objects, givens) {
	Theorem.call(this, objects);
	this.name = "Side-Side-Side Postulate";
	this.givens = givens;
	this.requires = {"Triangle": 2};
};

// Inherit from Theorem
SSSPostulate.prototype = Object.create(Theorem.prototype);
SSSPostulate.prototype.constructor = SSSPostulate;

SSSPostulate.prototype.checkConditions = function(tr1, tr2) {
	var sides = 3; // triangles have 3 sides (:

	// check that the sides of the triangles are congruent by any rotation;
	// can't just check equality
	for (var i = 0; i < sides; i++) {
		var congruent; // true after loops if congruent triangles found

		// clockwise direction
		congruent = true;
		for (var s = 0; s < sides; s++) {
			var side1 = new geo.LineSegment(tr1.points[(i + s) % sides],
											tr1.points[(i + s + 1) % sides]);
			var side2 = new geo.LineSegment(tr2.points[s],
											tr2.points[(s + 1) % sides]);
			if (!this.givens.contains('congruence', [side1, side2])) {
				congruent = false;
				break;
			}

		} if (congruent) {
			return true;
		}

		// counter-clockwise direction
		congruent = true;
		for (var s = 0; s < sides; s++) {
			var side1 = new geo.LineSegment(tr1.points[(sides + i - s) % sides],
											tr1.points[(sides + i - s + 1) % sides]);
			var side2 = new geo.LineSegment(tr2.points[s],
											tr2.points[(s + 1) % sides]);
			if (!this.givens.contains('congruence', [side1, side2])) {
				congruent = false;
				break;
			}
		} if (congruent) {
			return true;
		}
	}

	return false; // if falls through all for loops
};

SSSPostulate.prototype.applyResults = function(tr1, tr2) {
	this.givens.add('congruence', [tr1, tr2]);
	this.result = tr1.toString() + " and " + tr2.toString() + " are congruent.";
};

module.exports = SSSPostulate;
