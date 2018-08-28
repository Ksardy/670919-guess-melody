
const compareNumbers = (a, b) => b - a;

export const createResultats = (arr, object) => {
  if (object.time === 0) {
    return `«Время вышло! Вы не успели отгадать все мелодии»`;
  }
  if (object.hp === 0) {
    return ` «У вас закончились все попытки. Ничего, повезёт в следующий раз!»`;
  } else {
    arr.push(object.balls);
    arr.sort(compareNumbers);
    let position = arr.indexOf(object.balls) + 1;
    let otherPlayer = arr.length - position;
    if (otherPlayer === 0) {
      return `Вы заняли` + position + `место из` + arr.length + `игроков. Это лучше, чем у 0 % игроков`;
    } else {
      let percent = (otherPlayer / arr.length) * 100;
      return `Вы заняли` + position + `место из` + arr.length + `игроков. Это лучше, чем у` + percent + `% игроков`;
    }
  }
};
