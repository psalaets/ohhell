;(function iife(angular) {
  angular.module('app.round').controller('RoundController', RoundController);

  function RoundController($scope, $routeParams, navService, gamesService) {
    var roundId = $routeParams.round;
    var gameTimestamp = $routeParams.gameTimestamp;

    var currentGame;

    gamesService.find(gameTimestamp).then(function(game) {
      currentGame = game;
      $scope.round = game.getRound(parseInt(roundId, 10));
    });

    $scope.roundFinished = function() {
      gamesService.save(currentGame).then(function(game) {
        navService.scoreboard(game);
      });
    };

    $scope.everyoneGotIt = function() {
      $scope.round.allScoresMadeBid();
    };
  }
})(angular);