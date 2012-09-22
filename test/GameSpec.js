describe("Game", function() {
    describe("on creation", function() {
        it("takes player names", function() {
            var game = new Game(['bob', 'tom']);

            expect(game.getPlayers()).toEqual(['bob', 'tom']);
        });
    });

    describe("started", function() {
        it("has enough rounds to play to highRound and back down to 1", function() {
            var game = new Game(['bob']);
            game.start(8);

            expect(game.getRounds().length).toEqual(15);
        });

        it("creates rounds with correct number of max tricks", function() {
            var game = new Game(['bob']);
            game.start(3);

            var rounds = game.getRounds();

            expect(rounds[0].getMaxTricks()).toEqual(1);
            expect(rounds[1].getMaxTricks()).toEqual(2);
            expect(rounds[2].getMaxTricks()).toEqual(3);
            expect(rounds[3].getMaxTricks()).toEqual(2);
            expect(rounds[4].getMaxTricks()).toEqual(1);
        });

        it("names ascending rounds like <max tricks>-up", function() {
            var game = new Game(['bob']);
            game.start(3);

            var rounds = game.getRounds();

            expect(rounds[0].getName()).toEqual("1-up");
            expect(rounds[1].getName()).toEqual("2-up");
        });

        it("names high round like <max tricks>", function() {
            var game = new Game(['bob']);
            game.start(3);

            var rounds = game.getRounds();

            expect(rounds[2].getName()).toEqual("3");
        });

        it("names descending rounds like <max tricks>-down", function() {
            var game = new Game(['bob']);
            game.start(3);

            var rounds = game.getRounds();

            expect(rounds[3].getName()).toEqual("2-down");
            expect(rounds[4].getName()).toEqual("1-down");
        });

        it("rotates players as dealer", function() {
            var game = new Game(['abe', 'ben', 'cal']);
            game.start(4);

            var rounds = game.getRounds();

            expect(rounds[0].getDealer()).toEqual('abe');
            expect(rounds[1].getDealer()).toEqual('ben');
            expect(rounds[2].getDealer()).toEqual('cal');
            expect(rounds[3].getDealer()).toEqual('abe');
            expect(rounds[4].getDealer()).toEqual('ben');
            expect(rounds[5].getDealer()).toEqual('cal');
            expect(rounds[6].getDealer()).toEqual('abe');
        });

        it("considers current round to be earliest round that is not reported", function() {
            var game = new Game(['abe', 'ben']);
            game.start(2);

            var rounds = game.getRounds();

            //play first round
            rounds[0].getScores().forEach(function(score) {
                score.setBid(1);
                score.madeBid();
            });

            expect(game.getCurrentRound()).toBe(rounds[1]);
        });

        it("returns null for current round if all rounds are reported", function() {
            var game = new Game(['abe', 'ben']);
            game.start(2);

            var rounds = game.getRounds();

            //play all rounds
            rounds.forEach(function(round) {
                round.getScores().forEach(function(score) {
                    score.setBid(1);
                    score.madeBid();
                });
            });

            expect(game.getCurrentRound()).toBeNull();
        });

        it("is finished once all rounds are reported", function() {
            var game = new Game(['abe', 'ben']);
            game.start(2);

            var rounds = game.getRounds();

            //play all rounds
            rounds.forEach(function(round) {
                round.getScores().forEach(function(score) {
                    score.setBid(1);
                    score.madeBid();
                });
            });

            expect(game.isFinished()).toEqual(true);
        });
    });
});