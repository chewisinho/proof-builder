'use strict';

/*
 * Mix-in for a Point
 */
var asPoint = function() {
    this.name = null;
    return this;
}

/*
 * Constructor for a Point
 */
var Point = function(name = 'A') {
    this.name = name;
}

asPoint.call(Point.prototype); // apply mix-in
