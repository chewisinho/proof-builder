'use strict';

var GUI = {};

/*
 * Fills a <ul> with data from a theorem list.
 * @param {String} query - CSS selector for the <ul> to populate
 * @param {[Object]} data_list - the objects to display
 * @param {Object=>String} access - a function mapping an object to its display value
 *                            if none given, uses the object's toString.
 */
GUI.display_list = function(query, data_list, access) {
    let html_list = $(query);
    html_list.empty();
    data_list.forEach(function (curr) {
        let li = document.createElement('li');
        li.innerHTML = access ? access(curr) : curr.toString();
        console.log(curr);
        li.setAttribute('class', 'action');
        html_list.append(li);
    });
};

/**
 * Opens a confirmation dialog with the given title and text.
 * @param {String} title - title of the dialog
 * @param {String} text - content of the dialog
 * @param {Function} callback - function that executes when the dialog is confirmed
 */
GUI.open_confirm_dialog = function(title, text, callback) {
    $('#dialog').html(text);
    $('#dialog').dialog({
       title: title,
       closeText: 'x',
       modal: true,
       maxWidth: '70%',
       width: '40%',
       buttons: [
           { text: 'OK', click: function () {
               callback();
               $(this).dialog('close');
           }}
       ] 
    });
};

/**
 * Opens a file-choosing dialog with the given title.
 * @param {String} title - title of the dialog
 * @param {Function} callback - function that executes when the file is chosen
 */
GUI.open_file_dialog = function(title, callback) {
};

module.exports = GUI;
