
angular
	.module('metaConfigConsole')
	.controller('HomeController', ['$scope', 'advertiserFactory', function($scope, advertiserFactory) {

		$scope.nodejs = $scope.csharp = {};

		var TestCollection = function(apiCalls) {

			var self = this;

			var init = function() {
				self.tests =
					Object.keys(apiCalls).map(function(element) {
						return {
							api: apiCalls[element]
						}
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
			$scope.nodejs = new TestCollection(advertiserFactory.nodejs);
			$scope.nodejs.runTests();
		};

		$scope.runCSharpTests = function() {
			$scope.csharp = new TestCollection(advertiserFactory.csharp);
			$scope.csharp.runTests();
		};

	}]);
