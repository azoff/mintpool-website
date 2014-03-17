define('client', ['utils/core', 'utils/xhr'], function(utils, xhr){

	"use strict";

	var exports = {};
	var url = 'http://mintpool.us';

	var rpc = exports.rpc = function(currency, command, cb) {
		xhr.jsonp(url+"/"+currency+"/api.php?api="+command, cb);
	};

	exports.get_profit    = utils.partial(rpc, '?', 'get_profit');
	exports.get_exchanged = utils.partial(rpc, '?', 'get_exchanged');
	exports.get_hashrate  = utils.partial(rpc, '?', 'get_hashrate');

	return exports;

});