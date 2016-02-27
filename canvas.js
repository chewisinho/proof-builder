const WIDTH_PROPORTION = 0.7;   // proportions of canvas to the window frame
const HEIGHT_PROPORTION = 0.95;

var state;

// set size of canvas to fill frame
var canvas = sel("canvas");
fitCanvas();
window.onresize = function() {
    fitCanvas();
    state.fit();
    //state.width = canvas.width;
    //state.height = canvas.height;
    state.valid = false;
};

function fitCanvas() {
    canvas.width = window.innerWidth * WIDTH_PROPORTION;
    canvas.height = window.innerHeight * HEIGHT_PROPORTION;
}

// load graphic types
var CanvasState, GraphicPoint, Point;
require(
    ['CanvasState', 'GraphicPoint', './Objects/Point'], function
    (cs, gp, p) {
    CanvasState = cs;
    GraphicPoint = gp;
    console.log(p);
    Point = p;

    // callback main
    main();
});

/*
var GraphicLineSegment;
require(['GraphicLineSegment'], function(mod) {
    GraphicLineSegment = mod;
});

var GraphicTriangle;
require(['GraphicTriangle'], function(mod) {
    GraphicTriangle = mod;
});
*/


// BEGIN PROOF BUILDER IMPLEMENTATION
function main() {
    state = new CanvasState(canvas);
    state.addShape(new GraphicPoint(40, 40, new Point("A")));
}
