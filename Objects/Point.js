'use strict';

var Point = function(name) {
    this.name = name;
    this.toString = function() {
    	return this.name;
    };
}

define(function() { return Point; });
