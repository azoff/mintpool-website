require(['utils/core', 'utils/dom', 'client'], function(utils, dom, client) {

	"use strict";

	var currencies = ['doge', 'mint'];
	utils.each(currencies, fetchData);

	function fetchData(currency) {
		client.get_hashrate(currency, utils.partial(applyData, currency));
		client.get_profit(currency, utils.partial(applyData, currency));
	}

	function applyData(currency, data) {
		utils.each(data, utils.partial(applyDatum, currency));
	}

	function applyDatum(currency, value, key) {
		var el = dom.body.querySelector('.' + currency + ' .' + key);
		if (el) el.innerHTML = value;
	}

});