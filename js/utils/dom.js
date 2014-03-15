define('utils/dom', ['utils/core'], function(utils){

	"use strict";

	var exports = {};

	var ElementProto = Element.prototype;

	exports.win  = window;
	exports.html = window.frameElement;
	exports.doc  = document;
	exports.body = document.body;

	var vendorProp = exports.vendorProp = function(obj, propName, fallback) {
		if (!utils.isUndefined(obj[propName])) return obj[propName];
		var foundProp = null, propSuffix = propName.substr(0, 1).toUpperCase() + propName.substr(1);
		utils.each(['ms', 'moz', 'webkit', 'o'], function(prefix){
			var vendorPropName = prefix + propSuffix;
			if (utils.isUndefined(obj[vendorPropName])) return true;
			foundProp = obj[vendorPropName];
			return false;
		});
		return utils.isUndefined(foundProp) ? fallback : foundProp;
	};

	var nativeMatches = ElementProto.matches || vendorProp(ElementProto, 'matchesSelector');

	var matches = exports.matches = function(el, selector) {
		return nativeMatches.call(el, selector);
	};

	var closest = exports.closest = function(el, selector) {
		if (el === document) return null;
		return (el === null || matches(el, selector)) ? el : closest(el.parentNode, selector);
	};

	exports.toElement = function(html) {
		var div = document.createElement('div');
		div.innerHTML = utils.trim(html);
		return div.childNodes[0];
	};

	exports.loadScript = function(src) {
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
	};

	var on = exports.on = function(el, type, selector, listener) {

		if (utils.isArray(type)) {
			utils.each(type, function(type) { on(el, type, selector, listener); });
			return el;
		}

		listener = utils.isUndefined(listener) ? selector : listener;
		if (selector === listener)
			el.addEventListener(type, listener, false);
		else
			el.addEventListener(type, function(event){
				event.delegate = closest(event.target, selector);
				return (event.delegate) ? listener(event) : true;
			}, false);

		return el;

	};

	return exports;

});