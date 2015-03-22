;(function iife(angular) {
  angular.module('app.services').factory('navService', navService);

  function navService($location) {
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
  }
})(angular);