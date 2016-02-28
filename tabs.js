/*
 * Code for loading the left-side theorems pane -- specifically
 * the tabs and appending new theorems in the list of given
 * theorems..
 */

var selectedThm = null; // the currently selected theorem (DOM element)
var box = null; // the selection box

/*
 * Loads the theorems into the theorem sidebar
 */
function loadTheorems() {
    for (var i = 0; i < theoremList.length; i++) {
        addTheorem(theoremList[i]);
    };
    refreshGivens();
};

// for adding a theorem to the 'current theorems' tab
function addTheorem(thm) {
    var currThms = sel("#curr-theorems-content");
    var newThm = document.createElement("div");

    // pass in theorem info
    newThm.innerHTML = thm.shortName;

    // change the selected theorem to the one clicked
    newThm.onclick = function() {
        // reset selected divs
        if (selectedThm) sel("#sel-thm").id = "";

        // apply selected div id to the one clicked on
        selectedThm = newThm.innerHTML;
        newThm.id = "sel-thm";
    }

    // set class to apply CSS, add to the div
    newThm.setAttribute("class","theorem-li");
    currThms.appendChild(newThm);
}

function checkInputs(inputs, numInputs, objList, theorem) {

    filteredInputs = [];
    for (var i = 0; i < inputs.length; i += 1) {
        if (inputs[i])
            filteredInputs.push(i);
    };
    if (!(filteredInputs.length === numInputs)) {
        alert("Not the right number of inputs for this theorem!");
    } else {
        var objs = [];
        for (var i = 0; i < numInputs; i += 1) {
            objs.push(objList[filteredInputs[i]]);
        }
        if (!(theorem.checkConditions(objs))) {
            alert("The theorem doesn't apply here!");
        } else {
            theorem.applyResults(objs);
            addStep(theorem);
            refreshGivens();
        }
    };
    box.remove();

}

/*
 * Applies the theorem
 */
function applyTheorem(theorem) {

    // Find theorem
    var thm;
    for (var i = 0; i < theoremList.length; i += 1) {
        var th = theoremList[i];
        if (th.shortName === theorem) {
            thm = th;
        }
    }

    var options = thm.getInput()[0];
    var numOptions = thm.getInput()[1];
    box = new CheckDialog('selectionBox', options,
        function(inputs) { checkInputs(inputs, numOptions, options, thm) });
    box.open();

}

/*
 * Adds a step to the proof bench
 */
function addStep(step) {
    var currSteps = sel("#curr-steps");
    var newStep = document.createElement('div');

    newStep.innerHTML = step.contents();
    newStep.setAttribute('class', 'step-li');

    currSteps.appendChild(newStep);
}

/*
 * Refreshes the Given pane if there are new things proven
 */
function refreshGivens() {
    var givenPane = sel('#given-content');
    givenPane.innerHTML = '';
    for (var i = 0; i < givens.length; i += 1) {
        givenPane.innerHTML += givens[i].toString() + '<br>';
    };
};

/*
 * sets handlers to the theorems so that people can see what they
 * selected, and so that the program knows what is selected
 */
function setHandlers() {
    // ASSIGN HANDLERS:

    var currThmsButton = sel("button#curr-theorems");
    var currThms = sel("#curr-theorems-content");
    // if clicking current thms button, toggle
    currThmsButton.onclick = function() {
        currThms.style.display = "block";
        builtThms.style.display = "none";
    }

    var builtThmsButton = sel("button#built-theorems");
    var builtThms = sel("#built-theorems-content");
    // if clicking built thms button, toggle
    builtThmsButton.onclick = function() {
        currThms.style.display = "none";
        builtThms.style.display = "block";
    }

    var proofArea = sel("#proof-bench");

    // clicking on the build area will trigger the
    // applyTheorem() method of the selected theorem
    proofArea.onclick = function() {
        applyTheorem(selectedThm);
    }
}

setHandlers();
