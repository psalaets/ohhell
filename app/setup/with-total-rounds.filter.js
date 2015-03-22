;(function iife(angular) {
  angular.module('app.setup').filter('withTotalRounds', withTotalRounds);

  function withTotalRounds() {
    return function(maxRound) {
      var total = (maxRound * 2) - 1;
      var message = total === 1 ? '1 round' : total + ' rounds';

      return maxRound + ' (' + message + ')';
    }
  }
})(angular);