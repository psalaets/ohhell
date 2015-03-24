;(function iife(angular) {
  angular.module('app.services').factory('gamesService', gamesService);

  function gamesService($localForage, Game) {
    var games = [];

    return {
      all: function() {
        var games = [];

        return $localForage.iterate(function(value, key) {
          if (isGame(key)) {
            games.push(Game.fromJson(value));
          }
        }).then(function() {
          // most recent first
          return games.sort(function(g1, g2) {
            return g2.startTime - g1.startTime;
          });
        });
      },
      count: function() {
        return this.all().then(function(games) {
          return games.length;
        });
      },
      save: function(game) {
        return $localForage.setItem(keyFor(game), game).then(function() {
          return game;
        });
      },
      remove: function(game) {
        return $localForage.removeItem(keyFor(game));
      },
      find: function(gameTimestamp) {
        return $localForage.getItem(timestampToKey(gameTimestamp)).then(function(loadedGame) {
          return Game.fromJson(loadedGame);
        });
      }
    };

    function keyFor(game) {
      return timestampToKey(game.startTime);
    }

    function timestampToKey(timestamp) {
      return 'game-' + timestamp;
    }

    function isGame(key) {
      return key.indexOf('game-') == 0;
    }
  }
})(angular);