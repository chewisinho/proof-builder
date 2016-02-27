'use strict';

/*
 * Constructor for a GraphicPoint
 * x - the x coord
 * y - the y coord
 * pt - the reference to a Point this GraphicPoint will represent
 */
var GraphicPoint = function(x, y, pt) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = 3;
    this.name = pt.name || 'null';
}

GraphicPoint.prototype.contains = function(mx, my) {
    return (this.x - this.radius <= mx) && (this.x + this.radius >= mx) &&
           (this.y - this.radius <= my) && (this.y + this.radius >= my);
}

GraphicPoint.prototype.draw = function(ctx) {
    // draw the point
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    // draw the name
    ctx.font = '20px sans-serif'
    ctx.fillText(this.name, this.x + 5, this.y + 5);
}

define(function() {return GraphicPoint;});
