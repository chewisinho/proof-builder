'use strict';

var Point;
var LineSegment;
var Triangle;
var Congruence;
var TriangleCongruence;


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
var angles = new Array();
var triangles = new Array();
var congruences = new Congruence();
var triangleCongruences = new TriangleCongruence();

function lineSegmentEquals(segment1, segment2) {
    return ((segment1.start === segment1.start && segment1.end === segment2.end) ||
        (segment1.start === segment1.end && segment1.end === segment2.start));
}

var createLineSegment = function(pt1, pt2) {
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

function case_insensitive_comp(strA, strB) {
    return strA.toLowerCase().localeCompare(strB.toLowerCase());
}

function createAngle(ls1,ls2,cp){
    this.name = cp.toString();
    this.name2 = Angle.findcp(ls1,ls2);
    for(var i=0;i<angles.length;i++){
        if(name === angles[i].toString() || name2 === angles[i].toString()){
            return angles[i];
        }else{
            var a1 = new Angle(ls1,ls2,cp);
            angles.push(a1);
            return a1;
        }
    }
}

function createTriangle(p1, p2, p3) {
    // Check if the Triangle already exists.
    var name = [p1.toString(), p2.toString(), p3.toString()];
    name = name.sort(case_insensitive_comp);
    name = name.join("");
    for (var i = 0; i < triangles.length; i += 1) {
        var tName = triangles[i].name;
        tName = tName.split("");
        tName.sort(case_insensitive_comp);
        tName.join("");
        if (name === tName) {
            return triangles[i];
        };
    };
    var tr = new Triangle(p1, p2, p3);
    tr.lineSegments = [createLineSegment(p1, p2), createLineSegment(p2, p3), createLineSegment(p2, p3)];
    tr.angles.push(new Angle(tr.lineSegments[0], tr.lineSegments[1]), tr.P2);
    tr.angles.push(new Angle(tr.lineSegments[1], tr.lineSegments[2]), tr.P3);
    tr.angles.push(new Angle(tr.lineSegments[2], tr.lineSegments[0]), tr.P1);
    triangles.push(tr);
    return tr;
}

function createPoint(P1) {
    for (var i = 0; i < points.length; i += 1) {
        if (P1 === points[i].toString()) {
            return points[i];
        } else {
            var pt = new Point(P1);
            points.push(pt);
            return  pt;
        };
    };
};


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
    this.ls1 = createLineSegment(lineSegment.start, lineSegment.midpoint);
    this.ls2 = createLineSegment(lineSegment.midpoint, lineSegment.end);
    congruences.addCongruence(this.ls1, this.ls2);
};
midpointSplittingTheorem.contents = function() {
    return "Midpoint Splitting Theorem: " + this.lineSegment.midpoint.toString() + " splits " + this.lineSegment
        + " into two congruent line segments: " + this.ls1.toString() + " and " + this.ls2.toString() + ".";
};
midpointSplittingTheorem.getInput = function() {
    return [lineSegments, 1];
};

var SSSPostulate = new Theorem("SSS Postulate");
SSSPostulate.checkConditions = function(triangles) {
    self.sides1 = [];
    self.sides2 = [];
    for (var i = 0; i < 3; i += 1) {
        var side1 = triangles[0].lineSegments[i];
        for (var j = 0; j < 3; j += 1) {
            var side2 = triangles[1].lineSegments[j];
            if (lineSegmentEquals(side1, side2)) {
                self.sides1.push(side1);
                self.sides2.push(side2);
            };
        };
    };
    return side1.length === 3;
};
SSSPostulate.applyResults = function(triangles) {
    triangleCongruences.addSSSCongruence(triangles[0], triangles[1], self.sides1, self.sides2);
    this.triangle1 = triangles[0];
    this.triangle2 = triangles[1];
};
SSSPostulate.contents = function() {
    return "SSS Postulate: " + this.triangle1.toString() + " and " + this.triangle2.toString() + " are congruent.";
};
SSSPostulate.getInput = function() {
    return [triangles, 2];
};

var ASAPostulate = new Theorem("ASA Postulate");
ASAPostulate.checkConditions = function(triange1,triangle2) {
	for(var ls1 in this.triangle1.lineSegments){
		for(var ls2 in this.triangle2.lineSegments){
			if(congruences.searchCongruences(ls1,ls2)){
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

//Trying something out....So yeah.
var VerticleAngles = new Theorem("Verticle Angles");
VerticleAngles.checkConditions = function (a1,a2) {
    if (AngleCongruence.verticleAngles(a1, a2)) {
        return true;
    } else {
        return false;
    };
};
VerticleAngles.applyResults = function(a1, a2) {
    if(VerticleAngles.checkConditions(a1,a2)){
        AngleCongruence.addAngleCongruence(a1,a2);
        return VerticleAngles.contents(a1,a2);
    };
};
VerticleAngles.contents = function(a1, a2) {
    return "Verticle Angles: " + a1.toString() + " and " + a2.toString() + " are congruent.";
};


// EXPORT FILE

define(['../Objects/Point', '../Objects/LineSegment', '../Objects/Triangle',
    '../Properties/Congruence', '../Properties/TriangleCongruence'],
    function(Pt, Ls, Tri, Con, TriCon) {

        Point = Pt;
        LineSegment = Ls;
        Triangle = Tri;
        Congruence = Con;
        TriangleCongruence = TriCon;

        return {

            Thm: Theorem,

            pts: points, lsgs: lineSegments, tris: triangles, congrs: congruences,

            addl: createLineSegment,

            reflP: reflexiveProperty, mst: midpointSplittingTheorem, sss: SSSPostulate

        };

    }
);
