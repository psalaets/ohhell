describe("Round", function() {

    beforeEach(module("ohhell.model"));

    it("is named on creation", inject(function(Round) {
        var r = new Round("round 1", 1, ['bob', 'joe']);

        expect(r.getName()).toEqual("round 1");
    }));

    it("knows max number of tricks", inject(function(Round) {
        var r = new Round("round", 4, ['bob', 'joe']);

        expect(r.getMaxTricks()).toEqual(4);
    }));

    it("makes first player the dealer", inject(function(Round) {
        var r = new Round("round", 3, ['bob', 'joe']);

        expect(r.getDealer()).toEqual('bob');
    }));

    it("has a score for each player", inject(function(Round) {
        var r = new Round("round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        expect(scores[0].getPlayer()).toEqual('bob');
        expect(scores[1].getPlayer()).toEqual('joe');
    }));

    it("is finished once all scores are reported", inject(function(Round) {
        var r = new Round("round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        scores[0].madeBid();

        expect(r.isFinished()).toEqual(false);

        scores[1].missedBid();

        expect(r.isFinished()).toEqual(true);
    }));

    it("can return score for given player", inject(function(Round) {
        var r = new Round("round", 3, ['bob', 'joe']);

        var score = r.getScore('joe');

        expect(score.getPlayer()).toEqual('joe');
    }));

    it("returns null when finding score for unknown player", inject(function(Round) {
        var r = new Round("round", 3, ['bob', 'joe']);

        expect(r.getScore('tommy')).toBeNull();
    }));
});
