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
    })
});