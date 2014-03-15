require(['utils/core', 'utils/dom', 'client'], function(utils, dom, client) {

	"use strict";

	client.get_hashrate(applyData);
	client.get_profit(applyData);

	function applyData(data) {
		utils.each(data, applyDatum);
	}

	function applyDatum(value, key) {
		var el = dom.body.querySelector('.' + key);
		if (el) el.innerHTML = value;
	}

});