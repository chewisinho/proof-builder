"""An arbitrary element of a set."""
class Element:

    def __init__(self, name, parentSet, parentSets):
        self.name = name
        self.parentSet = parentSet
        self.parentSets = parentSets

    def __repr__(self):
        return "arbitrary element %s of %s" % (self.name, self.parentSet)


"""A mathematical set."""
class MathSet(object):

    setOfAllSets = set() # Violates Russell's Paradox
    counter = 0 #

    def __init__(self, name):
        self.name = name
        MathSet.setOfAllSets.add(self)
        self.superSets = set()
        self.superSets.add(self)

    def addContain(self, parentSet):
        self.superSets.add(parentSet)

    def generateArbitraryElement(self, name='x', auto=False):
        if auto:
            elem = Element('x' + str(MathSet.counter), self, self.superSets)
            MathSet.counter += 1
        else:
            elem = Element(name, self, self.superSets)
        return elem

    def generateActions(self, elements):
        return [GenerateElementAction(self, elements)]

    def __repr__(self):
        return self.name


"""The intersection of two sets."""
class IntersectionSet(MathSet):

    def __init__(self, name, set1, set2):
        MathSet.__init__(self, name)
        self.set1 = set1
        self.set2 = set2
        MathSet.setOfAllSets.add(self)

    def applyIntersection(self, element):
        if self in element.parentSets:
            element.parentSets.add(self.set1)
            element.parentSets.add(self.set2)

    def generateActions(self, elements):
        actions = super(IntersectionSet, self).generateActions(elements)
        for index in range(len(elements)):
            element = elements[index]
            if self in element.parentSets:
                actions.append(ApplyIntersectionAction(self, elements, index))
        return actions

    def __repr__(self):
        return "(%s INTERSECT %s)" % (self.set1, self.set2)


class Action:

    def __init__(self, parentSet, elements):
        self.parentSet = parentSet
        self.elements = elements


class GenerateElementAction(Action):

    priority = 0

    def applyAction(self):
        self.element = self.parentSet.generateArbitraryElement('x', True)
        return self.elements + [self.element]

    def __repr__(self):
        return "Let %s be an arbitrary element of %s." % (self.element, self.parentSet)


class ApplyIntersectionAction(Action):

    priority = 10

    def __init__(self, parentSet, elements, elementIndex):
        self.parentSet = parentSet
        self.elements = elements
        self.elementIndex =  elementIndex

    def applyAction(self):
        newElements = list(self.elements)
        oldElement = self.elements[self.elementIndex]
        newElement = Element(oldElement.name, oldElement.parentSet, oldElement.parentSets)
        self.parentSet.applyIntersection(newElement)
        newElements[self.elementIndex] = newElement
        return newElements

    def __repr__(self):
        return "Since %s is in %s, then %s is in %s and %s." % (self.elements, self.parentSet, self.elements, self.parentSet.set1, self.parentSet.set2)


class ProofState:

    def __init__(self, sets, elements):
        self.sets = sets
        self.elements = elements

    @property
    def value(self):
        st = ""
        for s in sets:
            st += repr(s)
        for e in self.elements:
            st += repr(e)
        return hash(st)

    def __eq__(self, other):
        return self.value == other.value

    def __repr__(self):
        return "SETS: %s, ELEMENTS: %s" % (self.sets, self.elements)


class GenerateProof:

    def __init__(self, state, condition):
        self.state = state
        self.condition = condition

    def getSuccessors(self, state):
        actions = []
        for s in state.sets:
            actions.extend(s.generateActions(state.elements))
        successors = []
        for action in actions:
            sets = state.sets
            elements = action.applyAction()
            successors.append((ProofState(sets, elements), action))
        return successors

    def findProof(self):
        depth = 0
        state = self.state
        fringe = [(state, [])]
        print "Searching for proof..."
        while fringe:
            # actions = []
            # for s in self.state.sets:
            #     actions.extend(s.generateActions(self.state.elements))
            # nextAction = max(actions, key=lambda action: action.priority)
            # nextAction.applyAction()
            state, path = fringe.pop()
            if self.condition(state):
                return self.printProof(path)
            for child, action in self.getSuccessors(state):
                fringe.append((child, path + [action]))
            if depth > 5:
                print "Maximum depth limit exceeded! No proof found."
                return

    def printProof(self, actions):
        print "Start state of proof:"
        print self.state
        for action in actions:
            print action
        print "QED."

if __name__ == "__main__":
    A = MathSet('A')
    B = MathSet('B')
    intersect = IntersectionSet('', A, B)
    startState = ProofState([A, B, intersect], [])
    condition = lambda state: state.sets[0] in state.sets[2].superSets
    proof = GenerateProof(startState, condition)
#    proof.findProof()
