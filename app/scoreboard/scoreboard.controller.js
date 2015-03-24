;(function iife(angular) {
  angular.module('app.scoreboard').controller('ScoreboardController', ScoreboardController);

  function ScoreboardController($scope, navService, summaryService, gamesService, currentGame) {
    $scope.rounds = currentGame.getRounds();
    $scope.stats = summaryService.generateStats(currentGame);

    $scope.hasNextRound = function() {
      return currentGame.roundsLeft();
    };

    $scope.nextRound = function() {
      navService.currentRound(currentGame);
    };

    $scope.done = function() {
      gamesService.remove(currentGame).then(function() {
        navService.landingPage();
      });
    };
  }
})(angular);