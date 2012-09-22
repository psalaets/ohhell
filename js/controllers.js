function GameController($scope) {
    $scope.game = new Game(['bob', 'joe', 'tom']);
    $scope.game.start(3);

    //Helper for populating bid select
    $scope.zeroTo = function(max) {
        var values = [];
        for(var i = 0; i <= max; i++) {
            values.push(i);
        }
        return values;
    };
}
