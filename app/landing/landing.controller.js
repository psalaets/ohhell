;(function iife(angular) {
  angular.module('app.landing').controller('LandingController', LandingController);

  function LandingController($scope, navService, gamesService) {
    $scope.savedGameCount = gamesService.all().length;

    $scope.setup = function() {
      navService.newGame();
    };

    $scope.showSavedGames = function() {
      navService.savedGames();
    };
  }
})(angular);