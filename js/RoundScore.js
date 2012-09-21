function RoundScore(player) {
    this.player = player;
    //Not set to anything until we get an answer
    this.gotBid = null;
    this.bid = null;
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
    if(this.bid !== null && this.gotBid !== null) {
        return (10 + this.bid) * (this.gotBid ? 1 : -1);
    }
    return null;
};
