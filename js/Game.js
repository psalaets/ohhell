function Game(players, highRound) {
    this.players = players;

    this.rounds = [];
    this.createRounds(highRound);
}

Game.prototype = {
    createRounds: function(highRound) {
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
    },
    createAscendingRounds: function(highRound, players) {
        for(var i = 1; i < highRound; i++) {
            this.rounds.push(new Round("+" + i, i, players.rotate()));
        }
    },
    createHighRound: function(highRound, players) {
        this.rounds.push(new Round(highRound.toString(), highRound, players.rotate()));
    },
    createDescendingRounds: function(highRound, players) {
        for(var i = highRound - 1; i > 0; i--) {
            this.rounds.push(new Round("-" + i, i, players.rotate()));
        }
    },
    getPlayers: function() {
        return this.players;
    },
    getRounds: function() {
       return this.rounds;
    },
    getRound: function(name) {
        return this.rounds.filter(function(round) {
            return round.getName() === name;
        })[0] || null;
    },
    getCurrentRound: function() {
        return this.rounds.filter(function(round) {
            return !round.isReported();
        })[0] || null;
    },
    isFinished: function() {
        return this.rounds.every(function(round) {
            return round.isReported();
        });
    },
    getScores: function(player) {
        return this.rounds.map(function(round) {
            return round.getScore(player);
        });
    }
};
