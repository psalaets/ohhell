function RoundScore(player) {
    this.player = player;
    this.bid = 0;
    //Not set to anything until we get an answer
    this.gotBid = null;
}

RoundScore.prototype = {
    getPlayer: function() {
        return this.player;
    },
    setBid: function(bid) {
        this.bid = bid;
    },
    getBid: function() {
        return this.bid;
    },
    madeBid: function() {
        this.gotBid = true;
    },
    missedBid: function() {
       this.gotBid = false;
    },
    getPoints: function() {
        if(this.isReported()) {
            return (10 + this.bid) * (this.gotBid ? 1 : -1);
        }
        return null;
    },
    isReported: function() {
        return this.gotBid !== null;
    }
};
