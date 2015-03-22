;(function iife(angular) {
  angular.module('app.services').factory('gamesService', gamesService);

  function gamesService() {
    var games = [];

    return {
      all: function() {
        return games;
      },
      save: function(game) {
        games.push(game);
      },
      remove: function(game) {
        games = games.filter(function(g) {
          return g.startTime != game.startTime;
        });
      },
      find: function(gameTimestamp) {
        return games.filter(function(g) {
          return g.startTime == gameTimestamp;
        })[0] || null;
      }
    };
  }
})(angular);