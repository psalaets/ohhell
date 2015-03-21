angular.module('ohhell.controller', []).

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
