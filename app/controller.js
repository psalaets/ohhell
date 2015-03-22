angular.module('ohhell.controller', []).

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
