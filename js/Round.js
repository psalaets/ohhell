function Round(name, tricks, players) {
    this.name = name;
    this.tricks = tricks;
    this.dealer = players[0];
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
