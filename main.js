(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Save = require('../Save');
var geo = require('../Logic/Objects/Geometry');
var ObjectDB = require('../Logic/Objects/ObjectDB');
var ProofState = require('../Logic/Properties/ProofState');

var objects = new ObjectDB();
var A = objects.create(new geo.Point('A'));
var B = objects.create(new geo.Point('B'));
var C = objects.create(new geo.Point('C'));
var D = objects.create(new geo.Point('D'));

var sgAC = objects.create(new geo.LineSegment(A, C));
var sgAD = objects.create(new geo.LineSegment(A, D));
var sgBC = objects.create(new geo.LineSegment(B, C));
var sgCD = objects.create(new geo.LineSegment(C, D));

var trABD = objects.create(new geo.Triangle(A, B, D));
var trCBD = objects.create(new geo.Triangle(C, B, D));

var givenState = new ProofState();
givenState.add('midpoint', [B, sgAC]);
givenState.add('congruence', [sgAD, sgCD]);

var goalState = new ProofState();
goalState.add('congruence', [trABD, trCBD]);

var Exercise1 = new Save('Exercise 1', objects, givenState, [], goalState);
module.exports = Exercise1;

},{"../Logic/Objects/Geometry":4,"../Logic/Objects/ObjectDB":6,"../Logic/Properties/ProofState":12,"../Save":17}],2:[function(require,module,exports){
module.exports = {}; // TODO fill later

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = {
	Point: require("./Point"),
	LineSegment: require("./LineSegment"),
	Polygon: require("./Polygon"),
	Triangle: require("./Triangle"),
	Angle: require("./Angle")
};

},{"./Angle":3,"./LineSegment":5,"./Point":7,"./Polygon":8,"./Triangle":9}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){

var ObjectDB = function() {
	this.objects = {
		Point: [],
		LineSegment: [],
		Angle: [],
		Triangle: []
	};
};

ObjectDB.prototype.create = function(obj) {
	// prevent duplicate elements
	var group = this.objects[obj.type];
	if (group === undefined) {
		console.error("Type " + obj.type + " not supported by ObjectDB!");
		return obj;
	}

	for (var i = 0; i < group.length; i++) {
		if (obj.equals(group[i]))
			return group[i]; // return original
	}

	// if no duplicates, add to database
	this.objects[obj.type].push(obj);
	return obj;
};

ObjectDB.prototype.get = function(obj) {
	var group = this.objects[obj.type];
	if (group === undefined) {
		console.error("Type " + obj.type + " not supported by ObjectDB!");
		return undefined;
	}

	for (var i = 0; i < group.length; i++) {
		if (obj.equals(group[i]))
			return group[i]; // return original
	}

	return null;
};

module.exports = ObjectDB;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./LineSegment":5}],9:[function(require,module,exports){
'use strict';

var Polygon = require("./Polygon");

var Triangle = function() {
	Polygon.apply(this, arguments); // super(arguments);
	this.type = "Triangle";
};

Triangle.prototype = Object.create(Polygon.prototype);
Triangle.prototype.constructor = Triangle;

module.exports = Triangle;

},{"./Polygon":8}],10:[function(require,module,exports){
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
		return undefined;
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

},{}],11:[function(require,module,exports){
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
		console.error("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return undefined;
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
	if (segment.type !== "LineSegment" || point.type !== "Point") {
		console.error("Midpoints do not exist for: " + segment.type + " and " +
					point.type);
		return undefined;
	}

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

},{}],12:[function(require,module,exports){
var Congruences = require('./Congruences');
var Midpoints = require('./Midpoints');

var ProofState = function() {
	this.properties = {
		congruence: new Congruences(),
		midpoint: new Midpoints()
		// TODO: and more!
	};
};

/**
 * Adds the property to the state of the proof.
 * propertyType (String) - the type of property (e.g. congruence) to add
 * objects ([GeoObject]) - list of geometry objects to which to apply the
 * 						   property
 */
ProofState.prototype.add = function(propertyType, objects) {
	var group = this.properties[propertyType];
	if (group === undefined) {
		console.error("Property " + propertyType + " is not supported in state.");
		return;
	}

	// delegate to group's 'add' function
	group.add.apply(group, objects);
};

/**
 * Checks if the proof state has a property between objects.
 * propertyType (String) - the type of property (e.g. congruence) to check
 * objects ([GeoObject]) - list of geometry objects on which to check the
 * 						   property
 */
ProofState.prototype.contains = function(propertyType, objects) {
	var group = this.properties[propertyType];
	if (group === undefined) {
		console.error("Property " + propertyType + " is not supported in state.");
		return undefined;
	}

	// delegate to the group's 'contain' function
	return group.contains.apply(group, objects);
};

/**
 * Gets the whole property given a list of its respective pieces
 * propertyType (String) - the type of property (e.g. congruence) to get
 * objects ([GeoObject]) - list of geometry objects to get
 */
 ProofState.prototype.get = function(propertyType, objects) {
	 var group = this.properties[propertyType];
 	if (group === undefined || group.get === undefined) { // TODO add support for 'get'
 		console.error("Property " + propertyType + " is not supported in state.");
 		return undefined;
 	}

 	// delegate to the group's 'contain' function
 	return group.get.apply(group, objects);
 };
module.exports = ProofState;

},{"./Congruences":10,"./Midpoints":11}],13:[function(require,module,exports){
'use strict';
var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem');

/**
 * Midpoint Splitting Theorem constructor.
 * objects (ObjectDB) - database of all objects
 * givens  (ProofState) - given facts known so far
 */
var MidpointSplittingTheorem = function(objects, givens) {
	Theorem.call(this, objects);
	this.name = "Midpoint Splitting Theorem";
	this.givens = givens;
	this.requires = {"LineSegment": 1};
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
	return this.givens.contains('midpoint', [null, segment]);
};

MidpointSplittingTheorem.prototype.applyResults = function(segment) {
	var pair = this.givens.get('midpoint', [null, segment]);
	var midpoint = pair[0];

	var ls1 = this.objects.create(new geo.LineSegment(segment.start, midpoint));
	var ls2 = this.objects.create(new geo.LineSegment(midpoint, segment.end));
	this.givens.add('congruence', [ls1, ls2]);

	this.result = midpoint.toString() + " splits " + segment +
				  " into two congruent line segments: " +
				  ls1.toString() + " and " + ls2.toString() + ".";
};

module.exports = MidpointSplittingTheorem;

},{"../Objects/Geometry":4,"./Theorem":16}],14:[function(require,module,exports){
'use strict';
var Theorem = require('./Theorem');

var ReflexiveProperty = function(objects, givens) {
	Theorem.call(this, objects);
	this.name = "Reflexive Property";
	this.givens = givens;
	this.requires = {"LineSegment": 1};
};

// Inherit from Theorem
ReflexiveProperty.prototype = Object.create(Theorem.prototype);
ReflexiveProperty.prototype.constructor = ReflexiveProperty;

ReflexiveProperty.prototype.checkConditions = function(obj) {
	return true;
};

ReflexiveProperty.prototype.applyResults = function(obj) {
	this.givens.add('congruence', [obj, obj]);
	this.result = obj.toString() + " is congruent to itself.";
};

module.exports = ReflexiveProperty;

},{"./Theorem":16}],15:[function(require,module,exports){
'use strict';

var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem')

var SSSPostulate = function(objects, givens) {
	Theorem.call(this, objects);
	this.name = "Side-Side-Side Postulate";
	this.givens = givens;
	this.requires = {"Triangle": 2};
};

// Inherit from Theorem
SSSPostulate.prototype = Object.create(Theorem.prototype);
SSSPostulate.prototype.constructor = SSSPostulate;

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
			if (!this.givens.contains('congruence', [side1, side2])) {
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
			if (!this.givens.contains('congruence', [side1, side2])) {
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
	this.givens.add('congruence', [tr1, tr2]);
	this.result = tr1.toString() + " and " + tr2.toString() + " are congruent.";
};

module.exports = SSSPostulate;

},{"../Objects/Geometry":4,"./Theorem":16}],16:[function(require,module,exports){
'use strict';

/**
 * Abstract theorem template.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 *
 * Fields:
 * name (String)   	- the name of the theorem
 * requires ({String:int}) - what this theorem requires as input, as a relational
 *							 array of the object type, and the number needed
 * objects (Object) - reference to the relational array of objects
 * result (String)  - string representation of result when theorem is applied
 * 					  to objects
 * toString (Func)  - returns string representation of theorem
 *
 */
var Theorem = function(objects) {
	this.name = "Abstract Theorem";
	this.requires = {};
	this.objects = objects;
	this.result = "Not applied yet.";
	this.toString = function() { return this.name + ": " + this.result; };
};

module.exports = Theorem;

},{}],17:[function(require,module,exports){
/**
 * Save object.
 * objects (ObjectDB) - database of all objects used in proof
 * givens (ProofState) - state object of the start of the proof
 * steps ([String]) - steps taken toward goal
 * goals (ProofState) - state object of the desired end of the proof
 */
var Save = function(name, objects, givens, steps, goals) {
	this.name = name;
	this.objects = objects;
	this.givens = givens;
	this.steps = steps;
	this.goals = goals;
}

module.exports = Save;

},{}],18:[function(require,module,exports){
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

console.log("== Solved? %s", givenState.contains('congruence', [trABD, trCBD]));

var thm, applicable; // variables for theorem being used and applicability

// Use Reflexive Property
thm = new ReflexiveProperty(objects, givenState);
applicable = thm.checkConditions(sgBD);
if (applicable) {
	thm.applyResults(sgBD);
	console.log(thm.toString());
}

// Use Midpoint Splitting Theorem
thm = new MidpointSplittingTheorem(objects, givenState);
applicable = thm.checkConditions(sgAC);
if (applicable) {
	thm.applyResults(sgAC);
	console.log(thm.toString());
}

// Use SSS
thm = new SSSPostulate(objects, givenState);
applicable = thm.checkConditions(trABD, trCBD);
if (applicable) {
	thm.applyResults(trABD, trCBD);
	console.log(thm.toString());
}

console.log("== Solved? %s", givenState.contains('congruence', [trABD, trCBD]));

},{"./Examples/Exercise1":1,"./Graphics/Geometry":2,"./Logic/Objects/Geometry":4,"./Logic/Objects/ObjectDB":6,"./Logic/Properties/ProofState":12,"./Logic/Theorems/MidpointSplittingTheorem":13,"./Logic/Theorems/ReflexiveProperty":14,"./Logic/Theorems/SSSPostulate":15,"./Logic/Theorems/Theorem":16}]},{},[18]);
