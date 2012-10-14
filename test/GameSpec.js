describe("Game", function() {

    beforeEach(module("ohhell.model"));

    it("keeps players in the order given", inject(function(Game) {
        var game = Game.create(['bob', 'tom'], 2);

        expect(game.getPlayers()).toEqual(['bob', 'tom']);
    }));

    it("has enough rounds to play to highRound and back down to 1", inject(function(Game) {
        var game = Game.create(['bob'], 8);

        expect(game.getRounds().length).toEqual(15);
    }));

    it("creates rounds with incrementing numeric ids", inject(function(Game) {
        var game = Game.create(['bob'], 3),
            rounds = game.getRounds();

        expect(rounds[0].getId()).toEqual(1);
        expect(rounds[1].getId()).toEqual(2);
        expect(rounds[2].getId()).toEqual(3);
        expect(rounds[3].getId()).toEqual(4);
        expect(rounds[4].getId()).toEqual(5);
    }));

    it("creates rounds with correct number of max tricks", inject(function(Game) {
        var game = Game.create(['bob'], 3),
            rounds = game.getRounds();

        expect(rounds[0].getMaxTricks()).toEqual(1);
        expect(rounds[1].getMaxTricks()).toEqual(2);
        expect(rounds[2].getMaxTricks()).toEqual(3);
        expect(rounds[3].getMaxTricks()).toEqual(2);
        expect(rounds[4].getMaxTricks()).toEqual(1);
    }));

    it("names rounds based on max tricks", inject(function(Game) {
        var game = Game.create(['bob'], 3),
            rounds = game.getRounds();

        expect(rounds[0].getName()).toEqual("1");
        expect(rounds[1].getName()).toEqual("2");
        expect(rounds[2].getName()).toEqual("3");
        expect(rounds[3].getName()).toEqual("2");
        expect(rounds[4].getName()).toEqual("1");
    }));

    it("rotates players as dealer", inject(function(Game) {
        var game = Game.create(['abe', 'ben', 'cal'], 4),
            rounds = game.getRounds();

        expect(rounds[0].getDealer()).toEqual('abe');
        expect(rounds[1].getDealer()).toEqual('ben');
        expect(rounds[2].getDealer()).toEqual('cal');
        expect(rounds[3].getDealer()).toEqual('abe');
        expect(rounds[4].getDealer()).toEqual('ben');
        expect(rounds[5].getDealer()).toEqual('cal');
        expect(rounds[6].getDealer()).toEqual('abe');
    }));

    it("considers current round to be earliest round that is not finished", inject(function(Game) {
        var game = Game.create(['abe', 'ben'], 2),
            rounds = game.getRounds();

        //play first round
        rounds[0].getScores().forEach(function(score) {
            score.setBid(1);
            score.madeBid();
        });

        expect(game.getCurrentRound()).toBe(rounds[1]);
    }));

    it("returns null for current round if all rounds are finished", inject(function(Game) {
        var game = Game.create(['abe', 'ben'], 2),
            rounds = game.getRounds();

        //play all rounds
        rounds.forEach(function(round) {
            round.getScores().forEach(function(score) {
                score.setBid(1);
                score.madeBid();
            });
        });

        expect(game.getCurrentRound()).toBeNull();
    }));

    it("is finished once all rounds are finished", inject(function(Game) {
        var game = Game.create(['abe', 'ben'], 2),
            rounds = game.getRounds();

        //play all rounds
        rounds.forEach(function(round) {
            round.getScores().forEach(function(score) {
                score.setBid(1);
                score.madeBid();
            });
        });

        expect(game.isFinished()).toEqual(true);
    }));

    it("can get round by id", inject(function(Game) {
        var game = Game.create(['bob'], 3),
            rounds = game.getRounds();

        expect(game.getRound(1)).toBe(rounds[0]);
        expect(game.getRound(3)).toBe(rounds[2]);
        expect(game.getRound(5)).toBe(rounds[4]);
        expect(game.getRound(0)).toBeNull();
    }));

    it("can get all of a player's scores", inject(function(Game) {
        var game = Game.create(['bob', 'joe'], 3),
            joesScores = game.getScores("joe");

        expect(joesScores.length).toEqual(5);
        joesScores.forEach(function(score) {
            expect(score.getPlayer() === "joe");
        });
    }));

    it('can convert to json-ready object', inject(function(Game) {
        var game = Game.create(['bob', 'joe'], 3);

        var json = game.toJson();

        expect(json.players).toEqual(['bob', 'joe']);
        expect(json.rounds.length).toEqual(5);
        expect(json.startTime).toBeDefined();
    }));

    it('can be created with object from json', inject(function(Game) {
        var json = {
            startTime: 500,
            players: ['al', 'bill'],
            rounds: [{
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
            }]
        };

        var game = Game.fromJson(json);

        expect(game.getPlayers()).toEqual(['al', 'bill']);
        expect(game.getRounds().length).toEqual(1);
        expect(game.startTime).toEqual(500);
    }));

    it('records its start time', inject(function(Game) {
        var g = Game.create(['bob', 'joe'], 3);

        expect(g.startTime).toBeDefined();
    }));
});