//
// Testing the refactored versions of our modules:
// So far, there are modules written for:
//  - All the object types except the Circle
//  - Midpoint Splitting Theorem and SSS Postulate
//  - New classes to handle Congruences, Midpoints, and other properties
// 	  the system of geometric objects contains
//
// This tester file tests the MidpointSplittingTheorem and SSSPostulate modules;
// feel free to add more test cases below!
//


var geo = require('./Objects/Geometry');
var Congruences = require('./Properties/Congruences');
var Midpoints = require('./Properties/Midpoints');
var MidpointSplittingTheorem = require('./Theorems/MidpointSplittingTheorem');
var SSSPostulate = require('./Theorems/SSSPostulate')

// object database - TODO probably represent this better?
// make a Database object perhaps?
var objects = {
	points: [],
	linesegs: [],
	angles: [],
	triangles: []
};

// add points to object database
var A = new geo.Point('A');
var B = new geo.Point('B');
var C = new geo.Point('C');
var D = new geo.Point('D');
var E = new geo.Point('E');
var F = new geo.Point('F');
objects.points.push(A, B, C, D, E, F);

// add triangles to object database
var trABC = new geo.Triangle(A, B, C);
var trDEF = new geo.Triangle(D, E, F);

// add segments to object database
var sgEF = new geo.LineSegment(E, F);
objects.linesegs.push(sgEF);

var trABCsegs = trABC.sideSegments();
var trDEFsegs = trDEF.sideSegments();
objects.linesegs = objects.linesegs.concat(trABCsegs).concat(trDEFsegs);

var congruences = new Congruences();
for (var i = 0; i < 3; i++) {
	congruences.add(trABCsegs[i], trDEFsegs[i]);
}

var midpoints = new Midpoints();
midpoints.add(B, sgEF); // B is the midpoint of EF

console.log();

/** testing midpoint splitting theorem **/
var msp_thm = new MidpointSplittingTheorem(objects, midpoints, congruences);
var applicable = msp_thm.checkConditions(sgEF);

console.log(sgEF.toString() + " and " + B.toString() + ": ");
console.log("Midpoint Splitting Theorem applicable? " + applicable);

var sgEG = new geo.LineSegment(E, B);
var sgGF = new geo.LineSegment(F, B);

console.log("Before: " + msp_thm.result);
console.log("Congruence EG=FG exists? " + congruences.contains(sgEG, sgGF));

if (applicable) msp_thm.applyResults(sgEF);

console.log("After:  " + msp_thm.result);
console.log("Congruence EG=FG exists? " + congruences.contains(sgEG, sgGF));

console.log();

/** testing SSS Postulate **/
var sss_pos = new SSSPostulate(objects, congruences);
var applicable = sss_pos.checkConditions(trABC, trDEF);

console.log(trABC.toString() + " and " + trDEF.toString() + ": ");
console.log("SSS Postulate applicable? " + applicable);

console.log("Before: " + sss_pos.result);
console.log("Congruence ABC=DEF exists? " + congruences.contains(trABC, trDEF));

if (applicable) sss_pos.applyResults(trABC, trDEF);

console.log("After:  " + sss_pos.result);
console.log("Congruence ABC=DEF exists? " + congruences.contains(trABC, trDEF));

console.log();

// TODO: moar test cases plox
