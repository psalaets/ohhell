describe("Game", function() {
  var Game;

  beforeEach(module("app"));
  beforeEach(inject(function(_Game_) {
    Game = _Game_;
  }));

  it("keeps players in the order given", function() {
    var game = Game.create(['bob', 'tom'], 2);

    expect(game.getPlayers()).toEqual(['bob', 'tom']);
  });

  it("has enough rounds to play to highRound and back down to 1", function() {
    var game = Game.create(['bob'], 8);

    expect(game.getRounds().length).toEqual(15);
  });

  it("creates rounds with incrementing numeric ids", function() {
    var game = Game.create(['bob'], 3);
    var rounds = game.getRounds();

    expect(rounds[0].getId()).toEqual(1);
    expect(rounds[1].getId()).toEqual(2);
    expect(rounds[2].getId()).toEqual(3);
    expect(rounds[3].getId()).toEqual(4);
    expect(rounds[4].getId()).toEqual(5);
  });

  it("creates rounds with correct number of max tricks", function() {
    var game = Game.create(['bob'], 3);
    var rounds = game.getRounds();

    expect(rounds[0].getMaxTricks()).toEqual(1);
    expect(rounds[1].getMaxTricks()).toEqual(2);
    expect(rounds[2].getMaxTricks()).toEqual(3);
    expect(rounds[3].getMaxTricks()).toEqual(2);
    expect(rounds[4].getMaxTricks()).toEqual(1);
  });

  it("names rounds based on max tricks", function() {
    var game = Game.create(['bob'], 3);
    var rounds = game.getRounds();

    expect(rounds[0].getName()).toEqual("1");
    expect(rounds[1].getName()).toEqual("2");
    expect(rounds[2].getName()).toEqual("3");
    expect(rounds[3].getName()).toEqual("2");
    expect(rounds[4].getName()).toEqual("1");
  });

  it("rotates players as dealer", function() {
    var game = Game.create(['abe', 'ben', 'cal'], 4);
    var rounds = game.getRounds();

    expect(rounds[0].getDealer()).toEqual('abe');
    expect(rounds[1].getDealer()).toEqual('ben');
    expect(rounds[2].getDealer()).toEqual('cal');
    expect(rounds[3].getDealer()).toEqual('abe');
    expect(rounds[4].getDealer()).toEqual('ben');
    expect(rounds[5].getDealer()).toEqual('cal');
    expect(rounds[6].getDealer()).toEqual('abe');
  });

  it("considers current round to be earliest round that is not finished", function() {
    var game = Game.create(['abe', 'ben'], 2);
    var rounds = game.getRounds();

    //play first round
    rounds[0].getScores().forEach(function(score) {
      score.setBid(1);
      score.madeBid();
    });

    expect(game.getCurrentRound()).toBe(rounds[1]);
  });

  it("returns null for current round if all rounds are finished", function() {
    var game = Game.create(['abe', 'ben'], 2);
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

  it("is finished once all rounds are finished", function() {
    var game = Game.create(['abe', 'ben'], 2);
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

  it("can get round by id", function() {
    var game = Game.create(['bob'], 3);
    var rounds = game.getRounds();

    expect(game.getRound(1)).toBe(rounds[0]);
    expect(game.getRound(3)).toBe(rounds[2]);
    expect(game.getRound(5)).toBe(rounds[4]);
    expect(game.getRound(0)).toBeNull();
  });

  it("can get all of a player's scores", function() {
    var game = Game.create(['bob', 'joe'], 3);
    var joesScores = game.getScores("joe");

    expect(joesScores.length).toEqual(5);
    joesScores.forEach(function(score) {
      expect(score.getPlayer() === "joe");
    });
  });

  it('can convert to json-ready object', function() {
    var game = Game.create(['bob', 'joe'], 3);

    var json = game.toJson();

    expect(json.players).toEqual(['bob', 'joe']);
    expect(json.rounds.length).toEqual(5);
    expect(json.startTime).toBeDefined();
  });

  it('can be created with object from json', function() {
    var json = {
      startTime: 500,
      players: ['al', 'bill'],
      rounds: [{
        id: 5,
        name: 'Round',
        maxTricks: 6,
        dealer: 'bob',
        scores: [{
          player: 'joe',
          bid: 2,
          gotBid: false
        }, {
          player: 'bob',
          bid: 3,
          gotBid: null
        }]
      }]
    };

    var game = Game.fromJson(json);

    expect(game.getPlayers()).toEqual(['al', 'bill']);
    expect(game.getRounds().length).toEqual(1);
    expect(game.startTime).toEqual(500);
  });

  it('records its start time', function() {
    var g = Game.create(['bob', 'joe'], 3);

    expect(g.startTime).toBeDefined();
  });

  it('can count unfinished rounds', function() {
    var game = Game.create(['bob', 'joe'], 2);

    //play first round
    game.getRounds()[0].getScores().forEach(function(score) {
      score.setBid(1);
      score.madeBid();
    });

    expect(game.roundsLeft()).toBe(2);
  });
});