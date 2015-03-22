;(function iife(angular) {
  angular.module('app.models').factory('Round', RoundWrapper);

  function RoundWrapper(RoundScore) {
    function Round(id, name, maxTricks, dealer) {
      this.id = id;
      this.name = name;
      this.maxTricks = maxTricks;
      this.dealer = dealer;
    }

    Round.create = function(id, name, maxTricks, players) {
      var round = new Round(id, name, maxTricks, players[0]);

      round.scores = players.map(function(player) {
        return new RoundScore(player);
      });

      return round;
    };

    Round.fromJson = function(json) {
      var round = new Round(
        json.id,
        json.name,
        json.maxTricks,
        json.dealer
      );

      round.scores = json.scores.map(function(scoreJson) {
        return RoundScore.fromJson(scoreJson);
      });

      return round;
    };

    var p = Round.prototype;

    p.getId = function() {
      return this.id;
    };

    p.getName = function() {
      return this.name;
    };

    p.getMaxTricks = function() {
      return this.maxTricks;
    };

    p.getDealer = function() {
      return this.dealer;
    };

    p.getScores = function() {
      return this.scores;
    };

    p.getScore = function(player) {
      return this.scores.filter(function(score) {
        return score.getPlayer() === player;
      })[0] || null;
    };

    p.isFinished = function() {
      return this.scores.every(function(score) {
        return score.isReported();
      });
    };

    p.getTotalBids = function() {
      return this.scores.reduce(function(total, score) {
        return total + score.getBid();
      }, 0);
    };

    p.allScoresMadeBid = function() {
      this.scores.forEach(function(score) {
        score.madeBid();
      });
    };

    p.toJson = function() {
      return {
        id: this.id,
        name: this.name,
        maxTricks: this.maxTricks,
        dealer: this.dealer,
        scores: this.scores.map(function(score) {
          return score.toJson();
        })
      };
    };

    return Round;
  }
})(angular);