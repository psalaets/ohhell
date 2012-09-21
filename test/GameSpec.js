describe("Game", function() {
    describe("on creation", function() {
        it("should be able to pass in players", function() {
            var game = new Game(['bob', 'tom']);

            expect(game.getPlayers()).toEqual(['bob', 'tom']);
        });
    });

    describe("started", function() {
        it("should have enough rounds to play to highRound and back down to 1", function() {
            var game = new Game(['bob']);
            game.start(8);

            expect(game.getRounds().length).toEqual(15);
        });

        it("should create rounds with correct number of tricks", function() {
            var game = new Game(['bob']);
            game.start(3);

            var rounds = game.getRounds();

            expect(rounds[0].getTricks()).toEqual(1);
            expect(rounds[1].getTricks()).toEqual(2);
            expect(rounds[2].getTricks()).toEqual(3);
            expect(rounds[3].getTricks()).toEqual(2);
            expect(rounds[4].getTricks()).toEqual(1);
        });
    });
});