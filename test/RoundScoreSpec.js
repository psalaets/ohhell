describe("RoundScore", function() {
    it("should take player on creation", function() {
        var r = new RoundScore('bob');

        expect(r.getPlayer()).toEqual('bob');
    });

    it("should default bid to 0", function() {
        var r = new RoundScore('bob');

        expect(r.getBid()).toEqual(0);
    });

    it("is reported once made/missed is known", function() {
        var r = new RoundScore('bob');

        expect(r.isReported()).toBe(false);

        r.missedBid();

        expect(r.isReported()).toBe(true);
    });

    it("should not have points if not reported", function() {
        var r = new RoundScore('bob');
        r.setBid(2);

        expect(r.getPoints()).toBeNull();
    });

    describe("made bid", function() {
        it("should have <bid> + 10 points", function() {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.madeBid();

            expect(r.getPoints()).toEqual(12);
        });
    });

    describe("missed bid", function() {
        it("should have negative (<bid> + 10) points", function() {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.missedBid();

            expect(r.getPoints()).toEqual(-12);
        });
    });
});