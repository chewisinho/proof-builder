'use strict';
function Corresponding(obj1,obj2){
	this.correspondance = [];
	this.searchCorresponding = function(obj1,obj2){
		for(var corr in this.correspondace){
			if(corr[0] === obj1 && corr [1] === obj2){
				return true;
			} else if(corr[0] === obj2 && corr [1] === obj1){
				return true;
		}
		return false;
	};
	this.addCorrespondingObj = function(obj1,obj2){
		if(!this.search(obj1,obj2)){
			this.correspondace.push([obj1,ob2]);
		}
	};

	/*
	this.find = function(obj1){
		for(var corr in this.correspondace){
			if(corr[0] === obj1){
				return true; 
			}
		}
		return false;

	*/
}

module.exports = Corresponding;