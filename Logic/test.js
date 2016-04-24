//
// NOTE: READ ME!
// This file was made using the `browserify' command on the test-src.js file
// in this directory. Try this out by <link>ing it in a random HTML document,
// or using your favorite server-side JS utility (e.g. Node.js).
//

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Angle object.
 * ls1 (LineSegment) - the first line segment of the angle
 * ls2 (LineSegment) - the second line segment of the angle
 * cp  (Point)		 - the central point between the two segments,
 * 					   must be a common point shared by ls1, ls2!
 */
var Angle = function (ls1, ls2, cp) {
	this.type = "Angle";
	this.lineSegments = [ls1, ls2];
	this.centralPoint = cp;
};

/**
 * TODO - is this method necessary?
 * Finds the central point of two line segments.
 * ls1 (LineSegment) - the first line segment
 * ls2 (LineSegment) - the second line segment
 */
Angle.prototype.findcp = function(ls1, ls2) {
	if (ls1.start.equals(ls2.start) || ls1.start.equals(ls2.end))
		this.centralPoint = ls1.start;
	else
		this.centralPoint = ls1.end;

	return this.centralPoint;
};

Angle.prototype.equals = function(other) {
	var segsEqual = this.lineSegments[0].equals(other.lineSegments[0]) &&
					this.lineSegments[1].equals(other.lineSegments[1]) ||
					this.lineSegments[0].equals(other.lineSegments[1]) &&
					this.lineSegments[1].equals(other.lineSegments[0]);
	var cpEqual = this.centralPoint.equals(other.centralPoint);
	return segsEqual && cpEqual;
};

Angle.prototype.toString = function() {
	var cp = this.centralPoint.toString();
	var ls1 = this.lineSegments[0];
	var ls2 = this.lineSegments[1];

	return "Angle " +
			(cp.equals(ls1.start) ? ls1.end : ls1.start).toString() + cp +
			(cp.equals(ls2.start) ? ls2.end : ls2.start).toString();
};

