angular.module('app').config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "landing/landing.html",
      controller: "LandingController",
      resolve: {
        gameCount: function(gamesService) {
          return gamesService.count();
        }
      }
    })
    .when("/new", {
      templateUrl: "setup/setup.html",
      controller: "SetupController"
    })
    .when("/games/:gameTimestamp/rounds/:round", {
      templateUrl: "round/round.html",
      controller: "RoundController",
      resolve: {
        currentGame: function($route, gamesService) {
          var gameTimestamp = $route.current.params.gameTimestamp;
          return gamesService.find(gameTimestamp);
        }
      }
    })
    .when("/games/:gameTimestamp", {
      templateUrl: "scoreboard/scoreboard.html",
      controller: "ScoreboardController",
      resolve: {
        currentGame: function($route, gamesService) {
          var gameTimestamp = $route.current.params.gameTimestamp;
          return gamesService.find(gameTimestamp);
        }
      }
    })
    .when("/games", {
      templateUrl: "saved-games/saved-games.html",
      controller: "SavedGamesController",
      resolve: {
        allGames: function(gamesService) {
          return gamesService.all();
        }
      }
    })
    .otherwise({
      redirectTo: "/"
    });
});