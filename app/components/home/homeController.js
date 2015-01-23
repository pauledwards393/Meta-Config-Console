
angular
	.module('metaConfigConsole')
	.controller('HomeController', ['$scope', 'advertiserFactory', function($scope, advertiserFactory) {

		var TestCollection = function(title, apiCalls, testRuns) {

			var self = this;

			self.duration = [];
			self.testRuns = testRuns;
			self.tests =
				Object.keys(apiCalls).map(function(element) {
					return { api: apiCalls[element] }
				});
			self.title = title;
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

			runTestsNTimes: function() {

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

									// Update overall duration collection
									self.duration.push(self.tests.reduce(function(a, b) {
										return {
											duration: a.duration + b.duration
										}
									}));

									runCounter++;

									if (runCounter < self.testRuns)
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

		var testRuns = 5;
		var home = this;

		home.nodejs = new TestCollection('node.js', advertiserFactory.nodejs, testRuns);
		home.csharp = new TestCollection('C#', advertiserFactory.csharp, testRuns);

	}]);
