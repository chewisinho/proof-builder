'use strict';

var geo = require('./Logic/Objects/Geometry');
var thm = require('./Logic/Theorems');
var ObjectDB = require('./Logic/Objects/ObjectDB');
var ProofState = require('./Logic/Properties/ProofState');
var Exercise1 = require('./Examples/Exercise1');
//var gfx = require('./Graphics/Geometry');
var GUI = require('./Graphics/GUI');

var given_theorems = [];
var built_theorems = [];

var current_thm_pane;

function main() {
    // Load given theorems.
    given_theorems = Object.keys(thm).map(function (key) {
        return thm[key];
    });
    
    // Load built theorems / exercises.
    // TODO: This will eventually be automatic when we implement persistence etc.
    // For now, we'll just use Exercise 1.
    built_theorems.push(Exercise1);

    // Display givens first.
    GUI.display_list('#theorem-section .section-contents', given_theorems, (thm) => thm.title);
    current_thm_pane = $('#given-button').get(0);

    // Set up event handling.
    let thm_apply_event = function(event) {
        $('#theorem-section .section-contents li').on('click', event => {
            let name = event.currentTarget.innerHTML;
            GUI.open_confirm_dialog(name, 'Apply ' + name + '?', function() {console.log(name)}); 
        });
    };
    
    // TODO: Load button should load more than just Ex 1
    $('#load-button').on('click', function(event) {
        
    });

    $('#built-button').on('click', function(event) {
        GUI.display_list('#theorem-section .section-contents',
                         built_theorems,
                         thm => thm.title);
        event.currentTarget.classList.add('active');
        if (current_thm_pane != event.currentTarget)
            current_thm_pane.classList.remove('active');
        current_thm_pane = event.currentTarget;
        thm_apply_event();
    });
    
    $('#given-button').on('click', function(event) {
        GUI.display_list('#theorem-section .section-contents',
                         given_theorems,
                         thm => thm.title);
        event.currentTarget.classList.add('active');
        if (current_thm_pane != event.currentTarget)
            current_thm_pane.classList.remove('active');
        current_thm_pane = event.currentTarget;
        thm_apply_event();
    });
    
    thm_apply_event();
}

main();
