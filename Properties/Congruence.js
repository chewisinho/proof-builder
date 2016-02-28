'use strict';

function Congruence() {
	this.congruences = [];
	this.searchCongruences = function(obj1, obj2) {
		for (var cong in this.congruences) {
			if ((cong[0] === obj1 && cong[1] === obj2) ||
				(cong[0] === obj2 && cong[1] === obj1)) {
				return true;
			}
		}
		return false;
	};
	this.addCongruence = function(obj1, obj2) {
		if (!this.searchCongruences(obj1, obj2)) {
			this.congruences.push([obj1, obj2]);
		}
	};
}

define(function () { return Congruence; });
