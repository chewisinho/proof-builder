
var ObjectDB = function() {
	this.objects = {
		Point: [],
		LineSegment: [],
		Angle: [],
		Triangle: []
	};
};

ObjectDB.prototype.create = function(obj) {
	// prevent duplicate elements
	var group = this.objects[obj.type];
	if (group === undefined) {
		console.error("Type " + obj.type + " not supported by ObjectDB!");
		return obj;
	}

	for (var i = 0; i < group.length; i++) {
		if (obj.equals(group[i]))
			return group[i]; // return original
	}

	// if no duplicates, add to database
	this.objects[obj.type].push(obj);
	return obj;
};

ObjectDB.prototype.get = function(obj) {
	var group = this.objects[obj.type];
	if (group === undefined) {
		console.error("Type " + obj.type + " not supported by ObjectDB!");
		return undefined;
	}

	for (var i = 0; i < group.length; i++) {
		if (obj.equals(group[i]))
			return group[i]; // return original
	}

	return null;
};

module.exports = ObjectDB;
