'use strict';

var Angle;

function AngleCongruence() {
	this.congruences = [];
	this.verticalAngles = function(angle1,angle2){
		this.pt1 = Angle.findcp(angle1.lineSegments[0],angle1.lineSegments[1]);
		this.pt2 = Angle.findcp(angle2.lineSegments[0],angle2.lineSegments[1]);
		if(pt1 === pt2){

			for(var i=0;i<2;i++){
				for(var j=0;j<2;j++){
					for(var k=0; k<lineSegments.length(); k++){
						if([angle1.lineSegments[i],angle2.lineSegments[j]] === lineSegments[k]){
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	this.sidecongruence = function(ls1,ls2,ls3,ls4){
		for(var i=0; i<2; i+=1){
			for(var i=0; i<2; i+=1){
				if(congruences.searchCongruence(pt,pt2)){
					return true;
				}
			}
		}
		return false;
	}
	this.addAngleCongruence = function(angle1,angle2){
		congruences.addCongruence(angle1,angle2);
		congruences.addCongruence(angle2,angle1);
	}
}

define(['../Objects/Angle'], function(a) {
	Angle = a;
	return AngleCongruence;
});
