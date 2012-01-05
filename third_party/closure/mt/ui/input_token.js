
/*
Copyright (C) 2012 Ansvia
*/

goog.provide("mt.ui.InputToken");

goog.require("goog.string");

goog.require("goog.dom");

goog.require("goog.ui.Component");

goog.require("goog.ui.Control");

goog.require("goog.dom.classes");

goog.require("goog.style");

goog.require("goog.events.EventType");

goog.require("goog.events");

goog.require("mt.ui.InputTokenRenderer");

mt.ui.InputToken = (function() {

  /*
    @constructor
  */

  function InputToken(elm, opt_domHelper) {
    this.opt_domHelper = opt_domHelper;
    goog.ui.Component.call(this, this.opt_domHelper);
    this.items_ = [];
    this.item_max_chars_ = 100;
    if (elm) {
      if (typeof elm === "string") elm = goog.dom.getElement(elm);
      this.decorateInternal(elm);
    }
  }

  goog.inherits(InputToken, goog.ui.Component);

  InputToken.prototype.decorate = function(elm) {
    if (typeof elm === "string") elm = goog.dom.getElement(elm);
    return this.decorateInternal(elm);
  };

  InputToken.prototype.decorateInternal = function(elm) {
    var cancel_input_, clear, self, tabindex;
    InputToken.superClass_.decorateInternal.call(this, elm);
    this.setElementInternal(elm);
    goog.dom.classes.add(elm, goog.getCssName("mt-input-token"));
    goog.style.setStyle(elm, {
      'min-height': '15px'
    });
    this.itemsWrappers_ = goog.dom.createElement("div");
    goog.dom.classes.add(this.itemsWrappers_, goog.getCssName("items"));
    goog.style.setStyle(this.itemsWrappers_, {
      "float": "left"
    });
    elm.appendChild(this.itemsWrappers_);
    this.inputElm_ = goog.dom.createElement("input");
    goog.style.setStyle(this.inputElm_, {
      "float": "left"
    });
    this.inputElm_.setAttribute("type", "text");
    tabindex = elm.getAttribute("tabindex");
    if (tabindex) {
      this.inputElm_.setAttribute("tabindex", tabindex);
      elm.removeAttribute("tabindex");
    }
    elm.appendChild(this.inputElm_);
    self = this;
    self.lastValue_ = this.inputElm_.value;
    goog.events.listen(this.inputElm_, goog.events.EventType.KEYUP, function(e) {
      if (e.keyCode === 13) {
        self.add(goog.string.trim(self.inputElm_.value));
        self.inputElm_.value = "";
        self.inputElm_.focus();
      } else if (e.keyCode === 8) {
        if (self.lastValue_.length === 0) self.remove(self.getLastItem().text);
      }
      return self.lastValue_ = self.inputElm_.value;
    });
    cancel_input_ = function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return true;
      }
      if (e.keyCode === 8) return true;
      if (self.inputElm_.value.length >= self.item_max_chars_) {
        e.preventDefault();
        return false;
      }
      return true;
    };
    goog.events.listen(this.inputElm_, goog.events.EventType.KEYPRESS, cancel_input_);
    goog.events.listen(this.inputElm_, goog.events.EventType.KEYDOWN, cancel_input_);
    goog.events.listen(elm, goog.events.EventType.CLICK, function(e) {
      return self.inputElm_.focus();
    });
    clear = goog.dom.createDom("div");
    goog.style.setStyle(clear, {
      "clear": "both"
    });
    return elm.appendChild(clear);
  };

  InputToken.prototype.getLastItem = function() {
    return this.items_[this.items_.length - 1];
  };

  InputToken.prototype.setMaxItemChars = function(max) {
    return this.item_max_chars_ = max;
  };

  InputToken.prototype.add = function(text) {
    var celm, item, self;
    item = new mt.ui.InputTokenRenderer(text);
    celm = goog.dom.createElement("div");
    celm.innerHTML = text;
    goog.style.setStyle(celm, {
      "max-height": "17px",
      "overflow": "hidden"
    });
    item.decorateInternal(celm);
    this.itemsWrappers_.appendChild(celm);
    this.items_.push(item);
    self = this;
    goog.events.listen(celm, goog.events.EventType.CLICK, function(e) {
      return self.remove(e.target.innerHTML);
    });
  };

  InputToken.prototype.remove = function(text) {
    var i, item, _len, _ref;
    _ref = this.items_;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      item = _ref[i];
      if (item.text === text) {
        this.items_.splice(i, 1);
        item.dispose();
      }
    }
  };

  return InputToken;

})();
