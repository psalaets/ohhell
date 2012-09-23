angular.module("ohhell", ["ohhell.service", "ohhell.filter"]).
    config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/ohhell", {templateUrl: "landing.html", controller: LandingController}).
        when("/ohhell/setup", {templateUrl: "setup.html", controller: SetupController}).
        when("/ohhell/round/:round", {templateUrl: "round.html", controller: RoundController}).
        when("/ohhell/summary", {templateUrl: "summary.html", controller: SummaryController}).
        otherwise({redirectTo: "/ohhell"});
    }]);
