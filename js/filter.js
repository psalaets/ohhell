angular.module("ohhell.filter", []).
    //Puts a +/- on numbers that aren't 0
    filter("sign", function() {
        return function(value) {
            if(angular.isNumber(value)) {
                if(value > 0) {
                    return "+" + value;
                } else if(value < 0) {
                    return value.toString();
                }
            }
        }
    }).
    filter("upto", function() {
        return function(start, end) {
            var arr = [];
            for(var i = start; i <= end; i++) {
                arr.push(i);
            }
            return arr;
        };
    }).
    filter("place", function() {
        var placeSuffixes = {
            "1": "st",
            "2": "nd",
            "3": "rd"
        };

        return function(value) {
            return value + (placeSuffixes[value] || "th");
        }
    }).
    filter('sentence', function() {
        return function(values) {
            if(values.length === 1) {
                return values[0];
            } else if(values.length === 2) {
                return values[0] + ' and ' + values[1];
            } else if(values.length > 2) {
                var valuesCopy = values.slice(0);
                var last = valuesCopy.pop();
                return valuesCopy.join(', ') + ' and ' + last.toString();
            }
        };
    }).
    filter('timeAgo', function() {
        var vtime = vagueTime;

        return function(value) {
            return vtime.get({
                from: value,
                units: 'ms'
            });
        };
    }).
    filter('withTotalRounds', function() {
        return function(maxRound) {
            var total = (maxRound * 2) - 1;
            var message = total === 1 ? '1 round' : total + ' total rounds';

            return maxRound + ' (' + message + ')';
        }
    });
