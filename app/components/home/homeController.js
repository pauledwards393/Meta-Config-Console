
angular
	.module('metaConfigConsole')
	.controller('HomeController', ['$scope', 'advertiserFactory', function($scope, advertiserFactory) {

		var TestCollection = function(apiCalls) {

			var self = this;

			var init = function() {
				self.tests =
					Object.keys(apiCalls).map(function(element) {
						return {
							api: apiCalls[element]
						}
					});
				self.duration = [];
			}

			init();
		};

		TestCollection.prototype = {

			resetTests: function() {

				var self = this;

				if (self.tests.length === 0)
					return;

				self.tests.forEach(function(test) {
					Object.keys(test).forEach(function(key) {
						if (key !== 'api')
							delete test[key];
					});
				});
			},

			runTestsNTimes: function(n) {

				var self = this;

				if (self.tests.length === 0)
					return;

				var runCounter = 0;

				var performAllTests = function() {

					self.resetTests();

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
								else {

									// Update duration
									self.duration.push(self.tests.reduce(function(a, b) {
										return {
											duration: a.duration + b.duration
										}
									}));

									runCounter++;

									if (runCounter < n)
										performAllTests();
								}
							})
							.error(function(error) {
								console.log(error);
							});
						}

					performTest(0);
				}

				performAllTests();
			}
		};

		var home = this;

		home.testRuns = 5;
		home.nodejs = home.csharp = {};

		home.runNodejsTests = function() {
			home.nodejs = new TestCollection(advertiserFactory.nodejs);
			home.nodejs.runTestsNTimes(home.testRuns);
		};

		home.runCSharpTests = function() {
			home.csharp = new TestCollection(advertiserFactory.csharp);
			home.csharp.runTestsNTimes(home.testRuns);
		};

	}]);
