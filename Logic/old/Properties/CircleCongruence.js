'use strict';

var CircleCongruence = function(){
	this.addCircleCongruence = function(){
		congruences.addCongruence(c1,c2);
		congruences.addCongruence(c2,c1);
	}
	this.raduisCongruence = function(ls1,ls2){
		if(congruences.searchCongruence(ls1,ls2)){
			return true;
		} else{
			return false;
		}
	}
}