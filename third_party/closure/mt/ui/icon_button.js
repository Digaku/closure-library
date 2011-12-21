
goog.provide("mt.ui.IconButton");
goog.provide("mt.ui.IconButtonRenderer");

goog.require('goog.dom');
goog.require('goog.ui.Control');
//goog.require('goog.ui.decorate');
goog.require('goog.ui.ControlRenderer');
//goog.require('goog.ui.CustomButton');
//goog.require('goog.ui.Css3ButtonRenderer');

// Define a simple custom renderer for the third control.
mt.ui.IconButtonRenderer = function(icon_class) {
    this.icon_class = icon_class;
  goog.ui.ControlRenderer.call(this);
}
goog.inherits(mt.ui.IconButtonRenderer, goog.ui.ControlRenderer);

// See goog.ui.ControlRenderer#createDom for documentation.
mt.ui.IconButtonRenderer.prototype.createDom = function(control) {

  var baseClass = this.getCssClass();
  var classNames = this.getClassNamesForState(control.getState());
  var dom = control.dom_;
  var elmInnerIcon = dom.createDom("div", this.icon_class);
  var elmBase = dom.createDom("div", goog.ui.INLINE_BLOCK_CLASSNAME + " " + baseClass, elmInnerIcon);
  elmBase.setAttribute("title", control.getContent());
  //elmBase.appendChild(control);
  return elmBase;

  //return dom.htmlToDocumentFragment('<div title="Click here!" class="' + baseClass + ' icon-pencil"></div><div>' + control.getContent().innerHTML + '</div>');
    /*
  return dom.createDom('div', classNames.join(' '),
      dom.createDom('div', baseClass + '-outer-box',
          dom.createDom('div', baseClass + '-inner-box',
              dom.createDom('div', baseClass + '-content',
                  dom.createDom('span', 'icon-pencil',
                    control.getContent())))));*/
};

// See goog.ui.ControlRenderer#decorate for documentation.
mt.ui.IconButtonRenderer.prototype.decorate = function(control, element) {
  var baseClass = this.getCssClass();
  var dom = control.dom_;
    element.setAttribute("style", "float: left");
    element.appendChild(dom.createDom("div", "clear-both"));
   return mt.ui.IconButtonRenderer.superClass_.decorate.call(this, control, element);
   /*
  element.appendChild(
      dom.createDom('div', baseClass + '-outer-box',
          dom.createDom('div', baseClass + '-inner-box',
              dom.createDom('div', baseClass + '-content',
                  element.childNodes))));
  return mt.ui.MtIconButtonRenderer.superClass_.decorate.call(this, control,
      element);*/
};

// See goog.ui.ControlRenderer#getContent for documentation.
mt.ui.IconButtonRenderer.prototype.getContent = function(element) {
  if (element) {
    return mt.ui.IconButtonRenderer.superClass_.getContent.call(this,
        goog.dom.getElementsByTagNameAndClass('div',
            this.getCssClass() + '-content', element)[0]);
  }
  return null;
};

// See goog.ui.ControlRenderer#setContent for documentation.
mt.ui.IconButtonRenderer.prototype.setContent = function(element, content) {
  if (element) {
    return mt.ui.IconButtonRenderer.superClass_.setContent.call(this,
        goog.dom.getElementsByTagNameAndClass('div',
            this.getCssClass() + '-content', element)[0],
        content);
  }
};

// See goog.ui.ControlRenderer#getCssClass for documentation.
mt.ui.IconButtonRenderer.prototype.getCssClass = function() {
  return 'mt-ctl';
};

/**
 * A custom button control.  Identical to {@link goog.ui.Button}, except it
 * defaults its renderer to {@link mt.ui.IconButtonRenderer}.  One could
 * just as easily pass {@code goog.ui.CustomButtonRenderer.getInstance()} to
 * the {@link goog.ui.Button} constructor and get the same result.  Provided
 * for convenience.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM
 *    structure to display as the button's caption.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *    document interaction.
 * @constructor
 * @extends {goog.ui.Button}
 */
mt.ui.IconButton = function(content, icon_class, opt_domHelper) {
  goog.ui.Button.call(this, content, new mt.ui.IconButtonRenderer(icon_class), opt_domHelper);
};
goog.inherits(mt.ui.IconButton, goog.ui.Button);

