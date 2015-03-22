;(function iife(angular) {
  angular.module('app.round').filter('sign', sign);

  // Puts a +/- on numbers that aren't 0
  function sign() {
    return function(value) {
      if(angular.isNumber(value)) {
        if(value > 0) {
          return "+" + value;
        } else if(value < 0) {
          return value.toString();
        }
      }
    };
  }
})(angular);