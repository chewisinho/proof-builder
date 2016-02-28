'use strict';

/*
 * Constructor for a GraphicLineSegment
 * pt1 - a GraphicPoint reference
 * pt2 - a GraphicPoint reference
 */
var GraphicLineSegment = function(pt1, pt2) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.x = pt1.x;
    this.y = pt1.y;
    this.pointoffx = this.pt2.x - this.pt1.x;
    this.pointoffy = this.pt2.y - this.pt1.y;

    this.thickness = 5;
    this.highlight = false;
}

GraphicLineSegment.prototype.contains = function(mx, my) {
    var linept = nearestLinePoint(this.pt1, this.pt2, mx, my);
    return (linept.x - mx) * (linept.x - mx) +
           (linept.y - my) * (linept.y - my) < this.thickness;
}

GraphicLineSegment.prototype.draw = function(ctx) {
    // draw the highlight
    if (this.highlight) {
        ctx.strokeStyle = '#AA0000';
        ctx.lineWidth = this.thickness + 2;
        ctx.beginPath();
        ctx.moveTo(this.pt1.x, this.pt1.y);
        ctx.lineTo(this.pt2.x, this.pt2.y);
        ctx.closePath();
        ctx.stroke();
    }

    // draw the points
    //this.pt1.draw(ctx);
    //this.pt2.draw(ctx);

    // draw the line
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.pt1.x, this.pt1.y);
    ctx.lineTo(this.pt2.x, this.pt2.y);
    ctx.closePath();
    ctx.stroke();
}

GraphicLineSegment.prototype.moveTo = function(x, y) {
    this.pointoffx = this.pt2.x - this.pt1.x;
    this.pointoffy = this.pt2.y - this.pt1.y;
    this.x = x;
    this.y = y;

    this.pt1.moveTo(x, y);
    this.pt2.moveTo(this.pt1.x + this.pointoffx,
                    this.pt1.y + this.pointoffy);
}

GraphicLineSegment.prototype.select = function() {
    this.highlight = true;
}

GraphicLineSegment.prototype.deselect = function() {
    this.highlight = false;
}

// honestly this is so cryptic i don't even know...
function nearestLinePoint(lp1, lp2, x, y) {
    var lerp=function(a,b,x){ return(a+x*(b-a)); };
    var dx = lp2.x - lp1.x;
    var dy = lp2.y - lp1.y;
    var t = ((x-lp1.x)*dx+(y-lp1.y)*dy)/(dx*dx+dy*dy);
    var lineX=lerp(lp1.x, lp2.x, t);
    var lineY=lerp(lp1.y, lp2.y, t);
    return({x:lineX,y:lineY});
};

define(function() { return GraphicLineSegment; });
