angular.module("ohhell", ["ohhell.service", "ohhell.filter", "ohhell.controller"]).
    config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/", {templateUrl: "landing.html", controller: "LandingController"}).
        when("/new", {templateUrl: "setup.html", controller: "SetupController"}).
        when("/games/:gameTimestamp/rounds/:round", {templateUrl: "round.html", controller: "RoundController"}).
        when("/games/:gameTimestamp", {templateUrl: "scoreboard.html", controller: "ScoreboardController"}).
        when("/games", {templateUrl: "savedGames.html", controller: "SavedGamesController"}).
        otherwise({redirectTo: "/"});
    }]);
