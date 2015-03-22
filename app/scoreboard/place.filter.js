;(function iife(angular) {
  angular.module('app.scoreboard').filter('place', place);

  function place() {
    var placeSuffixes = {
      "1": "st",
      "2": "nd",
      "3": "rd",
      "11": "th",
      "12": "th",
      "13": "th"
    };

    return function(value) {
      return value + (placeSuffixes[value] || "th");
    }
  }
})(angular);