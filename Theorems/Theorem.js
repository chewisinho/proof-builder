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
    for (var i = 0; i < lineSegments.length; i += 1) {
        if ((lineSegments[i].start === pt1 && lineSegments[i].end === pt2) ||
            (lineSegments[i].start === pt2 && lineSegments[i].end === pt1)) {
            return lineSegments[i];
        }
    };
    var newLineSegment = new LineSegment(pt1, pt2);
    lineSegments.push(newLineSegment);
    return newLineSegment;
}


// LIST OF THEOREMS


var reflexiveProperty = new Theorem("Reflexive Property");
reflexiveProperty.checkConditions = function(objs) {
    return true;
};
reflexiveProperty.applyResults = function(objs) {
    congruences.addCongruence(objs[0], objs[0]);
    this.obj = objs[0];
};
reflexiveProperty.contents = function() {
    return "Reflexive Property: " + this.obj.toString() + " is congruent to itself.";
};
reflexiveProperty.getInput = function() {
    return [lineSegments, 1];
};

var midpointSplittingTheorem = new Theorem("Midpoint Splitting Theorem");
midpointSplittingTheorem.checkConditions = function(lines) {
    return lines[0].hasOwnProperty('midpoint');
};
midpointSplittingTheorem.applyResults = function(lines) {
    var lineSegment = lines[0];
    this.lineSegment = lines[0];
    this.ls1 = addLineSegment(lineSegment.start, lineSegment.midpoint);
    this.ls2 = addLineSegment(lineSegment.midpoint, lineSegment.end);
    congruences.addCongruence(this.ls1, this.ls2);
};
midpointSplittingTheorem.contents = function() {
    return "Midpoint Splitting Theorem: " + this.lineSegment.midpoint.toString() + " splits " + this.lineSegment
        + " into two congruent line segments: " + this.ls1.toString() + " and " + this.ls2.toString() + ".";
};
midpointSplittingTheorem.getInput = function() {
    return [lineSegments, 1];
}

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
};
SSSPostulate.getInput = function() {
    return [triangles, 2];
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
