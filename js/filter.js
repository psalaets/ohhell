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
    });
