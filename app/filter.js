angular.module("app.filter", []).
    filter("upto", function() {
        return function(start, end) {
            var arr = [];
            for(var i = start; i <= end; i++) {
                arr.push(i);
            }
            return arr;
        };
    }).
    filter('timeAgo', function() {
        return function(value) {
            return 'a while ago';
        };
    });
