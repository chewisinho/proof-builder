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
