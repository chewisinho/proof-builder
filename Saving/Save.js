/**
 * Save object.
 * title (String) - Name of the title.
 * objects (ObjectDB) - database of all objects used in proof
 * givens (ProofState) - state object of the start of the proof
 * steps ([String]) - steps taken toward goal
 * goals (ProofState) - state object of the desired end of the proof
 * img (String) - [TEMPORARY] path to the an image of the proof problem
 */
var Save = function(title, objects, givens, steps, goals, img) {
	this.title = title;
	this.objects = objects;
	this.givens = givens;
	this.steps = steps;
	this.goals = goals;
    this.img = img;
    
    this.toString = function() { return this.title; };
}

module.exports = Save;
