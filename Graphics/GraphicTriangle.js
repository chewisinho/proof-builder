'use strict';

/*
 * Constructor for a GraphicTriangle
 * pt1 - a GraphicPoint reference
 * pt2 - a GraphicPoint reference
 * pt3 - a GraphicPoint reference
 */
var GraphicLineSegment = function(pt1, pt2, pt3) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.pt3 = pt3;
    this.s1 = new GraphicLineSegment(pt1, pt2);
    this.s2 = new GraphicLineSegment(pt2, pt3);
    this.s3 = new GraphicLineSegment(pt3, pt1);

    this.thickness = 4;
    this.highlight = false;
}

GraphicLineSegment.prototype.contains = function(mx, my) {
    return s1.contains(mx, my) || s2.contains(mx, my) || s3.contains(mx, my);
}

GraphicLineSegment.prototype.draw = function(ctx) {
    // draw the highlight
    if (this.highlight) {

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

GraphicLineSegment.prototype.select = function() {
    this.highlight = true;
}

GraphicLineSegment.prototype.deselect = function() {
    this.highlight = false;
}

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


