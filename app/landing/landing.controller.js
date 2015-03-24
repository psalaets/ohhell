;(function iife(angular) {
  angular.module('app.landing').controller('LandingController', LandingController);

  function LandingController($scope, navService, gamesService) {
    gamesService.count().then(function(count) {
      $scope.savedGameCount = count;
    });

    $scope.setup = function() {
      navService.newGame();
    };

    $scope.showSavedGames = function() {
      navService.savedGames();
    };
  }
})(angular);