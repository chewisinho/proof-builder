/*
 * main-src.js
 * -------
 * The main driver of the program.
 */
var geo = require('./Logic/Objects/Geometry');
var ObjectDB = require('./Logic/Objects/ObjectDB');
var gfx = require('./Graphics/Geometry');
var Theorem = require('./Logic/Theorems/Theorem');
var ProofState = require('./Logic/Properties/ProofState');

// Let's try solving Exercise 1!
var Exercise1 = require('./Examples/Exercise1');
var objects    = Exercise1.objects,
	givenState = Exercise1.givens,
	steps      = Exercise1.steps,
	goalState  = Exercise1.goals;

var MidpointSplittingTheorem = require('./Logic/Theorems/MidpointSplittingTheorem');
var ReflexiveProperty = require('./Logic/Theorems/ReflexiveProperty');
var SSSPostulate = require('./Logic/Theorems/SSSPostulate');

var sgAC = new geo.LineSegment(new geo.Point('A'), new geo.Point('C'));
var sgBD = new geo.LineSegment(new geo.Point('B'), new geo.Point('D'));

var trABD = new geo.Triangle(new geo.Point('A'), new geo.Point('B'), new geo.Point('D'));
var trCBD = new geo.Triangle(new geo.Point('C'), new geo.Point('B'), new geo.Point('D'));

console.log("\n== Solved? %s", givenState.contains('congruence', [trABD, trCBD]));

var thm, applicable; // variables for theorem being used and applicability

// Use Reflexive Property
thm = new ReflexiveProperty(objects, givenState);
applicable = thm.checkConditions(sgBD);
if (applicable) {
	thm.applyResults(sgBD);
	console.log(thm.result);
}

// Use Midpoint Splitting Theorem
thm = new MidpointSplittingTheorem(objects, givenState);
applicable = thm.checkConditions(sgAC);
if (applicable) {
	thm.applyResults(sgAC);
	console.log(thm.result);
}

// Use SSS
thm = new SSSPostulate(objects, givenState);
applicable = thm.checkConditions(trABD, trCBD);
if (applicable) {
	thm.applyResults(trABD, trCBD);
	console.log(thm.result);
}

console.log("\nSolved? %s", givenState.contains('congruence', [trABD, trCBD]));
