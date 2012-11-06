

goog.provide('goog.ui.Loading');


goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Component');

/**
 * @param elm_or_id {String|HTMLElement}
 * @param opt_base_url {String} web base url.
 * @param opt_center {bool} whether on center position.
 * @constructor
 * @extends {goog.ui.Component}
 * @param opt_place_inner
 * @param opt_domHelpers
 * @param opt_addClass
 */
goog.ui.Loading = function(elm_or_id, opt_base_url, opt_place_inner, opt_center, opt_addClass, opt_domHelpers){
	goog.ui.Component.call(this, opt_domHelpers);
	
	var elm;
	
	if(typeof elm_or_id == 'string'){
		elm = goog.dom.getElement(elm_or_id);
	}
	else{
		elm = elm_or_id;
	}

    this.addClass_ = opt_addClass
	
	this.orig_elm = elm;
	this.base_url_ = opt_base_url;
	this.opt_place_inner_ = opt_place_inner || false;
    this.opt_center = opt_center || false;
	this.decorateInternal(this.orig_elm);
};

goog.inherits(goog.ui.Loading, goog.ui.Component);


goog.ui.Loading.prototype.decorateInternal = function(element){
	goog.ui.Loading.superClass_.decorateInternal.call(this, element);
	
	var wrapper = this.dom_.createElement(this.opt_center ? 'div' : 'span'),
		anim = this.dom_.createElement('span');

    if(this.addClass_){
        goog.dom.classes.add(wrapper, this.addClass_)
    }

    // copy wrapper style from orig elm style
    wrapper.style.cssText = this.orig_elm.style.cssText;

    if(this.opt_center)
        goog.style.setStyle(wrapper,{'text-align':'center'})

	if(this.opt_place_inner_){
		this.orig_innerHTML = this.orig_elm.innerHTML;
		this.orig_elm.innerHTML = '';
		this.orig_elm.appendChild(wrapper);
	}
	else{
		goog.dom.insertSiblingBefore(wrapper, this.orig_elm);
        goog.style.showElement(this.orig_elm, false)
	}

	if(this.base_url_){
		anim.innerHTML = '<img src="' + this.base_url_ + goog.ui.Loading.gif_file_ + '"/>';
	}else{
		anim.innerHTML = '<img src="' + this.gif_file_ +'" />';
	}

	wrapper.appendChild(anim);
	
	this.wrapper_ = wrapper;
	
};


goog.ui.Loading.prototype.restoreAll_ = function(){
	this.orig_elm.style.removeProperty('display');
	goog.dom.removeNode( this.wrapper_ );
	if(this.opt_place_inner_){
		this.orig_elm.innerHTML = this.orig_innerHTML;
	}
};

goog.ui.Loading.gif_file_ = '/img/loading-bar.gif';

goog.ui.Loading.prototype.restore = goog.ui.Loading.prototype.restoreAll_;

goog.ui.Loading.prototype.replace = function(new_elm){
	if(typeof new_elm == 'string'){
		new_elm = goog.dom.htmlToDocumentFragment(new_elm);
	}
	goog.dom.insertSiblingAfter(new_elm, this.wrapper_);
	goog.dom.removeNode(this.wrapper_);
	goog.dom.removeNode(this.orig_elm);
};

goog.ui.Loading.prototype.disposeInternal = function(){
	goog.ui.Loading.superClass_.disposeInternal.call(this);
	this.restoreAll_();
};

goog.ui.Loading.prototype.getWrapper = function(){
    return this.wrapper_;
}


goog.exportSymbol('goog.ui.Loading', goog.ui.Loading);


