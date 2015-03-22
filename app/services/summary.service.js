;(function iife(angular) {
  angular.module('app.services').factory('summaryService', summaryService);

  function summaryService() {
    return {
      //stats: scores, total, player, rank
      generateStats: function(game) {
        var stats = game.getPlayers().map(function(player) {
          return this.generateStat(player, game);
        }, this);
        this.rank(stats);
        return stats;
      },
      generateStat: function(player, game) {
        var stat = {
          player: player,
          scores: game.getScores(player)
        };

        this.total(stat);
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
      }
    };
  }
})(angular);