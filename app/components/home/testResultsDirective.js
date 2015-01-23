
angular
  .module('metaConfigConsole')
  .directive('testResults', function() {
    return {
      restrict: 'E',
      scope: {
        api: '='
      },
      templateUrl: 'app/components/home/testResults.html'
    }
  });
