describe("Game", function() {
    it("should be able to add players", function() {
        var game = new Game();
        game.addPlayer('bob');
        game.addPlayer('tom');

        expect(game.getPlayers()).toEqual(['bob', 'tom']);
    });

    it("should have enough rounds to play to highRound and back down to 1", function() {
        var game = new Game(8);

        expect(game.getRounds().length).toEqual(15);
    });

    it("should create rounds with correct number of tricks", function() {
        var game = new Game(3);

        var rounds = game.getRounds();

        expect(rounds[0].getTricks()).toEqual(1);
        expect(rounds[1].getTricks()).toEqual(2);
        expect(rounds[2].getTricks()).toEqual(3);
        expect(rounds[3].getTricks()).toEqual(2);
        expect(rounds[4].getTricks()).toEqual(1);
    });
});