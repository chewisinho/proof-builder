'use strict';

var Given = function(obj1, obj2) {
    this.obj1 = obj1;
    this.obj2 = obj2;
    this.relation = '';
}

Given.prototype.generate = function(relation) {
    this.relation = relation;
}

Given.prototype.toString = function() {
    return this.obj1.toString() + ' is ' + this.relation + ' to ' +
           this.obj2.toString();
}

define(function() { return Given; });
