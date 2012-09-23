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
    });
