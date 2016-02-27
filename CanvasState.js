'use strict';

/*
 * Singleton class to keep track of the canvas's state.
 * canvas - the canvas this of whose state we will keep track
 */
var CanvasState = function(canvas) {

    // initialize stuff
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    // fixes mouse coordinate offsets if there are borders/padding
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView
                        .getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView
                        .getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView
                        .getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView
                        .getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }

    // fixes some issues with fixed-position bars
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // ACTUAL canvas state data
    this.valid = false;
    this.shapes = [];
    this.dragging = false; // dragging flag

    this.selection = null; // shape currently selected
    this.dragoffx = 0;
    this.dragoffy = 0;


    // EVENTS:
    var myState = this;

    // prevent double clicking from selecting text on canvas
    canvas.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // dragging/clicking events
    canvas.addEventListener('mousedown', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = myState.shapes;
        var numshapes = shapes.length;

        // look for a shape the mouse is dragging
        for (var i = numshapes - 1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];

                myState.dragoffx = mx - mySel.x;
                myState.dragoffy = my - mySel.y;
                myState.dragging = true;
                myState.selection = mySel;
                mySel.select();
                myState.valid = false;
                return;
            }
        }

        // if we can't find any objects but we still have one
        // selected, deselect it
        if (myState.selection) {
            myState.selection.deselect();
            myState.selection = null;
            myState.valid = false; // repaint
        }
    }, true);

    // movement while dragging
    canvas.addEventListener('mousemove', function(e) {
        if (myState.dragging) {
            var mouse = myState.getMouse(e);

            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false;
        }
    }, true);

    // hover
    canvas.addEventListener('mouseover', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;

        var shapes = myState.shapes;
        var numshapes = shapes.length;
        // look for a shape the mouse is dragging
        for (var i = numshapes - 1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                sel('html').style.cursor = 'pointer';
                return;
            }
        }

        sel('html').style.cursor = 'auto';
    }, true);

    // mouse release event
    canvas.addEventListener('mouseup', function(e) {
        myState.dragging = false;
    }, true);

    // options for selection color/width
    this.selectionColor = '#CC00000';
    this.selectionWidth = 2;

    // delay between repaints in milliseconds
    this.interval = 30;
    setInterval(function() {
        myState.draw();
    }, myState.interval);
}

/*
 * Adds a shape to the canvas.
 */
CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false; // repaint
}

/*
 * Clears the canvas.
 */
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/*
 * Fits to the window size.
 */
CanvasState.prototype.fit = function() {
    this.width = canvas.width;
    this.height = canvas.height;
}

/*
 * Draws shapes to the canvas.
 */
CanvasState.prototype.draw = function() {
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();

        // TODO add background drawings

        var len = shapes.length;
        for (var i = 0; i < len; i++) {
            var shape = shapes[i];
            // don't draw off-screen elems
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
            shapes[i].draw(ctx);
        }

        // draw selection highlight
        if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        // TODO add more stuff to draw

        this.valid = true; // we've repainted!
    }
}

/*
 * Gets the coordinates of the mouse on screen.
 */
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // compute offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // add padding and border style widths to offset
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // return anon object with the coords
    return {x: mx, y: my};
}

define(function() { return CanvasState; });
