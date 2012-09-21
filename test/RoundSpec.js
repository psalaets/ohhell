describe("Round", function() {
    it("should be named on creation", function() {
        var r = new Round("round 1", 1);

        expect(r.getName()).toEqual("round 1");
    });

    it("should have a number of tricks", function() {
        var r = new Round("round", 4);

        expect(r.getTricks()).toEqual(4);
    });
});