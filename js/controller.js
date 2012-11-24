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

controller('SetupController', ['$scope', 'navService', 'Game', 'storageService', function($scope, navService, Game, storageService) {
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
        var game = Game.create($scope.players, $scope.maxRound);
        storageService.save(game);
        navService.currentRound(game);
    };
}]).

controller('SavedGamesController', ['$scope', 'navService', 'storageService', function($scope, navService, storageService) {
    $scope.savedGames = storageService.all();

    $scope.resume = function(game) {
        if(game.roundsLeft()) {
            navService.currentRound(game);
        } else {
            navService.scoreboard(game);
        }

    }
}]).

controller('RoundController', ['$scope', '$routeParams', 'navService', 'storageService', function($scope, $routeParams, navService, storageService) {
    var roundId = $routeParams.round;
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = storageService.find(gameTimestamp);
    $scope.round = game.getRound(parseInt(roundId, 10));

    $scope.roundFinished = function() {
        storageService.save(game);
        navService.scoreboard(game);
    };

    $scope.everyoneGotIt = function() {
        $scope.round.allScoresMadeBid();
    };
}]).

controller('ScoreboardController', ['$scope', '$routeParams', 'navService', 'summaryService', 'storageService', function($scope, $routeParams, navService, summaryService, storageService) {
    var gameTimestamp = $routeParams.gameTimestamp;

    var game = storageService.find(gameTimestamp);

    $scope.rounds = game.getRounds();
    $scope.stats = summaryService.generateStats(game);

    $scope.hasNextRound = function() {
        return game.roundsLeft();
    };

    $scope.nextRound = function() {
        navService.currentRound(game);
    };

    $scope.done = function() {
        storageService.remove(game);
        navService.landingPage();
    };
}]);
