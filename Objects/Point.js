'use strict';

var Point = function(name) {
    this.name = name;
    this.getname = function(){
    	return this.name;
    }
}

define(function() { return Point; });
