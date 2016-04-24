'use strict';
// TODO - modify

var Circle = function (x,y,r,n){
	this.raduis = r || R;
	this.Center = [x,y] || [0,0];
	this.name = n || '';
	this.toString = function(){
		return this.name;
	}
}

module.exports = Circle;
