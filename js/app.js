angular.module("ohhell", ["ohhell.service", "ohhell.filter", "ohhell.controller"]).
    config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/ohhell", {templateUrl: "landing.html", controller: "LandingController"}).
        when("/ohhell/setup", {templateUrl: "setup.html", controller: "SetupController"}).
        when("/ohhell/round/:round", {templateUrl: "round.html", controller: "RoundController"}).
        when("/ohhell/scoreboard", {templateUrl: "scoreboard.html", controller: "ScoreboardController"}).
        when("/ohhell/games", {templateUrl: "savedGames.html", controller: "SavedGamesController"}).
        otherwise({redirectTo: "/ohhell"});
    }]);
