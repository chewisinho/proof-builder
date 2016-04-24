'use strict';

var Angle = function (ls1, ls2, cp) {
	this.lineSegments = [ls1, ls2];
	this.centralPoint = cp;
	this.findcp = function(ls1, ls2) {
		ls1 = ls1.toString();
		ls2 = ls2.toString();
		if ((ls1[0] === ls2[0]) || (ls1[0] === ls2[1])) {
			this.centralPoint = ls1[0];
			return ls1[0];
		} else {
			this.centralPoint = ls1[1];
			return ls1[1];
		};
	};

	var cp = this.centralPoint.toString();
	var ls1 = ls1.toString();
	var ls2 = ls2.toString();

	this.name = (cp === ls1[0] ? ls1[1] : ls1[0]) + cp + (cp === ls2[0] ? ls2[1] : ls2[0]);
	this.toString = function() {
		return "Angle " + this.name;
	};
};

define(function() { return Angle; });
