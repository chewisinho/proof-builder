'use strict';

var Point;
var LineSegment;
var Triangle;
var Congruence;

// MAIN THEOREM CLASS


var Theorem = function(checkCondition, applyResult) {
	this.checkCondition = checkCondition;
	this.applyResult = applyResult;
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


var reflexivePropertyConditions = function(lineSegment) {
	return true;
}
var reflexivePropertyResults = function(lineSegment) {
	congruences.addCongruence(lineSegment, lineSegment);
}
var reflexiveProperty = new Theorem(reflexivePropertyConditions, reflexivePropertyResults);

var midpointSplittingTheoremConditions = function(lineSegment) {
	return lineSegment.hasOwnProperty('midpoint');
}
var midpointSplittingTheoremResults = function(lineSegment) {
	var ls1 = addLineSegment(lineSegment.start, lineSegment.midpoint);
	var ls2 = addLineSegment(lineSegment.midpoint, lineSegment.end);
	congruences.addCongruence(ls1, ls2);
}
var midpointSplittingTheorem = new Theorem(midpointSplittingTheoremConditions, midpointSplittingTheoremResults);

// TODO: ADD SSS POSTULATE AFTER TRIANGLE CONGRUENCE IS FINISHED.
var SSSPostulateConditions = function(triange1,triangle2){
	var num_congruentsides = 0;
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(congruences.search(triangle1.LineSegments[i],triangle2.LineSegments[j])){
				num_congruentsides++;
			}
		}
	}
	if(num_congruentsides ==3){
		return true;
	}else {
		return false;
	}
}
var SSSPostulateResults = function(triangle1,triangle2){
	if(SSSPostulateConditions(triangle1,triangle2)){
		TriangleCongruence.addTriangleCongruence(triangle1,triangle2);
	}
}
var SSSPostulate = new Theorem(SSSPostulateConditions,SSSPostulateResults);

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
