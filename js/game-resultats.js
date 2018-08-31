const createResultats = (arr, object) => {
  if (object.time === 0) {
    return {title: `Увы и ах!`,
      text: `Время вышло! Вы не успели отгадать все мелодии`,
    };
  }
  if (object.lives === 0) {
    return {title: `Увы и ах!`,
      text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
    };
  } else {
    arr.push(object.balls);

    arr.sort((a, b) => b - a);
    let position = arr.indexOf(object.balls) + 1;
    let otherPlayer = arr.length - position;
    if (otherPlayer === 0) {
      return {title: `Вы настоящий меломан!`,
        total: `не первый`,
        text: `Вы заняли ` + position + ` место из ` + arr.length + ` игроков. Это лучше, чем у 0 % игроков`,
      };
    } else {
      let percent = (otherPlayer / arr.length) * 100;
      return {title: `Вы настоящий меломан!`,
        total: `первый`,
        text: `Вы заняли ` + position + ` место из ` + arr.length + ` игроков. Это лучше, чем у ` + percent + ` % игроков`,
      };
    }
  }
};

export default createResultats;

