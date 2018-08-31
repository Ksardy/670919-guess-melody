
import createBalls from '../game-balls.js';

import {changeLevel, INITIAL_GAME, changeLives, changeTime, createResultats} from '../game-data.js';

const createAnswers = (arr, numb, value, seconds) => {
  for (let i = 0; i < numb; i++) {
    let question = {
      answer: value,
      time: seconds
    };
    arr.push(question);
  }
  return arr;
};

describe(`answersTest`, () => {
  describe(`answerLimit`, ()=>{
    it(`should return -1 when the value is not 10`, () => {
      const playerOneAnswers = [];
      createAnswers(playerOneAnswers, 9, 60);
      assert.equal(createBalls(playerOneAnswers, 3), -1);
    });
  });
  describe(`else answerFull`, () => {
    it(`should return 10 when the value is 10 if not error`, () => {
      const playerOneAnswers = [];
      createAnswers(playerOneAnswers, 10, true, 31);
      assert.equal(createBalls(playerOneAnswers, 3), 10);
    });
    it(`should return 20 if answer speed if not errror`, () => {
      const playerOneAnswers = [];
      createAnswers(playerOneAnswers, 10, true, 29);
      assert.equal(createBalls(playerOneAnswers, 3), 20);
    });
    it(`should return 16 if speed if 2 error`, () => {
      const playerOneAnswers = [];
      createAnswers(playerOneAnswers, 10, true, 29);
      assert.equal(createBalls(playerOneAnswers, 1), 16);
    });
    it(`should return 4 if slow if 2 error`, () => {
      const playerOneAnswers = [];
      createAnswers(playerOneAnswers, 10, true, 31);
      assert.equal(createBalls(playerOneAnswers, 1), 6);
    });
  });
});

const CreatePlayerResultate = (ball, seconds, error) => {
  return {balls: ball, time: seconds, hp: error};
};

describe(`resultatsTest`, () => {
  it(`should return -1 when time 0`, () => {
    const playersBalls = [4, 1, 0, 20, 8, 6, 7];
    const playerTestOne = new CreatePlayerResultate(18, 0, 1);
    assert.equal(createResultats(playersBalls, playerTestOne), -1);
  });
  it(`should return -1 when hp 0`, () => {
    const playersBalls = [1, 2, 3];
    const playerTestOne = new CreatePlayerResultate(18, 299, 0);
    assert.equal(createResultats(playersBalls, playerTestOne), -1);
  });
  it(`should return 0 when player last`, () => {
    const playersBalls = [4, 8, 4, 5];
    const playerTestOne = new CreatePlayerResultate(3, 299, 1);
    assert.equal(createResultats(playersBalls, playerTestOne), 0);
  });
  it(`should return 80 when player first`, () => {
    const playersBalls = [4, 8, 4, 5];
    const playerTestOne = new CreatePlayerResultate(10, 299, 1);
    assert.equal(createResultats(playersBalls, playerTestOne), 80);
  });
});


describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(1, changeLevel(INITIAL_GAME, 1).level);
    assert.equal(2, changeLevel(INITIAL_GAME, 2).level);
    assert.equal(10, changeLevel(INITIAL_GAME, 10).level);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });

  it(`should not allow set non over value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, 90).level, /Level should not be over value/);
  });
});

describe(`Check lives changer`, () => {

  it(`should reduce lives of the game`, () => {
    assert.equal(changeLives(INITIAL_GAME, 1).lives, 2);
    assert.equal(changeLives(INITIAL_GAME, 2).lives, 1);
    assert.equal(changeLives(INITIAL_GAME, 3).lives, 0);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, -1).lives, /lives should not be increase value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, []).lives, /lives should be of type number/);
  });

  it(`should not allow set over value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, 4).lives, /lives should not be low 0/);
  });
});

describe(`Check timer changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeTime(INITIAL_GAME, 1).time, 299);
    assert.equal(changeTime(INITIAL_GAME, 300).time, 0);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, -1).time, /time should not be increase/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, []).time, /time should be of type number/);
  });

  it(`should not allow set over value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, 301).time, /time should not be low 0/);
  });
});
