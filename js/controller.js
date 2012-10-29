angular.module('ohhell.controller', []).

controller('LandingController', ['$scope', 'navService', 'storageService', function($scope, navService, storageService) {
    $scope.savedGameCount = storageService.all().length;

    $scope.setup = function() {
        navService.newGame();
    };

    $scope.showSavedGames = function() {
        navService.savedGames();
    };
}]).

controller('SetupController', ['$scope', 'navService', 'gameService', function($scope, navService, gameService) {
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
        navService.currentRound(gameService.currentGame);
    };
}]).

controller('SavedGamesController', ['$scope', 'navService', 'gameService', 'storageService', function($scope, navService, gameService, storageService) {
    $scope.savedGames = storageService.all();

    $scope.resume = function(game) {
        gameService.currentGame = game;
        navService.currentRound(game);
    }
}]).

controller('RoundController', ['$scope', '$routeParams', 'navService', 'gameService', 'storageService', function($scope, $routeParams, navService, gameService, storageService) {
    var roundId = $routeParams.round;
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = storageService.find(gameTimestamp);
    gameService.currentGame = game;

    $scope.round = gameService.currentGame.getRound(parseInt(roundId, 10));

    $scope.roundFinished = function() {
        storageService.save(gameService.currentGame);
        navService.scoreboard(gameService.currentGame);
    };

    $scope.everyoneGotIt = function() {
        $scope.round.allScoresMadeBid();
    };
}]).

controller('ScoreboardController', ['$scope', '$routeParams', 'navService', 'gameService', 'summaryService', 'storageService', function($scope, $routeParams, navService, gameService, summaryService, storageService) {
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = storageService.find(gameTimestamp);
    gameService.currentGame = game;

    $scope.rounds = game.getRounds();
    $scope.stats = summaryService.generateStats(game);

    $scope.hasNextRound = function() {
        return !!game.getCurrentRound();
    };

    $scope.nextRound = function() {
        navService.currentRound(game);
    };

    $scope.done = function() {
        storageService.remove(game);
        navService.landingPage();
    };
}]);
