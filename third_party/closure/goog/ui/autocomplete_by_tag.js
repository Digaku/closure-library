
goog.provide('goog.ui.AutoComplete.ByTag');

goog.require('goog.ui.AutoComplete');
goog.require('goog.ui.AutoComplete.ArrayMatcher');
goog.require('goog.ui.AutoComplete.Renderer');
goog.require('goog.ui.AutoComplete.InputHandler');

/**
 * Class for managing the interaction between an autocomplete object and a
 * text-input or textarea.
 * @param {?string=} opt_separators Seperators to split multiple entries.
 * @param {?string=} opt_literals Characters used to delimit text literals.
 * @param {?boolean=} opt_multi Whether to allow multiple entries
 *     (Default: true).
 * @param {?number=} opt_throttleTime Number of milliseconds to throttle
 *     keyevents with (Default: 150).
 * @constructor
 * @extends {goog.ui.AutoComplete.InputHandler}
 */
goog.ui.AutoComplete.CustomHandler = function(opt_separators, opt_literals,
    opt_multi, opt_throttleTime) {
  goog.ui.AutoComplete.InputHandler.call(this, opt_separators, opt_literals,
      opt_multi, opt_throttleTime);
};
goog.inherits(goog.ui.AutoComplete.CustomHandler,
              goog.ui.AutoComplete.InputHandler);


/**
 * Selects the given rich row.  The row's select(target) method is called.
 * @param {Object} row The row to select.
 * @return {boolean} Whether to suppress the update event.
 */
goog.ui.AutoComplete.CustomHandler.prototype.selectRow = function(row) {
/*  var suppressUpdate = goog.ui.AutoComplete.CustomHandler.superClass_
      .selectRow.call(this, row);
*/
  //row.select(this.ac_.getTarget());
//	alert(this.ac_.getTarget().value);
	var input = this.ac_.getTarget();
	input.value = input.value + " @" + row;
  return; //suppressUpdate;
};


goog.ui.AutoComplete.ByTag = function(data, input, opt_multi, opt_useSimilar) {
  var matcher = new goog.ui.AutoComplete.ArrayMatcher(data, !opt_useSimilar);
  var renderer = new goog.ui.AutoComplete.Renderer();

  var inputhandler =
      new goog.ui.AutoComplete.CustomHandler(null, null, true);

  goog.ui.AutoComplete.call(this, matcher, renderer, inputhandler);

  inputhandler.attachAutoComplete(this);
  inputhandler.attachInputs(input);
};
goog.inherits(goog.ui.AutoComplete.ByTag, goog.ui.AutoComplete);



