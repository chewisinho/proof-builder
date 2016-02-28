'use strict';

var Point;
var LineSegment;
var Triangle;
var Congruence;
var TriangleCongruence;
var AngleCongruence;
var Given, MidpointGiven, TriangleGiven, AngleGiven;
var Save;


// MAIN THEOREM CLASS


var Theorem = function(name) {
    this.checkCondition = function() { };
    this.applyResult = function() { };
    this.getInput = function() { };
    this.shortName = name;
    this.contents = name;
}


// SET UP OBJECT DATABASE.


var givens;
var goals;
var points;
var lineSegments;
var angles;
var triangles;
var congruences;
var triangleCongruences;
var angleCongruences;


function clearGlobalVariables() {
    givens = new Array();
    goals = new Array();
    points = new Array();
    lineSegments = new Array();
    angles = new Array();
    triangles = new Array();
    congruences = new Congruence();
    triangleCongruences = new TriangleCongruence();
    angleCongruences = new AngleCongruence();
}

function lineSegmentEquals(segment1, segment2) {
    var bool = ((segment1.start === segment1.start && segment1.end === segment2.end) ||
        (segment1.start === segment1.end && segment1.end === segment2.start));
    if (bool) {
        console.log("EQUALITY: " + segment1.toString() + " " + segment2.toString());
    }
    return bool;
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

function createAngle(ls1, ls2, cp) {
    /*this.name1 = cp.toString();
    this.name2 = Angle.findcp(ls1,ls2);
    for(var i=0;i<angles.length;i++){
        if(name1 === angles[i].toString() || name2 === angles[i].toString()){
            return angles[i];
        }else{
            var a1 = new Angle(ls1,ls2,cp);
            angles.push(a1);
            return a1;
        }
    }
    */
    var ang = new Angle(ls1, ls2, cp);
    angles.push(ang);
    return ang;
}

function createTriangle(p1, p2, p3) {
    // Check if the Triangle already exists.
    // var name = [p1.toString(), p2.toString(), p3.toString()];
    // name = name.sort(case_insensitive_comp);
    // name = name.join("");
    // for (var i = 0; i < triangles.length; i += 1) {
    //     var tName = triangles[i].name;
    //     tName = tName.split("");
    //     tName.sort(case_insensitive_comp);
    //     tName.join("");
    //     if (name === tName) {
    //         return triangles[i];
    //     };
    // };
    var tr = new Triangle(p1, p2, p3);
    tr.lineSegments = [createLineSegment(p1, p2), createLineSegment(p2, p3), createLineSegment(p3, p1)];
    // tr.angles.push(new Angle(tr.lineSegments[0], tr.lineSegments[1]), tr.P2);
    // tr.angles.push(new Angle(tr.lineSegments[1], tr.lineSegments[2]), tr.P3);
    // tr.angles.push(new Angle(tr.lineSegments[2], tr.lineSegments[0]), tr.P1);
    triangles.push(tr);
    return tr;
}

function createPoint(P1) {
    for (var i = 0; i < points.length; i += 1) {
        if (P1 === points[i].toString()) {
            return points[i];
        };
    };
    var pt = new Point(P1);
    points.push(pt);
    return pt;
};


// LIST OF THEOREMS


var reflexiveProperty = new Theorem("Reflexive Property");
reflexiveProperty.checkConditions = function(objs) {
    return true;
};
reflexiveProperty.applyResults = function(objs) {
    congruences.addCongruence(objs[0], objs[0]);
    this.obj = objs[0];
    var g = new Given(objs[0], objs[0]);
    g.generate('congruent');
    givens.push(g);
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
    var g = new Given(this.ls1, this.ls2);
    g.generate('congruent');
    givens.push(g);
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
    this.sides1 = [];
    this.sides2 = [];
    for (var i = 0; i < 3; i += 1) {
        var side1 = triangles[0].lineSegments[i];
        for (var j = 0; j < 3; j += 1) {
            var side2 = triangles[1].lineSegments[j];
            if (congruences.searchCongruences(side1, side2)) {
                var alreadySeen = false;
                for (var k = 0; k < this.sides2.length; k += 1) {
                    if (side2 === this.sides2[k]) {
                        alreadySeen = true;
                    };
                };
                if (!alreadySeen) {
                    this.sides1.push(side1);
                    this.sides2.push(side2);
                };
            };
        };
    };
    return this.sides1.length === 3;
};
SSSPostulate.applyResults = function(triangles) {
    triangleCongruences.addSSSCongruence(triangles[0], triangles[1], this.sides1, this.sides2);
    this.triangle1 = triangles[0];
    this.triangle2 = triangles[1];
    var g = new Given(this.triangle1, this.triangle2);
    g.generate('congruent');
    givens.push(g);
};
SSSPostulate.contents = function() {
    return "SSS Postulate: " + this.triangle1.toString() + " and " + this.triangle2.toString() + " are congruent.";
};
SSSPostulate.getInput = function() {
    return [triangles, 2];
};

var SASPostulate = new Theorem("SASPostulate");
SASPostulate.checkConditions = function(triangles) {
    this.sides1 = [];
    this.sides2 = [];
    for (var i = 0; i < 3; i += 1) {
        var side1 = triangles[0].lineSegments[i];
        for (var j = 0; j < 3; j += 1) {
            var side2 = triangles[1].lineSegments[j];
            if (congruences.searchCongruences(side1, side2)) {
                var alreadySeen = false;
                for (var k = 0; k < this.sides2.length; k += 1) {
                    if (side2 === this.sides2[k]) {
                        alreadySeen = true;
                    };
                };
                if (!alreadySeen) {
                    this.sides1.push(side1);
                    this.sides2.push(side2);
                };
            };
        };
    };
    if(this.sides1.length === 2) {
        for(var i=0;i<angle.length;i+=1){
        }
    } else {
        return false;
    }
};
SASPostulate.applyResults = function(triangles) {
    triangleCongruences.addSASCongruence(triangles[0], triangles[1], this.sides1, this.sides2);
    this.triangle1 = triangles[0];
    this.triangle2 = triangles[1];
    var g = new Given(this.triangle1, this.triangle2);
    g.generate('congruent');
    givens.push(g);
};
SASPostulate.contents = function() {
    return "SSS Postulate: " + this.triangle1.toString() + " and " + this.triangle2.toString() + " are congruent.";
};
SASPostulate.getInput = function() {
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
		// triangleCongruence.addTriangleCongruence(triangle1,triangle2);
	}
	this.triangle1 = triangle1;
	this.triangle2 = triangle2l;

}
ASAPostulate.contents = function() {
	if (ASAPostulate.checkConditions) {
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


// INITIAL EXERCISES


function makeExercise1() {

    clearGlobalVariables();

    var A = createPoint('A');
    var B = createPoint('B');
    var C = createPoint('C');
    var D = createPoint('D');
    var AC = createLineSegment(A, C);
    var AD = createLineSegment(A, D);
    var BC = createLineSegment(B, C);
    var CD = createLineSegment(C, D);
    AC.midpoint = B;
    var trABD = createTriangle(A, B, D);
    var trCBD = createTriangle(C, B, D);

    congruences = new Congruence();
    congruences.addCongruence(AD, CD);
    triangleCongruences = new TriangleCongruence();

    var givens = new Array();
    var startCong = new Given(AD, CD);
    startCong.generate('congruent');
    givens.push(startCong);
    givens.push(new MidpointGiven(AC, B));
    givens.push(new TriangleGiven(trABD));
    givens.push(new TriangleGiven(trCBD));

    var goals = Array();
    var goal = new Given(trABD, trCBD);
    goal.generate('congruent');
    goals.push(goal);

    var save = new Save(givens, goals, [], points, lineSegments,
                    angles, triangles, congruences, triangleCongruences);

    save.name = "Exercise 1";
    save.proofComplete = function() {
        return this.triangleCongruences.searchCongruences(trABD, trCBD);
    };

    // load image
    var img = new Image();
    img.src = './resources/ex_1.png';
    save.image = img;

    return save;

}

function makeExercise2() {

    clearGlobalVariables();

    var R = createPoint('R');
    var S = createPoint('S');
    var T = createPoint('T');
    var RS = createLineSegment(R, S);
    var RT = createLineSegment(R, T);
    var trRST = createTriangle(R, S, T);
    var trRTS = createTriangle(R, T, S);

    congruences = new Congruence();
    congruences.addCongruence(RS, RT);
    triangleCongruences = new TriangleCongruence();

    var givens = new Array();
    var startCong = new Given(RS, RT);
    startCong.generate('congruent');
    givens.push(startCong);
    givens.push(new TriangleGiven(trRST));
    givens.push(new TriangleGiven(trRTS));

    var goals = Array();
    var goal = new Given(trRST, trRTS);
    goal.generate('congruent');
    goals.push(goal);

    var save = new Save(givens, goals, [], points, lineSegments,
                    angles, triangles, congruences, triangleCongruences);

    save.name = "Exercise 2";
    save.proofComplete = function() {
        return this.triangleCongruences.searchCongruences(trRST, trRTS);
    };

    return save;

}

function makeExercise3() {

    clearGlobalVariables();

    var A = createPoint('A');
    var B = createPoint('B');
    var C = createPoint('C');
    var D = createPoint('D');
    var AB = createLineSegment(A, B);
    var AD = createLineSegment(A, D);
    var BD = createLineSegment(B, D);
    var BC = createLineSegment(B, C);
    var angABD = createAngle(AB, BD, B);
    var angCBD = createAngle(BC, BD, B);
    var trABD = createTriangle(A, B, D);
    var trCBD = createTriangle(C, B, D);

    congruences = new Congruence();
    congruences.addCongruence(AB, BC);
    congruences.addCongruence(angABD,angCBD);

    var TriangleCongruences = new TriangleCongruence();
    var AngleCongruences = new AngleCongruence();

    var givens = new Array();
    var startCong = new Given(AB, BC);
    startCong.generate('congruent');
    var startCong2 = new Given(angABD,angCBD);
    startCong2.generate('congruent');
    givens.push(new AngleGiven(angABD));
    givens.push(new AngleGiven(angCBD));
    givens.push(new TriangleGiven(trABD));
    givens.push(new TriangleGiven(trCBD));

    var goals = Array();
    var goal = new Given(trABD, trCBD);
    goal.generate('congruent');
    goals.push(goal);

    var save = new Save(givens, goals, [], points, lineSegments,
                    angles, triangles, congruences, triangleCongruences, angleCongruences);

    save.name = "Exercise 3";
    save.proofComplete = function() {
        return this.triangleCongruences.searchCongruences(trABD, trCBD);
    };

    return save;

};

// EXPORT FILE


define(['../Objects/Point', '../Objects/LineSegment', '../Objects/Triangle',
    '../Properties/Congruence', '../Properties/TriangleCongruence', './Given', '../Save','../Properties/AngleCongruence'],
    function(Pt, Ls, Tri, Con, TriCon, g, s, AngCon) {

    Point = Pt;
    LineSegment = Ls;
    Triangle = Tri;
    Congruence = Con;
    TriangleCongruence = TriCon;
    Save = s;

    Given = g.given;
    TriangleGiven = g.trigiven;
    MidpointGiven = g.mdpgiven;
    AngleGiven = g.angiven;

    AngleCongruence = AngCon;

    return {

        Thm: Theorem,

        go: goals, giv: givens, pts: points, lsgs: lineSegments, tris: triangles,
        congrs: congruences, an: angles, tricon: triangleCongruences,

        lse: lineSegmentEquals, addl: createLineSegment, csc: case_insensitive_comp,
        ca: createAngle, ct: createTriangle, cp: createPoint,

        mkex1: makeExercise1, mkex2: makeExercise2, mkex3: makeExercise3,

        reflP: reflexiveProperty, mst: midpointSplittingTheorem, sss: SSSPostulate

    };

});
