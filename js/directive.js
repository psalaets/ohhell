angular.module('ohhell.directive', []).

directive('ohhellTrend', function() {
  return {
    restrict: 'A',
    scope: {
      // total score at each round for a player
      playerScores: '=' // accept scores array by reference
    },
    link: function(scope, element, attributes) {
      scope.$watch('playerScores', function(newValue) {
        // Make a copy
        newValue = newValue.slice(0);

        // Sneak a zero on the front so start of line looks better
        newValue.unshift(0);

        // plot scores
        $(element).sparkline(newValue, {
          fillColor: false,     // disable fill
          maxSpotColor: false,  // disable spot on max y value
          minSpotColor: false   // disable spot on min y value
        });
      });
    }
  };
});