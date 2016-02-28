var Save = function(givens, goals, steps, points, lineSegments,
                    angles, triangles, congruences, triangleCongruences) {
    this.givens = givens;
    this.goals = goals;
    this.steps = steps;
    this.points = points;
    this.lineSegments = lineSegments;
    this.angles = angles;
    this.triangles = triangles;
    this.congruences = congruences;
    this.triangleCongruences = triangleCongruences;
}

define(function() { return Save; });
