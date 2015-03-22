;(function iife(angular) {
  angular.module('app.saved-games').filter('sentence', sentence);

  function sentence() {
    return function(values) {
      if(values.length === 1) {
        return values[0];
      } else if(values.length === 2) {
        return values[0] + ' and ' + values[1];
      } else if(values.length > 2) {
        var valuesCopy = values.slice(0);
        var last = valuesCopy.pop();
        return valuesCopy.join(', ') + ' and ' + last.toString();
      }
    };
  }
})(angular);