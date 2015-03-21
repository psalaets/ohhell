angular.module("ohhell.service", ["ohhell.model"]).
    /*
     * Local data layout:
     * games - game JSONs keyed by game start time
     */
    factory('storageService', ['Game', function(Game) {
        //Grab loStorage's storage global
        var store = storage;

        function loadGamesHash() {
            return store.get('games');
        }

        function saveGamesHash(hash) {
            return store.set('games', hash);
        }

        //Make sure games hash exists
        saveGamesHash(loadGamesHash() || {});

        return {
            //returns array of games
            all: function() {
                var hash = loadGamesHash();
                var games = [];

                for (var i in hash) {
                    games.push(hash[i]);
                }

                return games.map(function(gameJson) {
                    return Game.fromJson(gameJson);
                });
            },
            save: function(game) {
                var hash = loadGamesHash();
                hash[game.startTime] = game.toJson();
                saveGamesHash(hash);
            },
            remove: function(game) {
                var hash = loadGamesHash();
                delete hash[game.startTime];
                saveGamesHash(hash);
            },
            find: function(gameTimestamp) {
                var hash = loadGamesHash();
                var gameJson = hash[gameTimestamp];
                return gameJson && Game.fromJson(gameJson);
            }
        };
    }]).
    factory('navService', ['$location', function($location) {
        var base = '/';

        //Join some segments with slash with 'base path' at the front
        function join(/* segments */) {
            var segments = Array.prototype.slice.call(arguments, 0);
            return base + segments.join('/');
        }

        return {
            landingPage: function() {
                $location.path(base);
            },
            newGame: function() {
                $location.path(join('new'));
            },
            savedGames: function() {
                $location.path(join('games'));
            },
            scoreboard: function(game) {
                $location.path(join('games', game.startTime));
            },
            currentRound: function(game) {
                var currentRound = game.getCurrentRound();
                this.round(game, currentRound.getId());
            },
            round: function(game, roundId) {
                $location.path(join('games', game.startTime, 'rounds', roundId));
            }
        };
    }]).
    factory("summaryService", function() {
        return {
            //stats: scores, total, player, rank
            generateStats: function(game) {
                var thisService = this;
                var stats = game.getPlayers().map(function(player) {
                    return thisService.generateStat(player, game);
                });
                this.rank(stats);
                return stats;
            },
            generateStat: function(player, game) {
                var stat = {
                    player: player,
                    scores: game.getScores(player)
                };

                this.total(stat);
                this.streak(stat);

                return stat;
            },
            //assumes stats have total
            rank: function(stats) {
                //sort by total, descending
                stats.sort(function(s1, s2) {
                    return s2.total - s1.total;
                });

                stats.forEach(function(stat, index, array) {
                    //If prev stat has same total, thats a tie, use prev stat's rank
                    var previousStat = array[index - 1];
                    if(previousStat && previousStat.total === stat.total) {
                        stat.rank = previousStat.rank;
                    } else {
                        //otherwise highest rank possible is number of stats in before this stat + 1
                        stat.rank = index + 1;
                    }
                });
            },
            //assumes stat has scores
            total: function(stat) {
                stat.total = stat.scores.reduce(function(total, score) {
                    if(score.isReported()) {
                        return total + score.getPoints();
                    }
                    return total;
                }, 0);
            },
            //assumes stat has scores
            streak: function(stat) {
                //get results of reported scores
                var roundResults = [];
                stat.scores.forEach(function(score) {
                    if(score.isReported()) {
                        roundResults.push(score.gotBid);
                    }
                });

                //go backwards over them and count until made/missed changes
                roundResults.reverse();

                var mostRecentResult = null;
                var count = 0;

                for(var i = 0; i < roundResults.length; i++) {
                    if(mostRecentResult === null) {
                        mostRecentResult = roundResults[i];
                        count++;
                    } else if(mostRecentResult === roundResults[i]) {
                        count++;
                    } else {
                        break;
                    }
                }

                stat.streak = (mostRecentResult ? "Got " : "Missed ") + count;
            }
        };
    });