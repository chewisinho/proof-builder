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
var Angle, LineSegment, Point, Theorem, Triangle, TriangleCongruence;
var congruences, givens, lineSegments, points, triangles, angles,
    triangleCongruences;
var lineSegmentEquals, createLineSegment, case_insensitive_comp, createAngle,
    createTriangle, createPoint;
var midpointSplittingTheorem, reflexiveProperty, SSSPostulate;
var theoremList;

// Import
require(['Objects/Point', 'Objects/Angle', 'Properties/TriangleCongruence'],
    function(p, a, t, g) {
    Point = p;
    Angle = a;
    TriangleCongruence = t;

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

                givens = s.giv;
                points = s.pts;
                lineSegments = s.lsgs;
                triangles = s.tris;
                congruences = s.congrs;
                angles = s.an;
                triangleCongruences = s.tricon;

                lineSegmentEquals = s.lse;
                createLineSegment = s.addl;
                case_insensitive_comp = s.csc;
                createAngle = s.ca;
                createTriangle = s.ct;
                createPoint = s.cp;

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
    givens.push(new TriangleGiven(trABD));
    var trCBD = createTriangle(C, B, D);
    givens.push(new TriangleGiven(trCBD));
    var AD = createLineSegment(A, D);
    var CD = createLineSegment(C, D);
    congruences.addCongruence(AD, CD);
    var startCong = new Given(AD, CD);
    startCong.generate('congruent');
    givens.push(startCong);
    var AC = createLineSegment(A, C)
    AC.midpoint = B;
    givens.push(new MidpointGiven(AC, B));

    loadTheorems();
}
