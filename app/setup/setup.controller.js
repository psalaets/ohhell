;(function(angular) {
  angular.module('app.setup').controller('SetupController', SetupController);

  function SetupController($scope, navService, Game, gamesService) {
    $scope.maxRound = 8;
    $scope.maxRoundAllowed = 8;
    $scope.players = [];

    $scope.addPlayer = function(name) {
      if(name) {
        $scope.players.push(name);
        $scope.playerName = '';
      }
    };

    //Remove by array index
    $scope.removePlayerAtPosition = function(index) {
      $scope.players.splice(index, 1);
    };

    $scope.$watch("players.length", function(newValue, oldValue, scope) {
      if(newValue < 2) {
        scope.message = "Need at least two players to begin";
        scope.needMorePlayers = true;
      } else {
        scope.message = "";
        scope.needMorePlayers = false;
      }
    });

    $scope.startGame = function() {
      var game = Game.create($scope.players, $scope.maxRound);
      gamesService.save(game);
      navService.currentRound(game);
    };
  }
})(angular);