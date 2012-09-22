function Round(name, tricks, players) {
    this.name = name;
    this.tricks = tricks;
    this.dealer = players[0];

    this.scores = [];
    for(var i = 0; i < players.length; i++) {
        this.scores.push(new RoundScore(players[i]));
    }
}

Round.prototype.getName = function() {
    return this.name;
};

Round.prototype.getTricks = function() {
    return this.tricks;
};

Round.prototype.getDealer = function() {
    return this.dealer;
};

Round.prototype.getScores = function() {
    return this.scores;
};

Round.prototype.getScore = function(player) {
    for(var i = 0; i < this.scores.length; i++) {
        if(this.scores[i].getPlayer() === player) {
            return this.scores[i];
        }
    }
    return null;
};

Round.prototype.isReported = function() {
    for(var i = 0; i < this.scores.length; i++) {
        if(!this.scores[i].isReported()) {
            return false;
        }
    }
    return true;
};
