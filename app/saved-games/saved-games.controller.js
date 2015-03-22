;(function iife(angular) {
  angular.module('app.saved-games').controller('SavedGamesController', SavedGamesController);

  function SavedGamesController($scope, navService, gamesService) {
    $scope.savedGames = gamesService.all();

    $scope.resume = function(game) {
        if(game.roundsLeft()) {
            navService.currentRound(game);
        } else {
            navService.scoreboard(game);
        }

    };

    $scope.roundsLeftPluralizations = {
      '1': '{} round remaining',
      'other': '{} rounds remaining'
    };
  }
})(angular);