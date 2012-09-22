function Game(players) {
    this.rounds = [];
    this.players = players;
}

Game.prototype.start = function(highRound) {
    this.createRounds(highRound);
};

Game.prototype.createRounds = function(highRound) {
    //Rotatable copy of players array
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

    this.createAscendingRounds(highRound, players);
    this.createHighRound(highRound, players);
    this.createDescendingRounds(highRound, players);
};

Game.prototype.createAscendingRounds = function(highRound, players) {
    for(var i = 1; i < highRound; i++) {
        this.rounds.push(new Round("Round " + i, i, players.rotate()));
    }
};

Game.prototype.createHighRound = function(highRound, players) {
    this.rounds.push(new Round("Round " + highRound, highRound, players.rotate()));
};

Game.prototype.createDescendingRounds = function(highRound, players) {
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

Game.prototype.getCurrentRound = function() {
    return this.rounds.filter(function(round) {
        return !round.isReported();
    })[0] || null;
};

Game.prototype.isFinished = function() {
    return this.rounds.every(function(round) {
        return round.isReported();
    });
};