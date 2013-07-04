angular.module('ohhell.directive', []).

directive('ohhellTrend', function() {
  return {
    restrict: 'A',
    scope: {
      // total score at each round for a player
      playerScores: '=', // by reference
      // lowest score for any player, at any point in the game
      minScore: '@', // by value
      // highest score for any player, at any point in the game
      maxScore: '@' // by value
    },
    link: function(scope, element, attributes) {
      // Not sure if this is needed
      function everythingAvailable() {
        return scope.minScore !== undefined
          && scope.maxScore !== undefined
          && scope.playerScores !== undefined;
      }

      scope.$watch(function() {
        return everythingAvailable();
      }, function(showPlot) {
        if (showPlot) {
          // plot scores
          $(element).sparkline(scope.playerScores, {
            fillColor: false,     // disable fill
            maxSpotColor: false,  // disable spot on max y value
            minSpotColor: false   // disable spot on min y value
          });
        }
      });
    }
  };
});