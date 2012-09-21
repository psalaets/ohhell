function Round(name, tricks) {
    this.name = name;
    this.tricks = tricks;
}

Round.prototype.getName = function() {
    return this.name;
};

Round.prototype.getTricks = function() {
    return this.tricks;
};
