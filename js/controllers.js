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

        $location.path("/ohhell/round/current");
    };
}

function RoundController($scope, $routeParams, gameService) {
    var roundName = $routeParams.round;
    if(roundName === "current") {
        $scope.round = gameService.currentGame.getCurrentRound();
    } else {
        $scope.round = gameService.currentGame.getRound(roundName);
    }

    $scope.nextRound = function() {
        $scope.round = gameService.currentGame.getCurrentRound();
    };

    //Helper for populating bid select
    $scope.zeroTo = function(max) {
        var values = [];
        for(var i = 0; i <= max; i++) {
            values.push(i);
        }
        return values;
    };
}
