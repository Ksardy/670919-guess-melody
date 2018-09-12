
export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  time: 300
};

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  if (level > 10) {
    throw new Error(`Level should not be over value`);
  }
  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

export const changeLives = (game, error) => {
  if (typeof error !== `number`) {
    throw new Error(`lives should be of type number`);
  }
  if (error < 0) {
    throw new Error(`/lives should not be increase value/`);
  }
  if (error > 3) {
    throw new Error(`lives should not be low 0`);
  }
  let lives = game.lives - error;
  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};

export const changeTime = (game, seconds) => {
  if (typeof seconds !== `number`) {
    throw new Error(`time should be of type number`);
  }
  if (seconds < 0) {
    throw new Error(`time should not be increase`);
  }
  if (seconds > 300) {
    throw new Error(`time should not be low 0`);
  }
  let time = game.time - seconds;
  const newGame = Object.assign({}, game, {
    time
  });
  return newGame;
};

const compareNumbers = (a, b) => b - a;

export const createResultats = (arr, object) => {
  if (object.time === 0) {
    return -1;
  }
  if (object.lives === 0) {
    return -1;
  } else {
    arr.push(object.balls);
    arr.sort(compareNumbers);
    let position = arr.indexOf(object.balls) + 1;
    let otherPlayer = arr.length - position;
    if (otherPlayer === 0) {
      return 0;
    } else {
      return (otherPlayer / arr.length) * 100;
    }
  }
};
