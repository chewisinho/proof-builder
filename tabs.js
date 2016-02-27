/*
 * Code for loading the left-side theorems pane -- specifically
 * the tabs and appending new theorems in the list of given
 * theorems..
 */

var counter = 0;
var selectedThm = null; // the currently selected theorem

// gets element by id/class
function sel(s) {
    return document.querySelector(s);
}

// for adding a theorem to the 'current theorems' tab
function addTheorem() {
    var currThms = sel("#curr-theorems-content");
    var newThm = document.createElement("div");

    newThm.name = "thm"; // TODO make this a unique identifier

    // change the selected theorem to the one clicked
    newThm.onclick = function() {
        if (selectedThm) sel("#sel-thm").id = ""; // reset selected divs

        // apply selected div id to the one clicked on
        selectedThm = newThm.name;
        newThm.id = "sel-thm";
    }

    newThm.innerHTML = "theorem" + counter++; // TODO edit this for actual program

    // set class to apply CSS, add to the div
    newThm.setAttribute("class","theorem-li");
    currThms.appendChild(newThm);
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

    // ASSIGN HANDLERS:

    // if clicking current thms button, toggle
    currThmsButton.onclick = function() {
        currThms.style.display = "block";
        builtThms.style.display = "none";
        addTheorem();
    }

    // if clicking built thms button, toggle
    builtThmsButton.onclick = function() {
        currThms.style.display = "none";
        builtThms.style.display = "block";
    }
}

setHandlers();
