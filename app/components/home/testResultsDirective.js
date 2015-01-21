
angular
  .module('metaConfigConsole')
  .directive('testResults', function() {
    return {
      restrict: 'E',
      scope: {
        results: '=',
        title: '@',
        fn: '&'
      },
      templateUrl: 'app/components/home/testResults.html'
    }
  });
