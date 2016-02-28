'use strict';

var Angle = function (ls1,ls2,cp){
	this.lineSegments = new [ls1,ls2];
	this.centralPoint = cp || function(){
		for(var point in ls1){
			if(ls1[point]===ls2[0]){
				return ls2[0];
			} else if(ls1[point]===ls2[1]){
				return ls2[1];
			}
		}
	}
}
