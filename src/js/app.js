require(['utils/dom'], function(dom){

	"use strict";

	requirejs.config({ enforceDefine: false });

	function main() {
		require(['ratchet']);
		requireController();
		dom.win.addEventListener('push', requireController);
	}

	function requireController() {
		var content = dom.body.querySelector('.content');
		var controller = content.dataset.controller;
		if (!controller) return;
		require([controller], function(module){
			runController(content, module);
		});
	}

	function runController(content, module) {
		if (!module.init)
			throw new Error('Controller '+ content.dataset.src +' is missing an init method');
		module.init(content);
	}

	main();

});