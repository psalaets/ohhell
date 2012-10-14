describe("Round", function() {

    beforeEach(module("ohhell.model"));

    it("is named on creation", inject(function(Round) {
        var r = Round.create(1, "round 1", 1, ['bob', 'joe']);

        expect(r.getName()).toEqual("round 1");
    }));

    it("knows max number of tricks", inject(function(Round) {
        var r = Round.create(1, "round", 4, ['bob', 'joe']);

        expect(r.getMaxTricks()).toEqual(4);
    }));

    it("makes last player the dealer", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        expect(r.getDealer()).toEqual('joe');
    }));

    it("has a score for each player", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        expect(scores[0].getPlayer()).toEqual('bob');
        expect(scores[1].getPlayer()).toEqual('joe');
    }));

    it("is finished once all scores are reported", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        var scores = r.getScores();

        scores[0].madeBid();

        expect(r.isFinished()).toEqual(false);

        scores[1].missedBid();

        expect(r.isFinished()).toEqual(true);
    }));

    it("can return score for given player", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        var score = r.getScore('joe');

        expect(score.getPlayer()).toEqual('joe');
    }));

    it("returns null when finding score for unknown player", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        expect(r.getScore('tommy')).toBeNull();
    }));

    it("knows total bids made", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);
        var scores = r.getScores();

        scores[0].setBid(2);
        scores[1].setBid(1);

        expect(r.getTotalBids()).toEqual(3);
    }));

    it("can bulk flag all scores as 'Made Bid'", inject(function(Round) {
        var r = Round.create(1, "round", 3, ['bob', 'joe']);

        r.allScoresMadeBid();

        var scores = r.getScores();
        expect(scores[0].gotBid).toEqual(true);
        expect(scores[1].gotBid).toEqual(true);
    }));

    it("can convert to json-ready object", inject(function(Round) {
        var r = Round.create(1, 'round', 3, ['bob', 'joe']);

        var json = r.toJson();

        expect(json.id).toEqual(1);
        expect(json.name).toEqual('round');
        expect(json.maxTricks).toEqual(3);
        expect(json.dealer).toEqual('joe');
        expect(json.scores.length).toEqual(2);
    }));

    it('can be created with object from json', inject(function(Round) {
        var json = {
            id: 5,
            name: 'Round',
            maxTricks: 6,
            dealer: 'bob',
            scores: [{
                player: 'joe',
                bid: 2,
                gotBid: false
            }, {
                player: 'bob',
                bid: 3,
                gotBid: null
            }]
        };

        var round = Round.fromJson(json);

        expect(round.getId()).toEqual(5);
        expect(round.getName()).toEqual('Round');
        expect(round.getMaxTricks()).toEqual(6);
        expect(round.dealer).toEqual('bob');
        expect(round.getScores().length).toEqual(2);
    }));
});