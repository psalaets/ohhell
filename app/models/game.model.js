;(function iife(angular) {
  angular.module('app.models').factory('Game', GameWrapper);

  function GameWrapper(Round) {
    function Game() {
      this.players = [];
      this.rounds = [];
      this.startTime = Date.now();
    }

    Game.create = function(players, highRound) {
      var game = new Game();

      game.players = players;
      createRounds(game, highRound);

      return game;
    };

    Game.fromJson = function(json) {
      var game = new Game();
      game.startTime = json.startTime;
      game.players = json.players;
      game.rounds = json.rounds.map(function(roundJson) {
        return Round.fromJson(roundJson);
      });
      return game;
    };

    function createRounds(game, highRound) {
      //Rotatable copy of players array
      var players = game.players.slice(0);
      players.rotate = function() {
        //rotate redefines itself on first call, hmm...
        this.rotate = function() {
          //Put first element at back
          this.push(this.shift());
          //Return copy
          return this.slice(0);
        };
        return this;
      };

      var roundId = 0;
      function nextId() {
        roundId += 1;
        return roundId;
      }

      game.rounds = [].concat(
        createAscendingRounds(nextId, highRound, players),
        createHighRound(nextId, highRound, players),
        createDescendingRounds(nextId, highRound, players)
      );
    }

    function createAscendingRounds(nextId, highRound, players) {
      var rounds = [];
      for(var i = 1; i < highRound; i++) {
        rounds.push(Round.create(nextId(), i.toString(), i, players.rotate()));
      }
      return rounds;
    }

    function createHighRound(nextId, highRound, players) {
      return Round.create(nextId(), highRound.toString(), highRound, players.rotate());
    }

    function createDescendingRounds(nextId,highRound, players) {
      var rounds = [];
      for(var i = highRound - 1; i > 0; i--) {
        rounds.push(Round.create(nextId(), i.toString(), i, players.rotate()));
      }
      return rounds;
    }

    var p = Game.prototype;

    p.getPlayers = function() {
      return this.players;
    };

    p.getRounds = function() {
      return this.rounds;
    };

    p.getRound = function(id) {
      return this.rounds.filter(function(round) {
        return round.getId() === id;
      })[0] || null;
    };

    p.getCurrentRound = function() {
      return this.rounds.filter(function(round) {
        return !round.isFinished();
      })[0] || null;
    };

    p.isFinished = function() {
      return this.rounds.every(function(round) {
        return round.isFinished();
      });
    };

    p.getScores = function(player) {
      return this.rounds.map(function(round) {
        return round.getScore(player);
      });
    };

    p.toJson = function() {
      return {
        players: this.players,
        rounds: this.rounds.map(function(round) {
          return round.toJson();
        }),
        startTime: this.startTime
      };
    };

    p.roundsLeft = function() {
      return this.rounds.filter(function(round) {
        return !round.isFinished();
      }).length;
    };

    return Game;
  }
})(angular);