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


        it("should rotate players as dealer", function() {
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
    });
});