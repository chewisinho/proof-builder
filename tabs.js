/*
 * Code for loading the left-side theorems pane -- specifically
 * the tabs and appending new theorems in the list of given
 * theorems..
 */

var selectedThm = null; // the currently selected theorem (DOM element)

/*
 * Loads the theorems into the theorem sidebar
 */
function loadTheorems() {
    for (var i = 0; i < theoremList.length; i++) {
        addTheorem(theoremList[i]);
    }
}

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

/*
 * Applies the theorem
 */
function applyTheorem(theorem) {
    var thm;
    for (var i = 0; i < theoremList.length; i += 1) {
        var th = theoremList[i];
        if (th.shortName === theorem) {
            thm = th;
        }
    }
    console.log(thm);
    // look here sinho
    if (selectedThm)
        sel("#proof-bench").innerHTML = selectedThm;

}

/*
 * sets handlers to the theorems so that people can see what they
 * selected, and so that the program knows what is selected
 */
function setHandlers() {
    // load the doc objects
    var currThmsButton = sel("button#curr-theorems");
    var builtThmsButton = sel("button#built-theorems");
    var currThms = sel("#curr-theorems-content");
    var builtThms = sel("#built-theorems-content");

    var proofArea = sel("#proof-bench");
    console.log("Reached this area! Proof area is...");
    console.log(proofArea);

    // ASSIGN HANDLERS:

    // if clicking current thms button, toggle
    currThmsButton.onclick = function() {
        currThms.style.display = "block";
        builtThms.style.display = "none";
    }

    // if clicking built thms button, toggle
    builtThmsButton.onclick = function() {
        currThms.style.display = "none";
        builtThms.style.display = "block";
    }

    // clicking on the build area will trigger the
    // applyTheorem() method of the selected theorem
    proofArea.onclick = function() {
        applyTheorem(selectedThm);
    }
}

setHandlers();
