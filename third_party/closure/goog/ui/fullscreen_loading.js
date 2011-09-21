


goog.provide('goog.ui.FullscreenLoading');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');


/**
 * @constructor
 */
goog.ui.FullscreenLoading = function(caption, auto_show, loading_image, opt_domHelpers){
	goog.ui.Component.call(this, opt_domHelpers);
	this.auto_show_ = auto_show;
	this.caption_ = caption || 'Loading...';
	this.loading_image_ = loading_image || goog.ui.FullscreenLoading.loading_image_;
	if(this.auto_show_ == true){
		this.render();
	}
};
goog.inherits(goog.ui.FullscreenLoading, goog.ui.Component);

goog.ui.FullscreenLoading.loading_image_ = 'http://cdn01.digaku.com/data/c/6d781b369a10e4f8c97c9dbe81daca5e.gif';

goog.ui.FullscreenLoading.prototype.render = function(){
	
	if(this.inDocument_){
		throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
	}
	
	this.element_ = goog.dom.createElement('div');
	this.bgElm_ = goog.dom.createElement('div');
	
	this.element_.innerHTML = '<div style="float: left;"><img src="'+goog.ui.FullscreenLoading.loading_image_+'" /></div><div style="float: left; margin-top: 10px; margin-left: 10px;">' + this.caption_ + '</div>';
	
	goog.dom.appendChild(document.body, this.element_);
	goog.dom.appendChild(document.body, this.bgElm_);
	
	var doc = this.getDomHelper().getDocument();
	var win = goog.dom.getWindow(doc) || window;
	var css1 = {
		'position': 'absolute',
		'left': '0px',
		'top': '0px',
		'background-color': '#000',
		'z-index': '9000'
	};
	
	var css2 = {
		'padding': '10px',
		'background-color': '#FFF',
		'position': 'absolute',
		'width': '210px',
		'height': '30px',
		'z-index': '9001'
	};

	// Take the max of scroll height and view height for cases in which document
	// does not fill screen.
	var viewSize = goog.dom.getViewportSize(win);
	var w = Math.max(doc.body.scrollWidth, viewSize.width);
	var h = Math.max(doc.body.scrollHeight, viewSize.height);
	
	goog.style.showElement(this.bgElm_, true);
	goog.style.setOpacity(this.bgElm_, 0.50);
	goog.style.setSize(this.bgElm_, w, h);
	goog.style.setStyle(this.bgElm_, css1);
	
	goog.style.setStyle(this.element_, css2);
	goog.style.showElement(this.element_, true);
	
	this.reposition();
	
	this.inDocument_ = true;
	
};

goog.ui.FullscreenLoading.prototype.setVisible = function(state){
	if(!this.inDocument_){
		this.render();
	}
	
	goog.style.showElement(this.element_, state);
	goog.style.showElement(this.bgElm_, state);
	
	this.reposition();
};

goog.ui.FullscreenLoading.prototype.dispose = function(){
	goog.ui.FullscreenLoading.superClass_.disposeInternal();
	goog.dom.removeNode(this.element_);
	goog.dom.removeNode(this.bgElm_);
	
	this.element_ = null;
	this.bgElm_ = null;
};

goog.ui.FullscreenLoading.prototype.reposition = function(){
	// Get the current viewport to obtain the scroll offset.
	var doc = this.getDomHelper().getDocument();
	var win = goog.dom.getWindow(doc) || window;
	if (goog.style.getComputedPosition(this.getElement()) == 'fixed') {
	  var x = 0;
	  var y = 0;
	} else {
		var scroll = this.getDomHelper().getDocumentScroll();
		var x = scroll.x;
		var y = scroll.y;
	}

	var elmSize = goog.style.getSize(this.getElement());
	var viewSize = goog.dom.getViewportSize(win);

	// Make sure left and top are non-negatives.
	var left = Math.max(x + viewSize.width / 2 - elmSize.width / 2, 0);
	var top = Math.max(y + viewSize.height / 2 - elmSize.height / 2, 0);

	goog.style.setPosition(this.getElement(), left, top);
};




