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
