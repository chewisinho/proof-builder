'use strict';

/*
 * Constructor for LineSegment
 */
var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
    this.name = start.getname() + start.getname();
    this.getname = function(){
    	return name;
    }
}

define(['./Point'], function() { return LineSegment; });
