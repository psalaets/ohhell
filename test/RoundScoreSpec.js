describe("RoundScore", function() {
    it("takes player name on creation", function() {
        var r = new RoundScore('bob');

        expect(r.getPlayer()).toEqual('bob');
    });

    it("defaults bid to 0", function() {
        var r = new RoundScore('bob');

        expect(r.getBid()).toEqual(0);
    });

    it("is reported once made/missed is known", function() {
        var r = new RoundScore('bob');

        expect(r.isReported()).toBe(false);

        r.missedBid();

        expect(r.isReported()).toBe(true);
    });

    it("doesn't have points until result is reported", function() {
        var r = new RoundScore('bob');
        r.setBid(2);

        expect(r.isReported()).toBe(false);
        expect(r.getPoints()).toBeNull();
    });

    describe("made bid", function() {
        it("has <bid> + 10 points", function() {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.madeBid();

            expect(r.getPoints()).toEqual(12);
        });
    });

    describe("missed bid", function() {
        it("has negative (<bid> + 10) points", function() {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.missedBid();

            expect(r.getPoints()).toEqual(-12);
        });
    });
});