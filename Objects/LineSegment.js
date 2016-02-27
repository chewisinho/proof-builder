'use strict';

/*
 * Requires
 */
var Point = require('./Point.js');

/*
 * Mix-in for LineSegment
 */
var asLineSegment = function() {
    this.start = new Point();
    this.end = new Point();
    return this;
}

/*
 * Constructor for LineSegment
 */
var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
}

asLineSegment.call(LineSegment.prototype); // apply mix-in
