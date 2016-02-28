'use strict';

var Point;
var LineSegment;
var Triangle;
var Congruence;

// MAIN THEOREM CLASS


var Theorem = function(checkCondition, applyResult, name, contents) {
	this.checkCondition = checkCondition;
	this.applyResult = applyResult;
	this.shortName = name;
	this.contents = contents;
}


// SET UP OBJECT DATABASE.


var points = new Array();
var lineSegments = new Array();
var triangles = new Array();
var congruences = new Congruence();

var addLineSegment = function(pt1, pt2) {
	for (var lineSegment in lineSegments) {
		if ((lineSegment.start === pt1 && lineSegment.end === pt2) ||
			(lineSegment.start === pt2 && lineSegment.end === pt1)) {
			return lineSegment;
		}
	}
	var newLineSegment = new LineSegment(pt1, pt2);
	lineSegments.push(newLineSegment);
	return newLineSegment;
}


// LIST OF THEOREMS


var reflexivePropertyConditions = function(obj) {
	return true;
}
var reflexivePropertyResults = function(obj) {
	congruences.addCongruence(obj, obj);
	this.obj = obj;
}
var reflexiveProperty = new Theorem(
	reflexivePropertyConditions,
	reflexivePropertyResults,
	"Reflexive Property",
	"Reflexive Property: " + this.obj.toString() + " is congruent to itself."
);

var midpointSplittingTheoremConditions = function(lineSegment) {
	return lineSegment.hasOwnProperty('midpoint');
}
var midpointSplittingTheoremResults = function(lineSegment) {
	this.lineSegment = lineSegment;
	this.ls1 = addLineSegment(lineSegment.start, lineSegment.midpoint);
	this.ls2 = addLineSegment(lineSegment.midpoint, lineSegment.end);
	congruences.addCongruence(this.ls1, this.ls2);
}
var midpointSplittingTheorem = new Theorem(
	midpointSplittingTheoremConditions,
	midpointSplittingTheoremResults,
	"Midpoint Splitting Theorem",
	"Midpoint Splitting Theorem: " + this.lineSegment.midpoint.toString() + " splits " + this.lineSegment
		+ " into two congruent line segments: " + this.ls1.toString() + " and " + this.ls2.toString() + "."
);

var SSSPostulateConditions = function(triange1, triangle2) {
	var numCongruentSides = 0;
	for(var i = 0; i < 3; i += 1) {
		for(var j = 0; j < 3; j += 1) {
			if (congruences.search(triangle1.lineSegments[i], triangle2.lineSegments[j])) {
				numCongruentSides += 1;
			}
		}
	}
	return numCongruentSides === 3;
};
var SSSPostulateResults = function(triangle1, triangle2) {
	TriangleCongruence.addTriangleCongruence(triangle1, triangle2);
	self.triangle1 = triangle1;
	self.triangle2 = triangle2;
};
var SSSPostulate = new Theorem(
	SSSPostulateConditions,
	SSSPostulateResults,
	"SSS Postulate",
	"SSS Postulate: " + self.triangle1.toString() + " and " + self.triangle2.toString() + " are congruent."
);

// EXPORT FILE

define(['../Objects/Point', '../Objects/LineSegment', '../Objects/Triangle', '../Properties/Congruence'],
    function(Pt, Ls, Tri, Con) {
	 	Point = Pt;
	 	LineSegment = Ls;
	 	Triangle = Tri;
	 	Congruence = Con;

	    return { Thm: Theorem, pts: points, lsgs: lineSegments, tris: triangles,
	            congrs: congruences, addl: addLineSegment,
	            reflC: reflexivePropertyConditions, reflR: reflexivePropertyResults,
	            reflP: reflexiveProperty, mstC: midpointSplittingTheoremConditions,
	            mstR: midpointSplittingTheoremResults, mst: midpointSplittingTheorem,
	            sssC: SSSPostulateConditions, sssR: SSSPostulateResults,
	            sss: SSSPostulate };
});
