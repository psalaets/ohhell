;(function iife(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.bid = 0;
    //Not set to anything until we get an answer
    this.gotBid = null;
  }

  //Expects object just parsed from json string
  RoundScore.fromJson = function(json) {
    var score = new RoundScore(json.player);
    score.bid = json.bid;
    score.gotBid = json.gotBid;
    return score;
  };

  var p = RoundScore.prototype;

  p.getPlayer = function() {
    return this.player;
  };

  p.setBid = function(bid) {
    this.bid = bid;
  };

  p.getBid = function() {
    return this.bid;
  };

  p.madeBid = function() {
    this.gotBid = true;
  };

  p.missedBid = function() {
    this.gotBid = false;
  };

  p.getPoints = function() {
    if(this.isReported()) {
        return (10 + this.bid) * (this.gotBid ? 1 : -1);
    }
    return null;
  };

  p.isReported = function() {
    return this.gotBid !== null;
  };

  p.toJson = function() {
    return {
      bid: this.bid,
      gotBid: this.gotBid,
      player: this.player
    };
  };
})(angular);