requirejs.config({ enforceDefine: false });

require(['utils/ga'], function(ga){

	"use strict";

	ga('create', 'UA-48822342-1', document.domain);
	ga('send', 'pageview');

});