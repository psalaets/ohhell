function Game(players) {
    this.rounds = [];
    this.players = players;
}

Game.prototype.start = function(highRound) {
    this.createRounds(highRound);
};

Game.prototype.createRounds = function(highRound) {
    //Ascending rounds
    for(var i = 1; i < highRound; i++) {
        this.rounds.push(new Round("Round " + i, i));
    }

    //High round
    this.rounds.push(new Round("Round " + highRound, highRound));

    //Descending rounds
    for(var i = highRound - 1; i > 0; i--) {
        this.rounds.push(new Round("Round " + i, i));
    }
};

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.getRounds = function() {
    return this.rounds;
};
