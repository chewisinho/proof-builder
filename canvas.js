const WIDTH_PROPORTION = 0.7;   // proportions of canvas to the window frame
const HEIGHT_PROPORTION = 0.95;

var state; // the canvas state

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
require(['Objects/Point'], function(p) {
    Point = p;

require(['Objects/LineSegment'],
    function(ls) {
    LineSegment = ls;

require(['CanvasState', 'GraphicPoint', 'GraphicLineSegment'],
    function(cs, gp, gls) {
    CanvasState = cs;
    GraphicPoint = gp;
    GraphicLineSegment = gls;

var Theorem, points, linesegments, triangles, congruences,
    addLineSegment, reflexivePropertyConditions, reflexivePropertyResults,
    reflexiveProperty, midpointSplittingTheoremConditions, midpointSplittingTheoremResults,
    midpointSplittingTheorem, SSSPostulateConditions, SSSPostulateResults,
    SSSPostulate;
require(['Properties/Congruence','Theorems/Theorem'],
    function(Cong, Thm, pts, lsgs, tris, congrs, addl,
             reflC, reflR, reflP,
             mstC, mstR, mst,
             sssC, sssR, sss) {
    Congruence = Cong;
    Theorem = Thm;
    points = pts;
    linesegments = lsgs;
    triangles = tris;
    congruences = congrs;
    addLineSegment = addl;
    reflexivePropertyConditions = reflC;
    reflexivePropertyResults = reflR;
    reflexiveProperty = reflP;
    midpointSplittingTheoremConditions = mstC;
    midpointSplittingTheoremResults = mstR;
    midpointSplittingTheorem = mst;
    SSSPostulateConditions = sssC;
    SSSPostulateResults = sssR;
    SSSPostulate = sss;

    main();
});
});
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

    // BEGIN PROOF IMPLEMENTATION TESTING
    /*
    // GIVEN INFORMATION
    var A = new Point('A');
    var B = new Point('B');
    var C = new Point('C');
    var D = new Point('D');
    var trABD = new Triangle(A, B, D);
    var trCBD = new Triangle(C, B, D);
    console.log(trABC);
    console.log(trCBD);
    var AC = addLineSegment(A, C)
    AC.midpoint = B;
    console.log(AC);
    console.log(AC.midpoint);
    */
}
