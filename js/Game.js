function Game() {
    this.players = [];
}

Game.prototype.addPlayer = function(player) {
    this.players.push(player);
};

Game.prototype.getPlayers = function() {
    return this.players;
};
