;(function iife(angular) {
  angular.module('app.scoreboard').controller('ScoreboardController', ScoreboardController);

  function ScoreboardController($scope, $routeParams, navService, summaryService, gamesService) {
    var gameTimestamp = $routeParams.gameTimestamp;

    var currentGame;

    gamesService.find(gameTimestamp).then(function(game) {
      currentGame = game;

      $scope.rounds = game.getRounds();
      $scope.stats = summaryService.generateStats(game);

      $scope.hasNextRound = function() {
        return currentGame.roundsLeft();
      };
    });

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