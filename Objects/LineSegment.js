'use strict';

var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
    this.toString = function() {
    	return this.start.toString() + this.end.toString();
    };
}

define(['./Point'], function() { return LineSegment; });
