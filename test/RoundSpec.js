describe("Round", function() {
    it("should be named on creation", function() {
        var r = new Round("round 1", 1, ['bob', 'joe']);

        expect(r.getName()).toEqual("round 1");
    });

    it("should have a number of tricks", function() {
        var r = new Round("round", 4, ['bob', 'joe']);

        expect(r.getTricks()).toEqual(4);
    });

    it("should make first player the dealer", function() {
        var r = new Round("round", 3, ['bob', 'joe']);

        expect(r.getDealer()).toEqual('bob');
    })
});