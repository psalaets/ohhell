function Round(name, maxTricks, players) {
    this.name = name;
    this.maxTricks = maxTricks;
    this.dealer = players[0];

    this.scores = players.map(function(player) {
        return new RoundScore(player);
    });
}

Round.prototype = {
    getName: function() {
        return this.name;
    },
    getMaxTricks: function() {
        return this.maxTricks;
    },
    getDealer: function() {
        return this.dealer;
    },
    getScores: function() {
        return this.scores;
    },
    getScore: function(player) {
        return this.scores.filter(function(score) {
            return score.getPlayer() === player;
        })[0] || null;
    },
    isFinished: function() {
        return this.scores.every(function(score) {
            return score.isReported();
        });
    }
};
