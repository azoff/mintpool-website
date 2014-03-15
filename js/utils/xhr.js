define('utils/xhr', ['utils/dom'], function(dom){

	"use strict";

	var Ajax = XMLHttpRequest;

	var exports = {};

	var execute = exports.execute = function(options) {
		var request = new Ajax();
		request.open(options.method, options.url, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400)
				if (options.success) options.success(request.responseText, request);
			else if (options.error)
				options.error(request.status, request);
		};
		request.onerror = function(status) {
			if (options.error)
				options.error(status, request);
		};
		request.send();
	};

	exports.get = function(url, success) {
		return execute({ url: url, method: 'GET', success: success });
	};

	exports.post = function(url, success) {
		return execute({ url: url, method: 'POST', success: success });
	};

	exports.jsonp = function(url, success) {
		var script = dom.doc.createElement('script');
		var rnd = 'cb' + Math.random().toString().substr(2);
		window[rnd] = success;
		script.src = url + '&callback=' + rnd;
		dom.body.appendChild(script);
	};

	return exports;

});