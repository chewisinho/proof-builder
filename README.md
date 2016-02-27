# Proof Builder
Project for HackTech 2016.

## Points

A `Point` is a geometrical point defined by a single letter.

```
Point(Object):

    char name
```

## Line Segments

A `LineSegment` is defined by two `Point` objects.

```
LineSegment(Object):

    Point start
    Point end

    # Initially null.
    Point midpoint
```

## Triangles

A `Triangle` is an object with three `Point` objects.

```
Triangle(Object)

	Point point_1
	Point point_2
	Point point_3

	LineSegment side_1
	LineSegment side_2
	LineSegment side_3
```

## Congruence

A `Congruence` is an equality relationship between two other objects.

```
Congruence:

    Object object_1
    Object object_2
```

## Theorems

A `Theorem` applies its method to objects that satisfy the conditions.

```
Theorem:

    # Returns true iff OBJS satisfy the conditions.
    boolean checkCondition(Object... objs)

    # Applies the result of the theorem to OBJS.
    void applyResult(Object... objs)
```

**Reflexive Property**
  * Objects: `LineSegment`
  * Conditions:
    * None
  * Results;
    * Creates a `Congruence` with `obj` and `obj`

**Midpoint Splitting Theorem**
  * Objects: `LineSegment`
  * Conditions:
    * `obj.midpoint` is not `null`
  * Results:
    * creates a `Line Segment` with `obj.start` and `obj.midpoint`
    * creates a `Line Segment` with `obj.midpoint` and `obj.end`
    * creates a `Congruence` with the two `LineSegment` objects

**SSS Postulate**
  * Objects: `Triangle`, `Triangle`
  * Conditions:
    * for every `side1` of `obj1`, there is a `side2` of `obj2` such that there is a `Congruence` object with `side1` and `side2`
  * Results:
    * creates a `Congruence` with the two `Triangle` objects
