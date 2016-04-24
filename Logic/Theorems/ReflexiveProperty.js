'use strict';
var Theorem = require('./Theorem');

var ReflexiveProperty = function(objects, congruences) {
	Theorem.call(this, objects);
	this.name = "Reflexive Property";
	this.congruences = congruences;
	this.inputSize = 1;
};

// Inherit from Theorem
MidpointSplittingTheorem.prototype = Object.create(Theorem.prototype);
MidpointSplittingTheorem.prototype.constructor = MidpointSplittingTheorem;

ReflexiveProperty.prototype.checkConditions = function(obj) {
	return true;
};

ReflexiveProperty.prototype.applyResults = function(obj) {
	congruences.add(obj, obj);
	this.result = this.name + " " + obj.toString() + " is congruent to itself.";
};

ReflexiveProperty.prototype.getInput = function() {
	return ['linesegs', this.inputSize];
};

module.exports = ReflexiveProperty;
