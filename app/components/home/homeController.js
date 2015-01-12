
angular
	.module('metaConfigConsole')
	.controller('HomeController', ['$scope', 'advertiserFactory', function($scope, advertiserFactory) {

		$scope.nodejs = {};

		var handleError = function(error) {
			console.log(error);
		};

		var test = function(startTime) {
			this.startTime = startTime;
			this.endTime = startTime;
		}

		test.prototype.duration = function() {
			if (this.startTime === this.endTime)
				return;

			return (this.endTime - this.startTime) / 1000;
		};
		
		$scope.runNodejsTests = function() {

			$scope.nodejs = { tests: [] };

			// Test 1
			var test1 = new test(performance.now());

			advertiserFactory
				.nodejs
				.getAdvertiserCount()
				.success(function(result) {

					test1.value = result;
					test1.endTime = performance.now();

					$scope.nodejs.tests.push(test1);

					// Test 2
					var test2 = new test(performance.now());

					advertiserFactory
						.nodejs
						.getAdvertisersWithFlorida()
						.success(function(result) {

							test2.value = result;
							test2.endTime = performance.now();

							$scope.nodejs.tests.push(test2);

							// Test 3
							var test3 = new test(performance.now());

							advertiserFactory
								.nodejs
								.getNthAdvertisersWithBrand()
								.success(function(result) {

									test3.value = result;
									test3.endTime = performance.now();

									$scope.nodejs.tests.push(test3);

									// Overall duration of tests
									$scope.nodejs.duration = $scope.nodejs.tests.reduce(function(a, b) {
										return {
											duration: function() {
												return a.duration() + b.duration();
											}
										};
									});
								})
								.error(handleError);
						})
						.error(handleError);
				})
				.error(handleError);
		};

	}]);
