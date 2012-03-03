// Copyright (C) 2011 Ansvia

goog.provide('mt.ui.MTInputHandlerPrefix');
goog.provide('mt.ui.MTAutoComplete');
goog.provide('mt.ui.MTAutoCompleteChannel');

goog.require('goog.string');
goog.require('goog.ui.AutoComplete');
goog.require('goog.ui.AutoComplete.InputHandler');
goog.require('goog.ui.AutoComplete.Renderer');
goog.require('goog.ui.AutoComplete.ArrayMatcher');

/**
 * @constructor
 * @param {String} prefix to trigger autocomplete.
 *                  for example in Mindtalk use `@` and `#`.
 * @extends {goog.ui.AutoComplete.InputHandler}
 */
mt.ui.MTInputHandlerPrefix = function(prefix) {
    this.prefix_ = prefix;
	goog.ui.AutoComplete.InputHandler.call(this);
}

goog.inherits(mt.ui.MTInputHandlerPrefix, goog.ui.AutoComplete.InputHandler);



/**
 * Selects the given row.  Implements the SelectionHandler interface.
 * @param {Object} row The row to select.
 * @param {boolean=} opt_multi Should this be treated as a single or multi-token
 *	   auto-complete?  Overrides previous setting of opt_multi on constructor.
 * @return {boolean} Whether to suppress the update event.
 */
mt.ui.MTInputHandlerPrefix.prototype.selectRow = function(row, opt_multi) {
    var el = this.activeElement_;
    var token = this.ac_.token_;
    var text = this.getValue();
    var cursor = this.getCursorPosition();
    var tail = "";

    // save tail if any
    if(text.length > (cursor + 1)){
        tail = text.slice(cursor);
    }

    var head = text.slice(0, cursor);

    // get body
    var body = "";

    var i = head.lastIndexOf(this.prefix_);

    body = head.slice(i, cursor);

    head = head.slice(0, i);

    body = body.replace(new RegExp(goog.string.regExpEscape(token)), row.toString());

    var new_content =  head + body + tail;

    //new_content = new_content.replace(new RegExp(goog.string.regExpEscape(token) + '$'), row.toString())

    el.value = new_content;
    el.focus();

    cursor = cursor + (row.toString().length - token.length);

    this.setCursorPosition(cursor);

    this.rowJustSelected_ = true;
};


/**
 * Parses a text area or input box for the currently highlighted token.
 * @return {string} Token to complete.
 * @protected
 */
mt.ui.MTInputHandlerPrefix.prototype.parseToken = function() {
    var rv = "", cursor, text, matches, i;

    cursor = this.getCursorPosition();
    text = this.getValue();
    text = text.slice(0, cursor);

    i = text.lastIndexOf(this.prefix_);

    text = text.slice(i, cursor);

    var re = new RegExp( goog.string.regExpEscape(this.prefix_) + '(\\w+)$' );

    matches = re.exec(text);

    if(matches && matches.length > 1){
        rv = matches[1];
    }

    return rv;
};


mt.ui.MTInputHandlerPrefix.prototype.content_editable_ = function(){
    return this.activeElement_.contentEditable && this.activeElement_.contentEditable == "true";
};

mt.ui.MTInputHandlerPrefix.prototype.getValue = function() {
    if(this.content_editable_()){
        return this.activeElement_.innerText;
    }
    return mt.ui.MTInputHandlerPrefix.superClass_.getValue.call(this);
};

mt.ui.MTInputHandlerPrefix.prototype.setValue = function(value) {
    if(this.content_editable_()){
        value = '<span class="' + goog.getCssName('label') + ' ' + goog.getCssName("success") +  '">' + value + '</span>';
        return this.activeElement_.innerHTML = value;
    }
    return mt.ui.MTInputHandlerPrefix.superClass_.setValue.call(this,value);
};


/**
 * @constructor
 * @extends {goog.ui.AutoComplete}
 */
mt.ui.MTAutoComplete = function(data, input, opt_multi, opt_useSimilar) {
	var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar);
	var renderer = new goog.ui.AutoComplete.Renderer();
	var inputhandler = new mt.ui.MTInputHandlerPrefix('@');

	goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

	inputhandler.attachAutoComplete(this);
	inputhandler.attachInputs(input);
};

goog.inherits(mt.ui.MTAutoComplete, goog.ui.AutoComplete);


/**
 * @constructor
 * @extends {goog.ui.AutoComplete}
 */
mt.ui.MTAutoCompleteChannel = function(data, input, opt_multi, opt_useSimilar) {
	var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar);
	var renderer = new goog.ui.AutoComplete.Renderer();
	var inputhandler = new mt.ui.MTInputHandlerPrefix('#');

	goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

	inputhandler.attachAutoComplete(this);
	inputhandler.attachInputs(input);
}

goog.inherits(mt.ui.MTAutoCompleteChannel, goog.ui.AutoComplete);

