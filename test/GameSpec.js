describe("Game", function() {

    beforeEach(module("ohhell.model"));

    it("keeps players in the order given", inject(function(Game) {
        var game = new Game(['bob', 'tom'], 2);

        expect(game.getPlayers()).toEqual(['bob', 'tom']);
    }));

    it("has enough rounds to play to highRound and back down to 1", inject(function(Game) {
        var game = new Game(['bob'], 8);

        expect(game.getRounds().length).toEqual(15);
    }));

    it("creates rounds with correct number of max tricks", inject(function(Game) {
        var game = new Game(['bob'], 3),
            rounds = game.getRounds();

        expect(rounds[0].getMaxTricks()).toEqual(1);
        expect(rounds[1].getMaxTricks()).toEqual(2);
        expect(rounds[2].getMaxTricks()).toEqual(3);
        expect(rounds[3].getMaxTricks()).toEqual(2);
        expect(rounds[4].getMaxTricks()).toEqual(1);
    }));

    it("names rounds to differentiate ascending/high/descending", inject(function(Game) {
        var game = new Game(['bob'], 3),
            rounds = game.getRounds();

        expect(rounds[0].getName()).toEqual("+1");
        expect(rounds[1].getName()).toEqual("+2");
        expect(rounds[2].getName()).toEqual("3");
        expect(rounds[3].getName()).toEqual("-2");
        expect(rounds[4].getName()).toEqual("-1");
    }));

    it("rotates players as dealer", inject(function(Game) {
        var game = new Game(['abe', 'ben', 'cal'], 4),
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
        var game = new Game(['abe', 'ben'], 2),
            rounds = game.getRounds();

        //play first round
        rounds[0].getScores().forEach(function(score) {
            score.setBid(1);
            score.madeBid();
        });

        expect(game.getCurrentRound()).toBe(rounds[1]);
    }));

    it("returns null for current round if all rounds are finished", inject(function(Game) {
        var game = new Game(['abe', 'ben'], 2),
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
        var game = new Game(['abe', 'ben'], 2),
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

    it("can get round by name", inject(function(Game) {
        var game = new Game(['bob'], 3),
            rounds = game.getRounds();

        expect(game.getRound("+1")).toBe(rounds[0]);
        expect(game.getRound("3")).toBe(rounds[2]);
        expect(game.getRound("-1")).toBe(rounds[4]);
        expect(game.getRound("blah")).toBeNull();
    }));

    it("can get all of a player's scores", inject(function(Game) {
        var game = new Game(['bob', 'joe'], 3),
            joesScores = game.getScores("joe");

        expect(joesScores.length).toEqual(5);
        joesScores.forEach(function(score) {
            expect(score.getPlayer() === "joe");
        });
    }));
});