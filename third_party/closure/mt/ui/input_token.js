/*
Copyright (C) 2012 Ansvia
*/
var __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

goog.provide("mt.ui.InputToken");

goog.require("goog.string");

goog.require("goog.array");

goog.require("goog.ui.Component");

goog.require("goog.ui.Control");

goog.require("goog.dom.classes");

goog.require("goog.style");

goog.require("goog.events");

goog.require("goog.events.EventType");

goog.require("goog.events.EventHandler");

goog.require("goog.events.Event");

goog.require("mt.ui.InputTokenRenderer");

mt.ui.InputTokenEventChange = function(items) {
  this.type = goog.ui.Component.EventType.CHANGE;
  this.items = items;
  return this;
};

goog.inherits(mt.ui.InputTokenEventChange, goog.events.Event);

mt.ui.InputToken = (function() {
  /*
      @constructor
  */
  function InputToken(elm, opt_domHelper) {
    this.opt_domHelper = opt_domHelper;
    goog.ui.Component.call(this, this.opt_domHelper);
    this.items_ = [];
    this.item_max_chars_ = 100;
    this.max_item = 5;
    this.dispatchKeyCodes_ = 13;
    this.eh_ = new goog.events.EventHandler(this);
    if (elm) {
      if (typeof elm === "string") elm = this.dom_.getElement(elm);
      this.decorateInternal(elm);
      this.enterDocument();
    }
  }

  goog.inherits(InputToken, goog.ui.Component);

  InputToken.prototype.setDispatchKeyCodes = function(keys) {
    return this.dispatchKeyCodes_ = keys;
  };

  InputToken.prototype.enterDocument = function() {
    var cancel_input_, self;
    mt.ui.InputToken.superClass_.enterDocument.call(this);
    self = this;
    self.lastValue_ = this.inputElm_.value;
    goog.events.listen(this.inputElm_, goog.events.EventType.KEYUP, function(e) {
      var lastItem, v, _ref;
      if (_ref = e.keyCode, __indexOf.call(self.dispatchKeyCodes_, _ref) >= 0) {
        v = goog.string.trim(self.inputElm_.value);
        if (v.length > 0) {
          self.add(v);
          self.inputElm_.value = "";
          self.inputElm_.focus();
        }
      } else if (e.keyCode === 8) {
        if (self.lastValue_.length === 0) {
          lastItem = self.getLastItem();
          if (lastItem) self.remove(lastItem.text);
        }
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
    goog.events.listen(this.getElement(), goog.events.EventType.CLICK, function(e) {
      return self.inputElm_.focus();
    });
  };

  InputToken.prototype.exitDocument = function() {
    goog.events.unlisten(this.inputElm_);
    goog.events.unlisten(this.getElement());
    return goog.events.unlisten(this);
  };

  InputToken.prototype.decorate = function(elm) {
    if (typeof elm === "string") elm = this.dom_.getElement(elm);
    this.decorateInternal(elm);
    return this.enterDocument();
  };

  InputToken.prototype.decorateInternal = function(elm) {
    var clear, self, tabindex;
    InputToken.superClass_.decorateInternal.call(this, elm);
    this.setElementInternal(elm);
    goog.dom.classes.add(elm, goog.getCssName("mt-input-token"));
    goog.style.setStyle(elm, {
      'min-height': '15px'
    });
    this.itemsWrappers_ = this.dom_.createDom("div", {
      'class': goog.getCssName("items"),
      "style": "float: left;"
    });
    elm.appendChild(this.itemsWrappers_);
    this.inputElm_ = this.dom_.createDom("input", {
      'style': "float: left;",
      'type': 'text'
    });
    tabindex = elm.getAttribute("tabindex");
    if (tabindex) {
      this.inputElm_.setAttribute("tabindex", tabindex);
      elm.removeAttribute("tabindex");
    }
    elm.appendChild(this.inputElm_);
    self = this;
    clear = this.dom_.createDom("div");
    goog.style.setStyle(clear, {
      "clear": "both"
    });
    return elm.appendChild(clear);
  };

  InputToken.prototype.getLastItem = function() {
    return this.items_[this.items_.length - 1];
  };

  InputToken.prototype.getItems = function() {
    var it, rv, _i, _len, _ref;
    rv = [];
    _ref = this.items_;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      it = _ref[_i];
      rv.push(it.text);
    }
    return rv;
  };

  InputToken.prototype.setMaxItemChars = function(max) {
    return this.item_max_chars_ = max;
  };

  InputToken.prototype.setMaxItem = function(max) {
    return this.max_items = max;
  };

  InputToken.prototype.getMaxItem = function() {
    return this.max_items;
  };

  /*
       @private
  */

  InputToken.prototype.add_ = function(text, initial) {
    var celm, item, self;
    if (initial == null) initial = true;
    if (this.items_.length >= this.getMaxItem()) return;
    if (this.hasToken(text)) return;
    item = new mt.ui.InputTokenRenderer(text);
    celm = this.dom_.createElement("div");
    celm.innerHTML = text;
    goog.style.setStyle(celm, {
      "max-height": "17px",
      "overflow": "hidden"
    });
    item.decorateInternal(celm);
    this.itemsWrappers_.appendChild(celm);
    this.items_.push(item);
    self = this;
    goog.events.listenOnce(celm, goog.events.EventType.CLICK, function(e) {
      return self.remove(e.target.innerHTML);
    });
    if (initial === false) {
      this.dispatchEvent(new mt.ui.InputTokenEventChange(this.getItems()));
    }
    if (this.items_.length === this.getMaxItem()) {
      return goog.style.showElement(this.inputElm_, false);
    }
  };

  /*
      @private
  */

  InputToken.prototype.remove_ = function(text, initial) {
    var changed_, i, item, _len, _ref;
    if (initial == null) initial = false;
    changed_ = false;
    _ref = this.items_;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      item = _ref[i];
      if (item && item.text === text) {
        this.items_.splice(i, 1);
        item.dispose();
        changed_ = true;
      }
    }
    if (changed_) {
      if (initial === false) {
        this.dispatchEvent(new mt.ui.InputTokenEventChange(this.getItems()));
      }
      if (this.items_.length < this.getMaxItem()) {
        return goog.style.showElement(this.inputElm_, true);
      }
    }
  };

  InputToken.prototype.add = function(text) {
    return this.add_(text, false);
  };

  InputToken.prototype.remove = function(text) {
    this.remove_(text, false);
  };

  InputToken.prototype.hasToken = function(text) {
    var items;
    items = goog.array.filter(this.items_, function(item) {
      return item.text === text;
    });
    return items.length > 0;
  };

  return InputToken;

})();
