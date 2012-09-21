describe("Round", function() {
    it("should be named on creation", function() {
        var r = new Round("round 1");

        expect(r.getName()).toEqual("round 1");
    });
});