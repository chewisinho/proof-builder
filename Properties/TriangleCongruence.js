'use strict';

var TriangleCongruence = function(tri1, tri2){
	this.addTriangleCongruence = function(tri1,tri2){
		Congruence.addCongruence(tri1,tri2);
		Congruence.addCongruence(tri2,tri1);
	}
};

define(['./Congruence'], function() {
	return TriangleCongruence;
});
