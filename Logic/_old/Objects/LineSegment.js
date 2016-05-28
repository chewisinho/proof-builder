'use strict';

/*
 * Constructor for LineSegment
 */
var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
    this.name = start.toString() + end.toString();
    this.toString = function() {
    	return this.name;
    };
}

define(function() { return LineSegment; });
