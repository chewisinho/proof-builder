'use strict';

var Polygon = require("./Polygon");

var Triangle = function() {
	Polygon.apply(this, arguments); // super(arguments);
	this.type = "Triangle";
};

Triangle.prototype = Object.create(Polygon.prototype);
Triangle.prototype.constructor = Triangle;

module.exports = Triangle;
