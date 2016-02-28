'use strict';
var AngleCongruence = function(){
	this.cpcongruence = function(p1,p2){
		if(congruences.searchCongruence(p1,p2)){
			return true;
		}else{
			return false;
		}
	}
	this.sidecongruence = function(ls1,ls2){
		for(var pt in ls1){
			for(var pt2 in ls2){
				if(congruences.searchCongruence(pt,pt2)){
					return true;
				}
			}
		}
		return false;
	}
	this.addAngleCongruence = function(angle1,angle2){
		congruences.addCongruece(angle1,angle2);
		congruences.addCongruece(angle2,angle1);
	}
}