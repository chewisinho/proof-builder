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
    this.radius = 5;
    this.name = pt.name || 'null';
    this.highlight = false;
}

GraphicPoint.prototype.contains = function(mx, my) {
    return (this.x - this.radius <= mx) && (this.x + this.radius >= mx) &&
           (this.y - this.radius <= my) && (this.y + this.radius >= my);
}

GraphicPoint.prototype.draw = function(ctx) {
    // draw the highlight
    if (this.highlight) {
        ctx.fillStyle = '#AA0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    // return to black
    ctx.fillStyle = '#000000';

    // draw the point
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    // draw the name
    ctx.font = '20px sans-serif'
    ctx.fillText(this.name, this.x + 5, this.y + 5);
}

GraphicPoint.prototype.moveTo = function(x, y) {
    this.x = x;
    this.y = y;
}

GraphicPoint.prototype.select = function() {
    this.highlight = true;
}

GraphicPoint.prototype.deselect = function() {
    this.highlight = false;
}

define(function() {return GraphicPoint;});
