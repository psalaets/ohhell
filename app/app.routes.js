angular.module('app').config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "landing/landing.html",
      controller: "LandingController"
    })
    .when("/new", {
      templateUrl: "setup/setup.html",
      controller: "SetupController"
    })
    .when("/games/:gameTimestamp/rounds/:round", {
      templateUrl: "round.html",
      controller: "RoundController"
    })
    .when("/games/:gameTimestamp", {
      templateUrl: "scoreboard.html",
      controller: "ScoreboardController"
    })
    .when("/games", {
      templateUrl: "saved-games/saved-games.html",
      controller: "SavedGamesController"
    })
    .otherwise({
      redirectTo: "/"
    });
});