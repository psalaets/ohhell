describe("Game", function() {
    var game;

    beforeEach(function() {
        game = new Game();
    });

    it("should be able to add players", function() {
        game.addPlayer('bob');
        game.addPlayer('tom');

        expect(game.getPlayers()).toEqual(['bob', 'tom']);
    });
});