const OVERLAY_STYLE = 'display:none;position:fixed;width:500px;height:300px; \
                       margin:0 auto;margin-top:40vh;background:white;color:black;\
                       border:1px solid black;border-radius:2px;padding:10px;';

function sel(s) {
    return document.querySelector(s);
}

var CheckDialog = function(id, options, callback) {
    this.id = id;
    this.options = options;
    this.overlay = null;
    this.callback = callback;

    this.overlay = document.createElement('div');
    this.overlay.setAttribute('id', this.id);
    this.overlay.setAttribute('style', OVERLAY_STYLE);

    var checkbuttons = document.createElement('form');

    for (var i = 0; i < options.length; i++) {
        checkbuttons.innerHTML += '<label><input type="checkbox"' +
                                  ' value="' +
                                  options[i].toString() + '"/>'
                                  + options[i].toString();
                                  + '</label><br>';
    }

    var submit = document.createElement('button');
    submit.setAttribute('type','button');
    submit.style.marginTop = '10px';
    submit.innerHTML = 'OK';
    var readInput = this.readInput;
    submit.onclick = function() { readInput(callback); };
    checkbuttons.appendChild(submit);

    var closebutton = document.createElement('button');
    closebutton.innerHTML = 'Close';
    closebutton.style.marginTop = '10px';
    closebutton.checkDialogBox = this;
    closebutton.onclick = function() {
        this.checkDialogBox.close();
    }

    this.overlay.appendChild(checkbuttons);
    this.overlay.appendChild(closebutton);
    document.body.appendChild(this.overlay);
};

CheckDialog.prototype.readInput = function(callback) {
    var form = sel('form');
    console.log(form.childNodes);
    var inputs = form.childNodes;
    var result = [];
    for (var i = 0; i < inputs.length; i++) {
        var box = inputs[i].childNodes[0];
        console.log(box);
        if (box.checked !== undefined)
            result.push(box.checked);
    }

    callback(result);
}

CheckDialog.prototype.open = function() {
    this.overlay.style.display = 'inline-block';
}

CheckDialog.prototype.close = function() {
    this.overlay.style.display = 'none';
}

CheckDialog.prototype.remove = function() {
    document.body.removeChild(this.overlay);
}
