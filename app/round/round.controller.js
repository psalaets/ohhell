;(function iife(angular) {
  angular.module('app.round').controller('RoundController', RoundController);

  function RoundController($scope, $routeParams, navService, gamesService, currentGame) {
    var roundId = $routeParams.round;
    $scope.round = currentGame.getRound(parseInt(roundId, 10));

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