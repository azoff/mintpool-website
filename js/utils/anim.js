define('utils/anim', ['utils/core', 'utils/dom'], function(utils, dom){

	"use strict";

	var exports = {};
	var lastTime = 0;

	var tick   = exports.tick = dom.vendorProp(dom.win, 'requestAnimationFrame', fallbackRequestAnimationFrame);
	var cancel = exports.cancel = dom.vendorProp(dom.win, 'cancelAnimationFrame', fallbackCancelAnimationFrame);

	var loop = exports.loop = function(render) {
		var frame = tick(utils.partial(loop, render));
		if (render(frame) === false)
			cancel(frame);
	};

	exports.scrollTo = function(top, context) {
		context = utils.isUndefined(context) ? dom.win : context;
		var lastTop = context.scrollTop;
		loop(function(){
			var delta = Math.min(Math.abs(top - context.scrollTop), 20);
			context.scrollTop = top > context.scrollTop ? (context.scrollTop+delta) : (context.scrollTop-delta);
			if (lastTop === context.scrollTop) return false;
			lastTop = context.scrollTop;
			return context.scrollTop !== top && context.scrollTop >= 0 && context.scrollTop <= context.scrollHeight;
		});
	};

	exports.startLoader = function(el) {
		clearTimeout(el.loaderTimeout);
		el.classList.add('active');
		el.classList.add('visible');
		loopLoader(el);
	};

	exports.stopLoader = function(el) {
		clearTimeout(el.loaderTimeout);
		el.classList.remove('visible');
		el.loaderTimeout = setTimeout(function(){
			el.classList.remove('active');
		}, 1500);
	};

	function loopLoader(el) {
		el.classList.toggle('visible');
		el.loaderTimeout = setTimeout(utils.partial(loopLoader, el), 1500);
	}

	function fallbackRequestAnimationFrame(callback) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	}

	function fallbackCancelAnimationFrame(id) {
		clearTimeout(id);
	}

	return exports;

});