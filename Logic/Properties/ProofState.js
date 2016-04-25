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
