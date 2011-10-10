
goog.provide('goog.ui.FlashStatus');


goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.fx.Transition.EventType');
goog.require('goog.fx.dom.FadeOutAndHide');
goog.require('goog.fx.dom.FadeInAndShow');

/**
 * @constructor
 */
goog.ui.FlashStatus = function(status, timeout, opt_domHelpers){
	goog.ui.Component.call(this, opt_domHelpers);

	this.default_status_ = status;
	this.timeout_ = timeout ? timeout : goog.ui.FlashStatus.default_timeout_;
	this.text_elm_ = null;
	this.timeout_id_ = null;
	this.in_fadein_ = false;
	this.in_fadeout_ = false;
	
	var _cached = goog.dom.getElement('FlashStatus');
	if(_cached){
		this.element_ = _cached;
		this.text_elm_ = goog.dom.getElement('FlashStatusText');
	}
	else{
		this.element_ = this.build_element_(status);
	}
	
	//this.decorateInternal(this.orig_elm);
	
	this.setVisible(true, this.default_status_);
	
	console.log('in goog.ui.FlashStatus constructor()');
	
};

goog.inherits(goog.ui.FlashStatus, goog.ui.Component);

goog.ui.FlashStatus.default_timeout_ = 2000;

goog.ui.FlashStatus.prototype.build_element_ = function(default_status){
	
	status_ = default_status ? default_status : this.default_status_;

	rv = '<div id="FlashStatus" style="min-width: 150px; height: 30px; background-color: #FFF9A0;' +
	'position: fixed;' +
	'top: 5px;' +
	'-moz-border-radius:5px;' + 
	'border-radius:5px;' +
	'-webkit-border-radius:5px;' +
	'border: 1px solid #CACACA;' +
	'z-index: 5001;' +
	'padding: 5px;">' +
	'</div>';
	
	this.text_elm_ = goog.dom.htmlToDocumentFragment('<div id="FlashStatusText" style="text-align: center; padding: 5px; font-weight: bold;">' + status_ + '</div>');
	
	elm = goog.dom.htmlToDocumentFragment( rv );
	
	goog.dom.appendChild(elm, this.text_elm_);
	
	document.body.insertBefore( elm, document.body.childNodes[0] );
	
	return elm;
};

goog.ui.FlashStatus.prototype.setStatus = function(status){
	this.default_status_ = status;
	if(!this.element_){
		this.element_ = this.build_element_(status);
	}
	goog.dom.setTextContent(this.text_elm_, status);
};

goog.ui.FlashStatus.prototype.setVisible = function(show, status){
	if(!this.element_){
		this.element_ = this.build_element_(status);
	}
	if(status){
		this.setStatus(status);
	}
	if(this.in_fadeout_==true){
		return;
	}
	if (show==true){
		var rv = null
		
		var dom = new goog.dom.DomHelper();
		var doc = dom.getDocument();
		var win = goog.dom.getWindow( doc );
		var scroll = dom.getDocumentScroll();
		
		var x = scroll['x'];
		
		var elSize = goog.style.getSize( elm );
		
		var viewSize = goog.dom.getViewportSize( win );
		
		var left = Math.max( x + viewSize['width'] / 2 - elSize['width'] / 2, 0 );
		
		goog.style.setPosition(elm, left, 5);
		
		//$dg.elm(elm).setVisible( true );
		
		//goog.style.showElement(this.element_, true);
		this.fadeIn_();
	}
	else{
		//goog.style.showElement(this.element_, false);
		this.fadeIn_();
	}
	this.setTimeout(this.timeout_);
};

goog.ui.FlashStatus.prototype.fadeIn_ = function(){
	console.log(this.in_fadein_);
	if(this.in_fadein_ == true || this.in_fadeout_ == true){
		return;
	}
	this.in_fadein_ = true;
	var anim = new goog.fx.dom.FadeInAndShow(this.element_, 500);
	goog.events.listen(anim,goog.fx.Transition.EventType.END,function(){
		this.in_fadein_ = false;
	}, false, this);
	anim.play();
};

goog.ui.FlashStatus.prototype.fadeOut_ = function(){
	if(this.in_fadeout_ == true){
		return;
	}
	this.in_fadeout_ = true;
	var anim = new goog.fx.dom.FadeOutAndHide(this.element_, 2000);
	goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){
		this.in_fadeout_ = false;
	}, false, this);
	anim.play();
};

goog.ui.FlashStatus.prototype.setTimeout = function(timeout){
	this.timeout_ = timeout;
	var thisC = this;
	this.timeout_id_ = setTimeout(function(){ thisC.fadeOut_() }, this.timeout_, this);
};


/*
goog.ui.FlashStatus.prototype.decorateInternal = function(element){
	goog.ui.FlashStatus.superClass_.decorateInternal.call(this, element);
};
*/

//goog.ui.FlashStatus.gif_file_ = '/img/loading-bar.gif';

goog.ui.FlashStatus.prototype.disposeInternal = function(){
	goog.ui.FlashStatus.superClass_.disposeInternal.call(this);
	
	console.log('in goog.ui.FlashStatus disposeInternal()');
};


goog.exportSymbol('goog.ui.FlashStatus', goog.ui.FlashStatus);


