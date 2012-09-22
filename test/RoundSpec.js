describe("Round", function() {
    it("should be named on creation", function() {
        var r = new Round("round 1", 1, ['bob', 'joe']);

        expect(r.getName()).toEqual("round 1");
    });

    it("should have a number of tricks", function() {
        var r = new Round("round", 4, ['bob', 'joe']);

        expect(r.getTricks()).toEqual(4);
    });

    it("should make first player the dealer", function() {
        var r = new Round("round", 3, ['bob', 'joe']);

        expect(r.getDealer()).toEqual('bob');
    });

    it("should have a score for each player", function() {
        var r = new Round("round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        expect(scores[0].getPlayer()).toEqual('bob');
        expect(scores[1].getPlayer()).toEqual('joe');
    });

    it("is reported once made/missed is known for all scores", function() {
        var r = new Round("round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        scores[0].madeBid();

        expect(r.isReported()).toEqual(false);

        scores[1].missedBid();

        expect(r.isReported()).toEqual(true);
    });
});
