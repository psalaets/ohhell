angular.module("app.filter", []).
    filter('timeAgo', function() {
        return function(value) {
            return 'a while ago';
        };
    });
