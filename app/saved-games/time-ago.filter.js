;(function iife(angular) {
  angular.module('app.saved-games').filter('timeAgo', timeAgo);

  function timeAgo() {
    return function(value) {
      return 'a while ago';
    };
  }
})(angular);