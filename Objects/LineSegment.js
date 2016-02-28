'use strict';

/*
 * Constructor for LineSegment
 */
var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
}

define(['./Point'], function() { return LineSegment; });
