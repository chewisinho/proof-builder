'use strict';

/*
 * Constructor for a GraphicLineSegment
 * line - the reference to the LineSegment this GraphicLineSegment represents
 */
var GraphicLineSegment = function(line) {
    this.pt1 = new GraphicPoint(line.start);
    this.pt2 = new GraphicPoint(line.end);
    this.thickness = 2;
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
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.closePath();
        ctx.stroke();
    }

    // draw the points
    pt1.draw(ctx);
    pt2.draw(ctx);

    // draw the line
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.closePath();
    ctx.stroke();
}

function nearestLinePoint(lp1, lp2, x, y) {
    var lerp=function(a,b,x){ return(a+x*(b-a)); };
    var dx = line.x1 - line.x0;
    var dy = line.y1 - line.y0;
    var t = ((x-lp1.x)*dx+(y-lp1.y)*dy)/(dx*dx+dy*dy);
    var lineX=lerp(lp1.x, lp2.x, t);
    var lineY=lerp(lp1.y, lp2.y, t);
    return({x:lineX,y:lineY});
};