module.exports = Angle;

},{}],2:[function(require,module,exports){
module.exports = {
	Point: require("./Point"),
	LineSegment: require("./LineSegment"),
	Polygon: require("./Polygon"),
	Triangle: require("./Triangle"),
	Angle: require("./Angle")
};

},{"./Angle":1,"./LineSegment":3,"./Point":4,"./Polygon":5,"./Triangle":6}],3:[function(require,module,exports){
'use strict';

/**
 * Line Segment object.
 * start (Point) - the start endpoint of the segment
 * end   (Point) - the other endpoint of the segment
 */
var LineSegment = function(start, end) {
	this.type = "LineSegment";
	this.start = start;
	this.end = end;
};

/**
 * Checks equality to another line segment.
 * other (LineSegment) - the other segment to compare
 */
LineSegment.prototype.equals = function(other) {
	// compare in both directions
	return (this.start.equals(other.start) && this.end.equals(other.end)) ||
		   (this.start.equals(other.end) && this.end.equals(other.start));
};

LineSegment.prototype.toString = function() {
	return this.start.toString() + this.end.toString();
};

module.exports = LineSegment;

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Point object.
 * name (String) - The name of the point.
 */
var Point = function(name) {
	this.type = "Point";
	this.name = name;
};

Point.prototype.equals = function(other) {
	return this.name === other.name;
};

Point.prototype.toString = function() {
	return this.name;
};

module.exports = Point;

},{}],5:[function(require,module,exports){
'use strict';

var LineSegment = require('./LineSegment');

/**
 * Polygon object.
 * Accepts variable length of (Point) arguments.
 */
var Polygon = function() {
	this.type = "Polygon";
	this.points = Array.from(arguments);
};

/**
 * Checks for equality, based on what points the polygon has, and in what order.
 * Note: this is not to be used for checking *congruence*
 *
 * other (Polygon) - the other polygon to compare
 *
 * return - true if the polygons are equal, false if not
 */
Polygon.prototype.equals = function(other) {
	// check if this polygon is of the same order (side number)
	if (this.points.length != other.points.length) return false;

	// check every rotation of this polygon to the other
	var sides = this.points.length;
	for (var i = 0; i < sides; i++) {
		var s; // side being compared

		// in "clockwise" rotation
		for (s = 0; s < sides; s++) {
			var p = (s + i) % sides; // point being compared
			if (!this.points[p].equals(other.points[s])) break;
		} if (s == sides) return true;

		// in "counter-clockwise" rotation
		for (s = 0; s < sides; s++) {
			var p = (sides + i - s) % sides; // point being compared
			if (!this.points[p].equals(other.points[s])) break;
		} if (s == sides) return true;
	}

	return false;
};

/**
 * Returns an array of the LineSegments making up this Polygon
 */
Polygon.prototype.sideSegments = function() {
	var result = [];
	var len = this.points.length;

	// construct segments from this Polygon's points
	for (var i = 0; i < len; i++) {
		var seg = new LineSegment(this.points[i], this.points[(i + 1) % len]);
		result.push(seg);
	}

	return result;
}

Polygon.prototype.toString = function() {
	return this.type + " " +
	this.points.reduce(function(prev, curr, index, arr) {
		return prev.toString() + curr.toString();
	});
};

module.exports = Polygon;

},{"./LineSegment":3}],6:[function(require,module,exports){
'use strict';

var Polygon = require("./Polygon");

var Triangle = function() {
	Polygon.apply(this, arguments); // super(arguments);
	this.type = "Triangle";
};

Triangle.prototype = Object.create(Polygon.prototype);
Triangle.prototype.constructor = Triangle;

module.exports = Triangle;

},{"./Polygon":5}],7:[function(require,module,exports){
'use strict';

var Congruences = function() {
	this.congruences = {
		LineSegment: [],
		Angle: [],
		Triangle: [],
		Circle: []
	};
}

Congruences.relation = " is congruent to ";

Congruences.prototype.contains = function(obj1, obj2) {
	// find the congruence in the corresponding congruence group
	var group = this.congruences[obj1.type];

	if (group === undefined) {
		console.log("Type " + obj1.name + " not in congruences!");
		//return undefined;
	}

	// loop through the given group, linearly searching for a congruence pair
	// matching the given one
	for (var i = 0; i < group.length; i++) {
		var pair = group[i];
		if (pair[0].equals(obj1) && pair[1].equals(obj2) ||
			pair[0].equals(obj2) && pair[2].equals(obj1)) {
			return true;
		}
	}

	return false;
};

Congruences.prototype.add = function(obj1, obj2) {
	// prevent adding an already existing pair
	if (!this.contains(obj1, obj2)) {
		var pair = [obj1, obj2]; // new congruence pair
		this.congruences[obj1.type].push(pair);
	}
};

module.exports = Congruences;

},{}],8:[function(require,module,exports){
'use strict';

var Midpoints = function() {
	this.pairs = [];
};

Midpoints.relation = " is the midpoint of ";

/**
 * Checks relation between a point and a segment.
 */
Midpoints.prototype.contains = function(point, segment) {
	// reject non-matching types
	if (segment.type !== "LineSegment") {
		console.log("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return false;
	}

	// linearly search for a midpoint pair
	for (var i = 0; i < this.pairs.length; i++) {
		var pair = this.pairs[i];
		// allows for checking only if the segment has a midpoint
		if (pair[1].equals(segment)) {
			if (point == null) return true;
			else return pair[0].equals(point);
		}
	}

	return false;
};

Midpoints.prototype.add = function(point, segment) {
	// reject non-matching types
	if (segment.type !== "LineSegment" || point.type !== "Point")
		console.log("Midpoints do not exist for: " + segment.type + " and " +
					point.type);

	// prevent adding an already existing pair
	if (!this.contains(point, segment)) {
		this.pairs.push([point, segment]);
	}
};

Midpoints.prototype.get = function(point, segment) {
	// linearly search for a midpoint pair
	for (var i = 0; i < this.pairs.length; i++) {
		var pair = this.pairs[i];
		// allows for checking only the segment
		if (pair[1].equals(segment)) {
			return pair;
		}
	}
};

module.exports = Midpoints;

},{}],9:[function(require,module,exports){
'use strict';
var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem');

/**
 * Midpoint Splitting Theorem constructor.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 * midpoints   (Obj<-Midpoints)   - midpoints of the system
 * congruences (Obj<-Congruences) - congruences of the system
 */
var MidpointSplittingTheorem = function(objects, midpoints, congruences) {
	Theorem.call(this, objects);
	this.name = "Midpoint Splitting Theorem";
	this.midpoints = midpoints;
	this.congruences = congruences;
	this.inputSize = 1;
};

// Inherit from Theorem
MidpointSplittingTheorem.prototype = Object.create(Theorem.prototype);
MidpointSplittingTheorem.prototype.constructor = MidpointSplittingTheorem;

/**
 * Checks that the given line segment has a midpoint.
 * segment (LineSegment) - the segment to check
 */
MidpointSplittingTheorem.prototype.checkConditions = function(segment) {
	// search simply for the segment containing a midpoint
	return this.midpoints.contains(null, segment);
};

MidpointSplittingTheorem.prototype.applyResults = function(segment) {
	var pair = this.midpoints.get(null, segment);
	var midpoint = pair[0];

	var ls1 = new geo.LineSegment(segment.start, midpoint);
	var ls2 = new geo.LineSegment(midpoint, segment.end);
	this.objects.linesegs.push(ls1, ls2);
	this.congruences.add(ls1, ls2);

	this.result = midpoint.toString() + " splits " + segment +
				  " into two congruent line segments: " +
				  ls1.toString() + " and " + ls2.toString() + ".";
};

// FIXME - figure out how theorems will specify required inputs!
MidpointSplittingTheorem.prototype.getInput = function() {
	return ['linesegs', this.inputSize];
};

module.exports = MidpointSplittingTheorem;

},{"../Objects/Geometry":2,"./Theorem":11}],10:[function(require,module,exports){
'use strict';

var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem')

var SSSPostulate = function(objects, congruences) {
	Theorem.call(this, objects);
	this.name = "Side-Side-Side Postulate";
	this.congruences = congruences;
	this.inputSize = 2;
};

// Inherit from Theorem
SSSPostulate.prototype = Object.create(Theorem.prototype);
SSSPostulate.prototype.constructor = SSSPostulate;

// TODO write members for theorem

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
			if (!this.congruences.contains(side1, side2)) {
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
			if (!this.congruences.contains(side1, side2)) {
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
	this.congruences.add(tr1, tr2);
	this.result = tr1.toString() + " and " + tr2.toString() + " are congruent.";
};

module.exports = SSSPostulate;

},{"../Objects/Geometry":2,"./Theorem":11}],11:[function(require,module,exports){
'use strict';

/**
 * Abstract theorem template.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 *
 * Fields:
 * name (String)   	- the name of the theorem
 * inputSize (int) 	- the number of inputs for this theorem
 * objects (Object) - reference to the relational array of objects
 * result (String)  - string representation of result when theorem is applied
 * 					  to objects
 * toString (Func)  - returns string representation of theorem
 *
 */
var Theorem = function(objects) {
	this.name = "Abstract Theorem";
	this.inputSize = 0;
	this.objects = objects;
	this.result = "Not applied yet.";
	this.toString = function() { return this.name + ": " + this.result; };
};

module.exports = Theorem;

},{}],12:[function(require,module,exports){
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

},{"./Objects/Geometry":2,"./Properties/Congruences":7,"./Properties/Midpoints":8,"./Theorems/MidpointSplittingTheorem":9,"./Theorems/SSSPostulate":10}]},{},[12]);
