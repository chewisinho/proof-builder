'use strict';

/*
 * Requires
 */
var Point = require('./Point.js');

/*
 * Constructor for LineSegment
 */
var LineSegment = function(start, end) {
    this.start = start;
    this.end = end;
}

module.exports = LineSegment;
