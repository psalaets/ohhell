describe("RoundScore", function() {

    beforeEach(module("ohhell.model"));

    it("takes player name on creation", inject(function(RoundScore) {
        var r = new RoundScore('bob');

        expect(r.getPlayer()).toEqual('bob');
    }));

    it("defaults bid to 0", inject(function(RoundScore) {
        var r = new RoundScore('bob');

        expect(r.getBid()).toEqual(0);
    }));

    it("is reported once made/missed is known", inject(function(RoundScore) {
        var r = new RoundScore('bob');

        expect(r.isReported()).toBe(false);

        r.missedBid();

        expect(r.isReported()).toBe(true);
    }));

    it("doesn't have points until result is reported", inject(function(RoundScore) {
        var r = new RoundScore('bob');
        r.setBid(2);

        expect(r.isReported()).toBe(false);
        expect(r.getPoints()).toBeNull();
    }));

    it("can convert to json-ready object", inject(function(RoundScore) {
        var r = new RoundScore('bob');
        r.setBid(2);
        r.madeBid();

        var json = r.toJson();

        expect(json.bid).toEqual(2);
        expect(json.gotBid).toEqual(true);
        expect(json.player).toEqual('bob');
    }));

    it('can be created with object from json', inject(function(RoundScore) {
        var json = {
            bid: 2,
            gotBid: false,
            player: 'bob'
        };

        var score = RoundScore.fromJson(json);

        expect(score.getBid()).toEqual(2);
        expect(score.gotBid).toEqual(false);
        expect(score.getPlayer()).toEqual('bob');
    }));

    describe("made bid", function() {
        it("has <bid> + 10 points", inject(function(RoundScore) {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.madeBid();

            expect(r.getPoints()).toEqual(12);
        }));
    });

    describe("missed bid", function() {
        it("has negative (<bid> + 10) points", inject(function(RoundScore) {
            var r = new RoundScore('bob');
            r.setBid(2);
            r.missedBid();

            expect(r.getPoints()).toEqual(-12);
        }));
    });
});