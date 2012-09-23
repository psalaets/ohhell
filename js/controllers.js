function LandingController($scope, $location) {
    $scope.setup = function() {
        $location.path("/ohhell/setup");
    };
}

function SetupController($scope, $location, gameService) {
    $scope.maxRound = 8;
    $scope.players = [];

    $scope.startGame = function() {
        gameService.startNewGame($scope.players, $scope.maxRound);

        $location.path("/ohhell/round/+1");
    };
}

function RoundController($scope, $routeParams, $location, gameService) {
    var roundName = $routeParams.round;
    $scope.round = gameService.currentGame.getRound(roundName);

    $scope.roundFinished = function() {
        $location.path("/ohhell/scoreboard");
    };
}

function ScoreboardController($scope, $location, gameService, summaryService) {
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

}
