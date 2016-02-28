'use strict';

<<<<<<< HEAD
var Angle = function (ls1, ls2, cp) {
	this.lineSegments = [ls1, ls2];
	this.centralPoint = cp || function(ls1, ls2) {
		for (var point in ls1) {
			if (ls1[point] === ls2[0]) {
				return ls2[0];
			} else if (ls1[point] === ls2[1]) {
				return ls2[1];
			}
		}
	};
	this.findcp = function(ls1,ls2) {
		for (var point in ls1) {
			if (ls1[point] === ls2[0]){
				return ls2[0];
			} else if (ls1[point] === ls2[1]) {
				return ls2[1];
			}
		}
	};
	this.name = this.centralPoint.toString();
	this.toString = function() {
		return this.name;
	};
}

define(function() { return Angle; });
