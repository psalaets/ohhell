angular.module('ohhell.controller', []).

controller('LandingController', ['$scope', '$location', 'storageService', function($scope, $location, storageService) {
    $scope.savedGameCount = storageService.all().length;

    $scope.setup = function() {
        $location.path("/ohhell/setup");
    };
}]).

controller('SetupController', ['$scope', '$location', 'gameService', function($scope, $location, gameService) {
    $scope.maxRound = 8;
    $scope.maxRoundAllowed = 8;
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

        $location.path("/ohhell/round/1");
    };
}]).

controller('SavedGamesController', ['$scope', '$location', 'gameService', 'storageService', function($scope, $location, gameService, storageService) {
    $scope.savedGames = storageService.all();
}]).

controller('RoundController', ['$scope', '$routeParams', '$location', 'gameService', 'storageService', function($scope, $routeParams, $location, gameService, storageService) {
    var roundId = $routeParams.round;
    $scope.round = gameService.currentGame.getRound(parseInt(roundId, 10));

    $scope.roundFinished = function() {
        storageService.save(gameService.currentGame);
        $location.path("/ohhell/scoreboard");
    };

    $scope.everyoneGotIt = function() {
        $scope.round.allScoresMadeBid();
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
        $location.path("/ohhell/round/" + currentRound.getId());
    };
}]);
