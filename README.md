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
Triangle(Object):

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

```
TriangleCongruence(Congruence):

    Triangle tr_1
    Triangle tr_2

    # Sides of each triangle such that corresponding indices indicate congruence.
    Array tr_1_sides
    Array tr_2_sides
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

## Starter Theorems

**Reflexive Property**
  * Objects: `LineSegment l`
  * Conditions:
    * None
  * Results:
    * Creates `Congruence(l, l)`

**Midpoint Splitting Theorem**
  * Objects: `LineSegment`
  * Conditions:
    * `obj.midpoint` is not `null`
  * Results:
    * Creates `l1 = LineSegment(obj.start, obj.midpoint)`
    * Creates `l2 = LineSegment(obj.midpoint, obj.end)`
    * Creates `Congruence(l1, l2)`

**SSS Postulate**
  * Objects: `Triangle tr1`, `Triangle tr2`
  * Conditions:
    * For every `side1` of `tr1`, there exists a `side2` of `tr2` such that there exists `Congruence(side1, side2)`
  * Results:
    * Creates `TriangleCongruence(tr1, tr2)` with the corresponding sides

## Proving Theorems

**Exercise 1: SSS**
  * Given: `Triangle ABD`, `Triangle CBD`, `AC.midpoint = B`
  * Goal: `Congruence(ABD, CBD)`
