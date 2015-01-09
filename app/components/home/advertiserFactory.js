
angular
	.module('metaConfigConsole')
	.factory('advertiserFactory', ['$http', function($http) {
	
		var advertiserFactory = {};

		advertiserFactory.nodejs = {};

		var urlBase = 'http://local.meta-config-service.com/api/advertisers/';

		advertiserFactory.nodejs.getAdvertiserCount = function() {
			return $http.get(urlBase);
		};

		advertiserFactory.nodejs.getAdvertisersWithFlorida = function() {
			return $http.get(urlBase + 'florida');
		}

		return advertiserFactory;
	}]);