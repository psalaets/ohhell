;(function iife(angular) {
  angular.module('app.round').controller('RoundController', RoundController);

  function RoundController($scope, $routeParams, navService, gamesService) {
    var roundId = $routeParams.round;
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = gamesService.find(gameTimestamp);
    $scope.round = game.getRound(parseInt(roundId, 10));

    $scope.roundFinished = function() {
      gamesService.save(game);
      navService.scoreboard(game);
    };

    $scope.everyoneGotIt = function() {
      $scope.round.allScoresMadeBid();
    };
  }
})(angular);