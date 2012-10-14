(function(angular) {

    angular.module('ohhell.model', []).
        constant('RoundScore', RoundScore).
        constant('Round', Round).
        constant('Game', Game);

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
        },
        toJson: function() {
            return {
                bid: this.bid,
                gotBid: this.gotBid,
                player: this.player
            };
        }
    };

    function Round(id, name, maxTricks, dealer) {
        this.id = id;
        this.name = name;
        this.maxTricks = maxTricks;
        this.dealer = dealer;
    }

    Round.create = function(id, name, maxTricks, players) {
        var round = new Round(id, name, maxTricks);

        round.dealer = players.slice(-1)[0];
        round.scores = players.map(function(player) {
            return new RoundScore(player);
        });

        return round;
    };

    Round.prototype = {
        getId: function() {
            return this.id;
        },
        getName: function() {
            return this.name;
        },
        getMaxTricks: function() {
            return this.maxTricks;
        },
        getDealer: function() {
            return this.dealer;
        },
        getScores: function() {
            return this.scores;
        },
        getScore: function(player) {
            return this.scores.filter(function(score) {
                return score.getPlayer() === player;
            })[0] || null;
        },
        isFinished: function() {
            return this.scores.every(function(score) {
                return score.isReported();
            });
        },
        getTotalBids: function() {
            return this.scores.reduce(function(total, score) {
                return total + score.getBid();
            }, 0);
        },
        allScoresMadeBid: function() {
            this.scores.forEach(function(score) {
                score.madeBid();
            });
        },
        toJson: function() {
            return {
                id: this.id,
                name: this.name,
                maxTricks: this.maxTricks,
                dealer: this.dealer,
                scores: this.scores.map(function(score) {
                    return score.toJson();
                })
            };
        }
    };

    function Game() {
        this.players = [];
        this.rounds = [];
    }

    Game.create = function(players, highRound) {
        var game = new Game();

        game.players = players;
        createRounds(game, highRound);

        return game;
    };

    function createRounds(game, highRound) {
        //Rotatable copy of players array
        var players = game.players.slice(0);
        players.rotate = function() {
            //Put first element at back
            this.push(this.shift());
            //Return copy
            return this.slice(0);
        };

        var roundId = 0;
        function nextId() {
            roundId += 1;
            return roundId;
        }

        game.rounds = [].concat(
            createAscendingRounds(nextId, highRound, players),
            createHighRound(nextId,highRound, players),
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

    Game.prototype = {
        getPlayers: function() {
            return this.players;
        },
        getRounds: function() {
           return this.rounds;
        },
        getRound: function(id) {
            return this.rounds.filter(function(round) {
                return round.getId() === id;
            })[0] || null;
        },
        getCurrentRound: function() {
            return this.rounds.filter(function(round) {
                return !round.isFinished();
            })[0] || null;
        },
        isFinished: function() {
            return this.rounds.every(function(round) {
                return round.isFinished();
            });
        },
        getScores: function(player) {
            return this.rounds.map(function(round) {
                return round.getScore(player);
            });
        },
        toJson: function() {
            return {
                players: this.players,
                rounds: this.rounds.map(function(round) {
                    return round.toJson();
                })
            };
        }
    };
})(angular);
