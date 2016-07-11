(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Save = require('../Saving/Save');
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

var Exercise1 = new Save('Exercise 1', objects, givenState, [], goalState, './resources/ex_1.png');
module.exports = Exercise1;

},{"../Logic/Objects/Geometry":4,"../Logic/Objects/ObjectDB":6,"../Logic/Properties/ProofState":12,"../Saving/Save":18}],2:[function(require,module,exports){
'use strict';

var GUI = {};

/*
 * Fills a <ul> with data from a theorem list.
 * query (String) - CSS selector for the <ul> to populate
 * data_list [Object] - the objects to display
 * access (Object=>String)? - a function mapping an object to its display value
 *                            if none given, uses the object's toString.
 */
GUI.display_list = function(query, data_list, access) {
    let html_list = $(query);
    html_list.empty();
    data_list.forEach(function (curr) {
        let li = document.createElement('li');
        li.innerHTML = access ? access(curr) : curr.toString();
        console.log(curr);
        li.setAttribute('class', 'action');
        html_list.append(li);
    });
};

/**
 * Opens a confirmation dialog with the given title and text.
 * title (String) - title of the dialog
 * text (String) - content of the dialog
 * callback (Function) - function that executes when the dialog is confirmed
 */
GUI.open_confirm_dialog = function(title, text, callback) {
    $('#dialog').html(text);
    $('#dialog').dialog({
       title: title,
       closeText: 'x',
       modal: true,
       maxWidth: '70%',
       width: '40%',
       buttons: [
           { text: 'OK', click: function () {
               callback();
               $(this).dialog('close');
           }}
       ] 
    });
};

module.exports = GUI;

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
 * label (String) - The name/label of the point.
 */
var Point = function(label) {
	this.type = "Point";
	this.label = label;
};

Point.prototype.equals = function(other) {
	return this.label === other.label;
};

Point.prototype.toString = function() {
	return this.label;
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

Congruences.prototype.toString = function() {
	var result = "Congruences:\n";

	for (var group in this.congruences) {
		var list = this.congruences[group];
		if (list.length == 0) continue;
		result += ("\t" + group + "s: ");
		var i;
		for (i = 0; i < list.length - 1; i++) {
			result += list[i][0].toString() + Congruences.relation +
					  list[i][1].toString() + ", ";
		}

		result += list[i][0].toString() + Congruences.relation +
				  list[i][1].toString() + "\n";
	}

	return result;
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

Midpoints.prototype.toString = function() {
	if (this.pairs.length == 0) return "";
	var result = "Midpoints: ";

	var i;
	for (i = 0; i < this.pairs.length - 1; i++) {
		result += (this.pairs[i][0] + Midpoints.relation +
				   this.pairs[i][1]) + ", ";
	}

	if (i == this.pairs.length - 1)
		result += (this.pairs[i][0] + Midpoints.relation +
				   this.pairs[i][1]);

	return result;
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

ProofState.prototype.toString = function() {
	return this.properties.congruence.toString() + "\n" +
		   this.properties.midpoint.toString();
};
module.exports = ProofState;

},{"./Congruences":10,"./Midpoints":11}],13:[function(require,module,exports){
module.exports = {
	MidpointSplitting: require('./Theorems/MidpointSplittingTheorem'),
	ReflexiveProperty: require('./Theorems/ReflexiveProperty'),
	SSSPostulate: require('./Theorems/SSSPostulate')
};

},{"./Theorems/MidpointSplittingTheorem":14,"./Theorems/ReflexiveProperty":15,"./Theorems/SSSPostulate":16}],14:[function(require,module,exports){
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
	this.givens = givens;
	this.requires = {"LineSegment": 1};
};

MidpointSplittingTheorem.title = "Midpoint Splitting Theorem";

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

},{"../Objects/Geometry":4,"./Theorem":17}],15:[function(require,module,exports){
'use strict';
var Theorem = require('./Theorem');

var ReflexiveProperty = function(objects, givens) {
	Theorem.call(this, objects);
	this.givens = givens;
	this.requires = {"LineSegment": 1};
};

ReflexiveProperty.title = "Reflexive Property";

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

},{"./Theorem":17}],16:[function(require,module,exports){
'use strict';

var geo = require('../Objects/Geometry');
var Theorem = require('./Theorem')

var SSSPostulate = function(objects, givens) {
	Theorem.call(this, objects);
	this.givens = givens;
	this.requires = {"Triangle": 2};
};

SSSPostulate.title = "Side-Side-Side Postulate";

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

},{"../Objects/Geometry":4,"./Theorem":17}],17:[function(require,module,exports){
'use strict';

/**
 * Abstract theorem template.
 * objects ({Array(Point), Array(LineSegment), Array(Angle), Array(Triangle)})
 * 			- relational array of all objects
 *
 * Fields:
 * long_name (String)      - the name of the theorem
 * requires ({String:int}) - what this theorem requires as input, as a relational
 *							 array of the object type, and the number needed
 * objects (Object) - reference to the relational array of objects
 * result (String)  - string representation of result when theorem is applied
 * 					  to objects
 * toString (Func)  - returns string representation of theorem
 *
 */
var Theorem = function(objects) {
	this.requires = {};
	this.objects = objects;
	this.result = "Not applied yet.";
	this.appliedString = function() { return this.title + ": " + this.result; };
};

Theorem.title = "Abstract Theorem";

module.exports = Theorem;

},{}],18:[function(require,module,exports){
/**
 * Save object.
 * title (String) - Name of the title.
 * objects (ObjectDB) - database of all objects used in proof
 * givens (ProofState) - state object of the start of the proof
 * steps ([String]) - steps taken toward goal
 * goals (ProofState) - state object of the desired end of the proof
 * img (String) - [TEMPORARY] path to the an image of the proof problem
 */
var Save = function(title, objects, givens, steps, goals, img) {
	this.title = title;
	this.objects = objects;
	this.givens = givens;
	this.steps = steps;
	this.goals = goals;
    this.img = img;
    
    this.toString = function() { return this.title; };
}

module.exports = Save;

},{}],19:[function(require,module,exports){
'use strict';

var geo = require('./Logic/Objects/Geometry');
var thm = require('./Logic/Theorems');
var ObjectDB = require('./Logic/Objects/ObjectDB');
var ProofState = require('./Logic/Properties/ProofState');
var Exercise1 = require('./Examples/Exercise1');
//var gfx = require('./Graphics/Geometry');
var GUI = require('./Graphics/GUI');

var given_theorems = [];
var built_theorems = [];

var current_thm_pane;

function main() {
    // Load given theorems.
    given_theorems = Object.keys(thm).map(function (key) {
        return thm[key];
    });
    
    // Load built theorems / exercises.
    // TODO: This will eventually be automatic when we implement persistence etc.
    // For now, we'll just use Exercise 1.
    built_theorems.push(Exercise1);

    // Display givens first.
    GUI.display_list('#theorem-section .section-contents', given_theorems, (thm) => thm.title);
    current_thm_pane = $('#given-button').get(0);

    // Set up event handling.
    let thm_apply_event = function(event) {
        $('#theorem-section .section-contents li').on('click', event => {
            let name = event.currentTarget.innerHTML;
            GUI.open_confirm_dialog(name, 'Apply ' + name + '?', function() {console.log(name)}); 
        });
    };

    $('#built-button').on('click', function(event) {
        GUI.display_list('#theorem-section .section-contents',
                         built_theorems,
                         thm => thm.title);
        event.currentTarget.classList.add('active');
        if (current_thm_pane != event.currentTarget)
            current_thm_pane.classList.remove('active');
        current_thm_pane = event.currentTarget;
        thm_apply_event();
    });
    
    $('#given-button').on('click', function(event) {
        GUI.display_list('#theorem-section .section-contents',
                         given_theorems,
                         thm => thm.title);
        event.currentTarget.classList.add('active');
        if (current_thm_pane != event.currentTarget)
            current_thm_pane.classList.remove('active');
        current_thm_pane = event.currentTarget;
        thm_apply_event();
    });
    
    thm_apply_event();

}

main();
},{"./Examples/Exercise1":1,"./Graphics/GUI":2,"./Logic/Objects/Geometry":4,"./Logic/Objects/ObjectDB":6,"./Logic/Properties/ProofState":12,"./Logic/Theorems":13}]},{},[19]);
