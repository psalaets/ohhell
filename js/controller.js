angular.module('ohhell.controller', []).

controller('LandingController', ['$scope', '$location', function($scope, $location) {
    $scope.setup = function() {
        $location.path("/ohhell/setup");
    };
}]).

controller('SetupController', ['$scope', '$location', 'gameService', function($scope, $location, gameService) {
    $scope.maxRound = 8;
    $scope.players = [];

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
        gameService.startNewGame($scope.players, $scope.maxRound);

        $location.path("/ohhell/round/+1");
    };
}]).

controller('RoundController', ['$scope', '$routeParams', '$location', 'gameService', function($scope, $routeParams, $location, gameService) {
    var roundName = $routeParams.round;
    $scope.round = gameService.currentGame.getRound(roundName);

    $scope.roundFinished = function() {
        $location.path("/ohhell/scoreboard");
    };
}]).

controller('ScoreboardController', ['$scope', '$location', 'gameService', 'summaryService', function($scope, $location, gameService, summaryService) {
    var game = gameService.currentGame;

    $scope.rounds = game.getRounds();
    $scope.stats = summaryService.generateStats(game);

    $scope.hasNextRound = function() {
        return !!game.getCurrentRound();
    };

    $scope.nextRound = function() {
        var currentRound = game.getCurrentRound();
        $location.path("/ohhell/round/" + currentRound.getName());
    };
}]);
