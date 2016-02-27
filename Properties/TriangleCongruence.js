'use strict';
var Congruence = require('./Congruence.js');

var TriangleCongruence = function(tri1, tri2){
		Congruence.addCongruence(tri1,tri2);
		Congruence.addCongruence(tri2,tri1);
	};

module.exports = TriangleCongruence;