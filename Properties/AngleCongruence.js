'use strict';
var AngleCongruence = function(){
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