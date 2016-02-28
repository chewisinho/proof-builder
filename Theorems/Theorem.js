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
    if(numCongruentSides === 3){
    	return true;
    } else {
    	return false;
    }
};
SSSPostulate.applyResults = function(triangle1, triangle2) {
	if(SSSPostulate.checkConditions(triangle1,triangle2)){
		TriangleCongruence.addTriangleCongruence(triangle1, triangle2);
	}
    this.triangle1 = triangle1;
    this.triangle2 = triangle2;
};
SSSPostulate.contents = function() {
    return "SSS Postulate: " + this.triangle1.toString() + " and " + this.triangle2.toString() + " are congruent.";
}

var ASAPostulate = new Theorem("ASA Postulate");
ASAPostulate.checkConditions = function(triange1,triangle2) {
	for(var ls1 in this.triangle1.lineSegments){
		for(var ls2 in this.triangle2.lineSegments){
			if(congruences.searchCongruences(ls1,ls2)||congruences.searchCongruences(ls2,ls1)){
				this.num_angles=0;
				for(var pt in ls1){
					for(var pt2 in ls2){
						if(congruences.searchCongruences(pt,pt2)){
							this.num_angles+=1;
						}	
					}
				}
				if(this.num_angles===2){
					return true;
				}
 			}
		}
	}
	return false;
}
ASAPostulate.applyResults = function(triangle1,triangle2) {
	if(ASAPostulate.checkConditions(triangle1,triangle2)){
		TriangleCongruence.addTriangleCongruence(triangle1,triangle2);
	}
	this.triangle1 = triangle1;
	this.triangle2 = triangle2l;

}
ASAPostulate.contents = function() {
	if(ASAPostulate.checkConditions){
		return "ASA Postulate: " + this.triangle1.getname() + " and " + this.triangle2.getname() + " are congruent.";
	} else{
		return "ASA Postulate: " + this.triangle1.getname() + " and " + this.triangle2.getname() + " are not congruent.";
	}
}

var TransitiveProperty = new Theorem("Transitive Property");
TransitiveProperty.checkConditions = function (a,b,c){
	if(congruences.searchCongruences(a,b) && congruences.searchCongruences(b,c)){
		return true;
	}
}
TransitiveProperty.applyResults = function (){
	if(TransitiveProperty.checkConditions(a,b,c)){
		if(!congruences.searchCongruences(a,c)){
			congruences.addCongruence(a,c);
		} 
	}
}
TransitiveProperty.contents = function (){
	return "Transitive Property:" + a.getname() + " and " + c.getname() + " are congruent.";
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
