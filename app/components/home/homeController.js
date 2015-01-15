
angular
	.module('metaConfigConsole')
	.controller('HomeController', ['$scope', 'advertiserFactory', function($scope, advertiserFactory) {

		$scope.nodejs = $scope.csharp = {};

		var TestCollection = function(apiCalls) {

			var self = this;

			self.tests = [];

			var init = function() {
				apiCalls.forEach(function(element) {
					self.tests.push({ api: element });
				});
			}

			init();
		};

		TestCollection.prototype = {

			runTests: function() {

				var self = this;

				if (self.tests.length === 0)
					return;

				var performTest = function(index) {

					var test = self.tests[index];

					test.startTime = performance.now();

					test
						.api()
						.success(function(result) {

							test.value = result;
							test.endTime = performance.now();
							test.duration = (test.endTime - test.startTime) / 1000;

							index++;

							if (index <= self.tests.length - 1)
								performTest(index);
							else
								self.duration = self.tests.reduce(function(a, b) {
									return {
										duration: a.duration + b.duration
									}
								});
						})
						.error(function(error) {
							console.log(error);
						});
					}

				performTest(0);
			}
		};

		$scope.runNodejsTests = function() {

			var api = advertiserFactory.nodejs;

			$scope.nodejs = new TestCollection([
				api.getAdvertiserCount,
				api.getAdvertisersWithFlorida,
				api.getNthAdvertisersWithBrand
			]);

			$scope.nodejs.runTests();
		};
	}]);
