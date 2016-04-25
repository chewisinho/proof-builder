var Save = require('../Saving/Save');
var geo = require('../Logic/Objects/Geometry');
var ObjectDB = require('../Logic/Objects/ObjectDB');
var ProofState = require('../Logic/Properties/ProofState');

var objects = new ObjectDB();
var A = objects.create(new geo.Point('A'));
var B = objects.create(new geo.Point('B'));
var C = objects.create(new geo.Point('C'));
var D = objects.create(new geo.Point('D'));

var sgAC = objects.create(new geo.LineSegment(A, C));
var sgAD = objects.create(new geo.LineSegment(A, D));
var sgBC = objects.create(new geo.LineSegment(B, C));
var sgCD = objects.create(new geo.LineSegment(C, D));

var trABD = objects.create(new geo.Triangle(A, B, D));
var trCBD = objects.create(new geo.Triangle(C, B, D));

var givenState = new ProofState();
givenState.add('midpoint', [B, sgAC]);
givenState.add('congruence', [sgAD, sgCD]);

var goalState = new ProofState();
goalState.add('congruence', [trABD, trCBD]);

var Exercise1 = new Save('Exercise 1', objects, givenState, [], goalState);
module.exports = Exercise1;
