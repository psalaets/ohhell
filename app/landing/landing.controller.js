;(function iife(angular) {
  angular.module('app.landing').controller('LandingController', LandingController);

  function LandingController($scope, navService, gameCount) {
    $scope.savedGameCount = gameCount;

    $scope.setup = function() {
      navService.newGame();
    };

    $scope.showSavedGames = function() {
      navService.savedGames();
    };
  }
})(angular);