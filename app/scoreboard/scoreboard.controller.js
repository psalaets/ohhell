;(function iife(angular) {
  angular.module('app.scoreboard').controller('ScoreboardController', ScoreboardController);

  function ScoreboardController($scope, $routeParams, navService, summaryService, gamesService) {
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = gamesService.find(gameTimestamp);

    $scope.rounds = game.getRounds();
    $scope.stats = summaryService.generateStats(game);

    $scope.hasNextRound = function() {
      return game.roundsLeft();
    };

    $scope.nextRound = function() {
      navService.currentRound(game);
    };

    $scope.done = function() {
      gamesService.remove(game);
      navService.landingPage();
    };
  }
})(angular);