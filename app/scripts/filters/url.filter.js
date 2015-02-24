(function() {
	'use strict';

	angular
		.module('angularSimpleNews')
		.filter('hostnameFromUrl', hostnameFromUrl);


	function hostnameFromUrl() {
		return function(text) {
			var url = document.createElement('a');
			url.href = text;
			return url.hostname;
		};
	}
})();