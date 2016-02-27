'use strict';

var Point = require('./Objects/Point.js');
var Triangle = require('./Objects/Triangle.js');
var Congruence = require('./Properties/Congruence.js');
//var Correspoding =require('./Properties/Corresponding.js');
var TriangleCongruence = require('./Properties/TriangleCongruence.js');
var Theorem = require('./Theorems/Theorem.js');

var Triangle1 = new Triangle(new Point('A'), new Point('B'), new Point('C'));

console.log(Triangle1);

var Triangle2 = new Triangle(new Point('D'), new Point('E'), new Point('F'));

var congruences = new Congruence();

congruences.addCongruence(Triangle1.LineSegments[0],Triangle2.LineSegments[0]);
congruences.addCongruence(Triangle1.LineSegments[1],Triangle2.LineSegments[1]);
console.log(congruences);
congruences.addCongruence(Triangle1.LineSegments[2],Triangle2.LineSegments[2]);
console.log(congruences);
