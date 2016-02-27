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

// types
var Point, LineSegment;
var CanvasState, GraphicPoint, GraphicLineSegment;

// import
require(['Objects/Point','Objects/LineSegment'],
    function(p, ls) {
    Point = p;
    LineSegment = ls;

require(['CanvasState', 'GraphicPoint', 'GraphicLineSegment'],
    function(cs, gp, gls) {
    CanvasState = cs;
    GraphicPoint = gp;
    GraphicLineSegment = gls;

    main();
});
});

// BEGIN PROOF BUILDER IMPLEMENTATION
function main() {
    state = new CanvasState(canvas);
    var A = new GraphicPoint(40, 40, new Point("A"));
    var B = new GraphicPoint(200, 40, new Point("B"));
    state.addShape(new GraphicLineSegment(A, B));
    state.addShape(A);
    state.addShape(B);
}
