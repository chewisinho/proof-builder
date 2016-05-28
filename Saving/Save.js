/**
 * Save object.
 * objects (ObjectDB) - database of all objects used in proof
 * givens (ProofState) - state object of the start of the proof
 * steps ([String]) - steps taken toward goal
 * goals (ProofState) - state object of the desired end of the proof
 */
var Save = function(name, objects, givens, steps, goals) {
	this.name = name;
	this.objects = objects;
	this.givens = givens;
	this.steps = steps;
	this.goals = goals;
}

module.exports = Save;
