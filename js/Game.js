function Game(players) {
    this.rounds = [];
    this.players = players;
}

Game.prototype.start = function(highRound) {
    this.createRounds(highRound);
};

Game.prototype.createRounds = function(highRound) {
    var players = this.players.slice(0);
    players.rotate = function() {
        //rotate redefines itself on first call, hmm...
        this.rotate = function() {
            //Put first element at back
            this.push(this.shift());
            //Return copy
            return this.slice(0);
        };
        return this;
    };

    //Ascending rounds
    for(var i = 1; i < highRound; i++) {
        this.rounds.push(new Round("Round " + i, i, players.rotate()));
    }

    //High round
    this.rounds.push(new Round("Round " + highRound, highRound, players.rotate()));

    //Descending rounds
    for(var i = highRound - 1; i > 0; i--) {
        this.rounds.push(new Round("Round " + i, i, players.rotate()));
    }
};

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.getRounds = function() {
    return this.rounds;
};
