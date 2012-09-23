angular.module("ohhell.service", []).
    factory("gameService", function() {
        return {
            currentGame: null,
            startNewGame: function(players, maxRound) {
                this.currentGame = new Game(players, maxRound);
            }
        };
    });
