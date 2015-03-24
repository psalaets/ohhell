;(function iife(angular, vagueTime) {
  angular.module('app.saved-games').filter('timeAgo', timeAgo);

  function timeAgo() {
    return function(value) {
      return vagueTime.get({
        to: value,
        units: 'ms'
      });
    };
  }
})(angular, vagueTime);