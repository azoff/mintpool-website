define('client', ['utils/core', 'utils/xhr'], function(utils, xhr){

	"use strict";

	var exports = {};
	var url = 'http://mintpool.us/api.php';

	var rpc = exports.rpc = function(command, cb) {
		xhr.jsonp(url+"?api="+command, cb);
	};

	exports.get_profit    = utils.partial(rpc, 'get_profit');
	exports.get_exchanged = utils.partial(rpc, 'get_exchanged');
	exports.get_hashrate  = utils.partial(rpc, 'get_hashrate');

	return exports;

});