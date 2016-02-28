'use strict';

var TriangleCongruence = function(tri1, tri2) {

	this.addSSSCongruence = function(tri1, tri2, sides1, sides2) {
		if (!this.searchCongruences(obj1, obj2)) {
			this.congruences.push([tri1, tri2, sides1, sides2, 'SSS']);
		};
	};

};

TriangleCongruence.prototype = Congruence;

define(['./Congruence'], function() {
	return TriangleCongruence;
});
