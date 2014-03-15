define('pages/instructors', ['utils/core', 'utils/dom', 'utils/anim'], function(utils, dom, anim){

	"use strict";

	var exports = {};
	var barHeight = 40;

	function open(event) {
		var el = event.delegate;
		var content = event.currentTarget;
		el.classList.add('open');
		content.classList.add('locked');
		anim.scrollTo(el.offsetTop-barHeight, content);
		el.style.height = (content.offsetHeight - barHeight).toString() + 'px';
		anim.startLoader(el.querySelector('.loader'));
		event.preventDefault();
		event.stopImmediatePropagation();
		event.stopPropagation();
		return false;
	}

	function close(event) {
		var el = dom.closest(event.delegate, '.table-view-cell');
		var content = event.currentTarget;
		el.classList.remove('open');
		content.classList.remove('locked');
		el.removeAttribute('style');
		anim.stopLoader(el.querySelector('.loader'));
		event.preventDefault();
		event.stopImmediatePropagation();
		event.stopPropagation();
		return false;
	}

	exports.init = function(content) {
		dom.on(content, 'click', '.table-view-cell:not(.open)', open);
		dom.on(content, 'click', '.table-view-cell.open .closer', close);
	};

	return exports;

});