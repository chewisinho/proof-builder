'use strict';

var Point = require('./Objects/Point.js');
var Triangle = require('./Objects/Triangle.js');

var Triangle1 = new Triangle(new Point('A'), new Point('B'), new Point('C'));

console.log(Triangle1);
