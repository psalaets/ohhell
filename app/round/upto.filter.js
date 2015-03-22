;(function iife(angular) {
  angular.module('app.round').filter('upto', upto);

  function upto() {
    return function(start, end) {
      var arr = [];
      for(var i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    };
  }
})(angular);