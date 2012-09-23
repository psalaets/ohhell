angular.module("ohhell.filter", []).
    //Puts a +/- on numbers that aren't 0
    filter("sign", function() {
        return function(value) {
            if(value === 0 || value) {
                if(value > 0) {
                    return "+" + value;
                } else if(value < 0) {
                    return value.toString();
                }
            }
        }
    });
