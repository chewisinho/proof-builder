const WIDTH_PROPORTION = 0.7;   // Proportions of canvas to the window frame
const HEIGHT_PROPORTION = 0.40;

// gets element by id/class
function sel(s) {
    return document.querySelector(s);
}

var state; // The canvas state

// Set size of canvas to fill frame
var canvas = sel("canvas");
fitCanvas();
window.onresize = function() {
    fitCanvas();
    if (state) {
        state.fit();
        state.valid = false;
        // state.width = canvas.width;
        // state.height = canvas.height;
    }
};

function fitCanvas() {
    canvas.width = window.innerWidth * WIDTH_PROPORTION;
    canvas.height = window.innerHeight * HEIGHT_PROPORTION;
}

// Types
var CanvasState, GraphicLineSegment, GraphicPoint;
var Angle, LineSegment, Point, Theorem, Triangle;
var congruences, lineSegments, points, triangles;
var createLineSegment;
var midpointSplittingTheorem, reflexiveProperty, SSSPostulate;
var theoremList;

// Import
require(['Objects/Point', 'Objects/Angle'], function(p, a) {
    Point = p;
    Angle = a;

    require(['Objects/LineSegment', 'Objects/Triangle', 'Properties/Congruence'],
        function(ls, tr, cong) {
        LineSegment = ls;
        Triangle = tr;
        Congruence = cong;

        require(['CanvasState.js', 'GraphicPoint.js', 'GraphicLineSegment.js'],
            function(cs, gp, gls) {
            CanvasState = cs;
            GraphicPoint = gp;
            GraphicLineSegment = gls;

            require(['Theorems/Theorem.js'], function(s) {
                Theorem = s.Thm;

                points = s.pts;
                lineSegments = s.lsgs;
                triangles = s.tris;
                congruences = s.congrs;

                createLineSegment = s.addl;

                reflexiveProperty = s.reflP;
                midpointSplittingTheorem = s.mst;
                SSSPostulate = s.sss;

                theoremList = [midpointSplittingTheorem, reflexiveProperty, SSSPostulate];
                main();
            });
        });
    });
});


function main() {
    state = new CanvasState(canvas);
    // var A = new GraphicPoint(40, 40, new Point("A"));
    // var B = new GraphicPoint(200, 40, new Point("B"));
    // state.addShape(new GraphicLineSegment(A, B));
    // state.addShape(A);
    // state.addShape(B);

    // BEGIN PROOF IMPLEMENTATION TESTING

    // GIVEN INFORMATION
    var A = createPoint('A');
    var B = createPoint('B');
    var C = createPoint('C');
    var D = createPoint('D');
    var trABD = createTriangle(A, B, D);
    var trCBD = createTriangle(C, B, D);
    var AC = createLineSegment(A, C)
    AC.midpoint = B;

    loadTheorems();
}
