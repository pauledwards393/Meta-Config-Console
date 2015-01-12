
angular
	.module('metaConfigConsole')
	.factory('advertiserFactory', ['$http', function($http) {

		var advertiserFactory = { nodejs: {} };

		var urlBase = {
			nodejs: 'http://local.meta-config-service.com/api/advertisers/'
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

		return advertiserFactory;
	}]);
