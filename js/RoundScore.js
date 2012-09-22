function RoundScore(player) {
    this.player = player;
    this.bid = 0;
    //Not set to anything until we get an answer
    this.gotBid = null;
}

RoundScore.prototype.getPlayer = function() {
    return this.player;
};

RoundScore.prototype.setBid = function(bid) {
    this.bid = bid;
};

RoundScore.prototype.getBid = function() {
    return this.bid;
};

RoundScore.prototype.madeBid = function() {
    this.gotBid = true;
};

RoundScore.prototype.missedBid = function() {
    this.gotBid = false;
};

RoundScore.prototype.getPoints = function() {
    if(this.isReported()) {
        return (10 + this.bid) * (this.gotBid ? 1 : -1);
    }
    return null;
};

RoundScore.prototype.isReported = function() {
    return this.gotBid !== null;
};
