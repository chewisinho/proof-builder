'use strict';

function Congruence() {
	this.congruences = [];
	this.searchCongruences = function(obj1, obj2) {
		for (var c = 0; c < this.congruences.length; c += 1) {
			var cong = this.congruences[c];
			if ((cong[0] === obj1 && cong[1] === obj2) ||
				(cong[0] === obj2 && cong[1] === obj1)) {
				return true;
			};
		};
		return false;
	};
	this.addCongruence = function(obj1, obj2) {
		if (!this.searchCongruences(obj1, obj2)) {
			this.congruences.push([obj1, obj2]);
		};
	};
};

define(function () { return Congruence; });
