define(function (require) {

	"use strict";

	// Setup temporary Google Analytics objects.
	window.GoogleAnalyticsObject = "ga";

	window.ga = function () {
		window.ga.q = (window.ga.q || []).push(arguments);
	};

	window.ga.l = new Date().getTime();

	require(["http://www.google-analytics.com/analytics.js"]);

	return window.ga;

});