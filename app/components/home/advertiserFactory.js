
angular
	.module('metaConfigConsole')
	.factory('advertiserFactory', ['$http', function($http) {

		var advertiserFactory = { nodejs: {}, csharp: {} };

		var urlBase = {
			nodejs: 'http://local.config-nodejs.com/api/advertisers/',
			csharp: 'http://local.config-net.com/api/advertisers/'
		};

		advertiserFactory.nodejs.getAdvertiserCount = function() {
			return $http.get(urlBase.nodejs);
		};

		advertiserFactory.nodejs.getAdvertisersWithFlorida = function() {
			return $http.get(urlBase.nodejs + 'florida');
		};

		advertiserFactory.nodejs.getNthAdvertisersWithBrand = function() {
			return $http.get(urlBase.nodejs + 'filter/50');
		};

		advertiserFactory.csharp.getAdvertiserCount = function() {
			return $http.get(urlBase.csharp);
		};

		advertiserFactory.csharp.getAdvertisersWithFlorida = function() {
			return $http.get(urlBase.csharp + '?search=florida');
		};

		advertiserFactory.csharp.getNthAdvertisersWithBrand = function() {
			return $http.get(urlBase.csharp + 'filter/?n=50');
		};

		return advertiserFactory;
	}]);
