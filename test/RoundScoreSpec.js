describe("RoundScore", function() {
    it("should take player on creation", function() {
        var r = new RoundScore('bob');

        expect(r.getPlayer()).toEqual('bob');
    });

    it("should not have a score if bid is unknown", function() {
        var r = new RoundScore('bob');
        r.madeBid();

        expect(r.getPoints()).toBeNull();
    });

    it("should not have a score if made/missed is unknown", function() {
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