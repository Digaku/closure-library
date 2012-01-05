
/*
Copyright (C) 2012 Ansvia
*/

goog.provide("mt.ui.InputTokenRenderer");

goog.require("goog.ui.Control");

goog.require("goog.ui.ControlRenderer");

goog.require("goog.dom.classes");

mt.ui.InputTokenRenderer = (function() {

  /*
    @constructor
  */

  function InputTokenRenderer(text, base_class_name) {
    var renderer_;
    this.text = text;
    if (base_class_name == null) base_class_name = "item";
    renderer_ = goog.ui.ControlRenderer.getCustomRenderer(goog.ui.ControlRenderer, base_class_name);
    goog.ui.Control.call(this, this.text, renderer_);
  }

  goog.inherits(InputTokenRenderer, goog.ui.Control);

  return InputTokenRenderer;

})();
