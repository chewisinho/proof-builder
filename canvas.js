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
var addLineSegment;
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

                addLineSegment = s.addl;

                reflexiveProperty = s.reflP;
                midpointSplittingTheorem = s.mst;
                SSSPostulate = s.sss;

                theoremList = [midpointSplittingTheorem, reflexiveProperty, SSSPostulate];
                main();
            });
        });
    });
});

function createTriangle(p1, p2, p3) {
    var tr = new Triangle(p1, p2, p3);
    tr.lineSegments = [addLineSegment(p1, p2), addLineSegment(p2, p3), addLineSegment(p2, p3)];
    tr.angles.push(new Angle(tr.lineSegments[0], tr.lineSegments[1]), tr.P2);
    tr.angles.push(new Angle(tr.lineSegments[1], tr.lineSegments[2]), tr.P3);
    tr.angles.push(new Angle(tr.lineSegments[2], tr.lineSegments[0]), tr.P1);
    return tr;
}

function createPoint(P1){
    for(int i=0; i<points.length;i++){
        if(P1 === points[i].toString()){
                return points[i];
        } else{
             var pt = new Point(P1);
             points.push(pt);
             return  pt;
        }
    }
}

function createLineSegment(p1,p2) {
    var name = p1+p2, name2 = p2+p1;
    for(int i=0; i<lineSegments.length;i++) {
        if(name === lineSegments[i].toString() || name2 === lineSegments[i].toString()){
            return lineSegments[i];
        } else{
            var lS = new LineSegment(p1.p2);
            lineSegments.push(lS);
            return lS;
        }
    }
}

// BEGIN PROOF BUILDER IMPLEMENTATION
function main() {
    state = new CanvasState(canvas);
    // var A = new GraphicPoint(40, 40, new Point("A"));
    // var B = new GraphicPoint(200, 40, new Point("B"));
    // state.addShape(new GraphicLineSegment(A, B));
    // state.addShape(A);
    // state.addShape(B);

    // BEGIN PROOF IMPLEMENTATION TESTING

    // GIVEN INFORMATION
    var A = new Point('A');
    var B = new Point('B');
    var C = new Point('C');
    var D = new Point('D');
    var trABD = createTriangle(A, B, D);
    var trCBD = createTriangle(C, B, D);
    var AC = addLineSegment(A, C)
    AC.midpoint = B;

    loadTheorems();
}
