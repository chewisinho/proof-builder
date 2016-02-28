'use strict';

var Given = function(obj1, obj2) {
    this.obj1 = obj1;
    this.obj2 = obj2;
    this.relation = '';
};

Given.prototype.generate = function(relation) {
    this.relation = relation;
};

Given.prototype.toString = function() {
    return this.obj1.toString() + ' is ' + this.relation + ' to ' +
           this.obj2.toString() + '.';
};

function TriangleGiven(triangle) {
	this.triangle = triangle;
	this.toString = function() {
		return this.triangle.toString() + ".";
	};
};

function MidpointGiven(segment, midpoint) {
	this.segment = segment;
	this.midpoint = midpoint;
	this.toString = function() {
		return this.midpoint.toString() + " is the midpoint of "
			+ this.segment.toString() + ".";
	};
};

define(function() { return {
	given: Given,
	trigiven: TriangleGiven,
	mdpgiven: MidpointGiven
}; });
