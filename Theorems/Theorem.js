'use strict';

var Point;
var LineSegment;
var Triangle;
var Congruence;

// MAIN THEOREM CLASS


var Theorem = function(name) {
    this.checkCondition = function() { };
    this.applyResult = function() { };
    this.getInput = function() { };
    this.shortName = name;
    this.contents = name;
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


var reflexiveProperty = new Theorem("Reflexive Property");
reflexiveProperty.checkConditions = function(obj) {
    return true;
};
reflexiveProperty.applyResults = function(obj) {
    congruences.addCongruence(obj, obj);
    this.obj = obj;
};
reflexiveProperty.contents = function() {
    return "Reflexive Property: " + this.obj.toString() + " is congruent to itself.";
};
reflexiveProperty.getInput = function() {
    return [lineSegments, 2];
};

var midpointSplittingTheorem = new Theorem("Midpoint Splitting Theorem");
midpointSplittingTheorem.checkConditions = function(lineSegment) {
    return lineSegment.hasOwnProperty('midpoint');
};
midpointSplittingTheorem.applyResults = function(lineSegment) {
    this.lineSegment = lineSegment;
    this.ls1 = addLineSegment(lineSegment.start, lineSegment.midpoint);
    this.ls2 = addLineSegment(lineSegment.midpoint, lineSegment.end);
    congruences.addCongruence(this.ls1, this.ls2);
};
midpointSplittingTheorem.contents = function() {
    return "Midpoint Splitting Theorem: " + this.lineSegment.midpoint.toString() + " splits " + this.lineSegment
        + " into two congruent line segments: " + this.ls1.toString() + " and " + this.ls2.toString() + ".";
};

var SSSPostulate = new Theorem("SSS Postulate");
SSSPostulate.checkConditions = function(triange1, triangle2) {
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
SSSPostulate.applyResults = function(triangle1, triangle2) {
    TriangleCongruence.addTriangleCongruence(triangle1, triangle2);
    self.triangle1 = triangle1;
    self.triangle2 = triangle2;
};
SSSPostulate.contents = function() {
    return "SSS Postulate: " + self.triangle1.toString() + " and " + self.triangle2.toString() + " are congruent.";
}


// EXPORT FILE

define(['../Objects/Point', '../Objects/LineSegment', '../Objects/Triangle', '../Properties/Congruence'],
    function(Pt, Ls, Tri, Con) {

        Point = Pt;
        LineSegment = Ls;
        Triangle = Tri;
        Congruence = Con;

        return {

            Thm: Theorem,

            pts: points, lsgs: lineSegments, tris: triangles, congrs: congruences,

            addl: addLineSegment,

            reflP: reflexiveProperty, mst: midpointSplittingTheorem, sss: SSSPostulate

        };

    }
);
