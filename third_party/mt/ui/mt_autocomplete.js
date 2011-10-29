// Copyright (C) 2011 Ansvia

goog.provide('mt.ui.MTInputHandler');
goog.provide('mt.ui.MTAutoComplete');

goog.require('goog.string');
goog.require('goog.ui.AutoComplete');
goog.require('goog.ui.AutoComplete.InputHandler');
goog.require('goog.ui.AutoComplete.Renderer');
goog.require('goog.ui.AutoComplete.ArrayMatcher');

/**
 * @constructor
 * @extends {goog.ui.AutoComplete.InputHandler}
 */
mt.ui.MTInputHandler = function() {
	goog.ui.AutoComplete.InputHandler.call(this);
}

goog.inherits(mt.ui.MTInputHandler, goog.ui.AutoComplete.InputHandler);

/**
 * Selects the given row.  Implements the SelectionHandler interface.
 * @param {Object} row The row to select.
 * @param {boolean=} opt_multi Should this be treated as a single or multi-token
 *	   auto-complete?  Overrides previous setting of opt_multi on constructor.
 * @return {boolean} Whether to suppress the update event.
 */
mt.ui.MTInputHandler.prototype.selectRow = function(row, opt_multi) {
	//console.log(row);
	//this.setTokenText(row.toString(), opt_multi);
	var el = this.activeElement_;
	var token = this.ac_.token_;
	var new_content = this.getValue();
	
	new_content = new_content.replace(new RegExp(goog.string.regExpEscape(token) + '$'), row.toString())
	
	el.value = new_content;
	el.focus();
	this.rowJustSelected_ = true;
	return false;
};


/**
 * Parses a text area or input box for the currently highlighted token.
 * @return {string} Token to complete.
 * @protected
 */
mt.ui.MTInputHandler.prototype.parseToken = function() {
	var rv = "";
	
	var caret = this.getCursorPosition();
	var text = this.getValue();
	
	var matches = /\s@(\w+)$/.exec(text);
	
	if(matches && matches.length > 1){
		rv = matches[1];
	}
	
  return rv;
};


/**
 * @constructor
 * @extends {goog.ui.AutoComplete}
 */
mt.ui.MTAutoComplete = function(data, input, opt_multi, opt_useSimilar) {
	var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar);
	var renderer = new goog.ui.AutoComplete.Renderer();
	var inputhandler = new mt.ui.MTInputHandler();

	goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

	inputhandler.attachAutoComplete(this);
	inputhandler.attachInputs(input);
};

goog.inherits(mt.ui.MTAutoComplete, goog.ui.AutoComplete);

