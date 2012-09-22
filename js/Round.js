function Round(name, maxTricks, players) {
    this.name = name;
    this.maxTricks = maxTricks;
    this.dealer = players[0];

    this.scores = players.map(function(player) {
        return new RoundScore(player);
    });
}

Round.prototype.getName = function() {
    return this.name;
};

Round.prototype.getMaxTricks = function() {
    return this.maxTricks;
};

Round.prototype.getDealer = function() {
    return this.dealer;
};

Round.prototype.getScores = function() {
    return this.scores;
};

Round.prototype.getScore = function(player) {
    return this.scores.filter(function(score) {
        return score.getPlayer() === player;
    })[0] || null;
};

Round.prototype.isReported = function() {
    return this.scores.every(function(score) {
        return score.isReported();
    });
};
