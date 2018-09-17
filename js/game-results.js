
import {selectSlide} from './utils.js';
import Application from './application.js';
import WinResultat from './levels/result-success.js';
import FailResultat from './levels/fail.js';

export default class ResultatApplication {
  constructor(allPlayerPoints, game) {
    this.resultate = this.createResults(allPlayerPoints, game);
  }

  resultsFail() {
    const fail = new FailResultat(this.resultate);
    fail.onRestart = () => {
      Application.showGame();
    };
    return selectSlide(fail.element);
  }

  resultsWin() {
    const resultat = new WinResultat(this.resultate);
    resultat.onRestart = () => {
      Application.showGame();
    };
    return selectSlide(resultat.element);
  }

  createResults(data, object) {
    let player = object.state;
    if (player.time === 0) {
      return {title: `Увы и ах!`,
        text: `Время вышло! Вы не успели отгадать все мелодии`,
      };
    }
    if (player.lives === 0) {
      return {title: `Увы и ах!`,
        text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
      };
    }
    const playerBall = object.playerBall;
    const allPlayerPoints = data.map((element) => element.points);
    allPlayerPoints.sort((a, b) => b - a);
    let position = allPlayerPoints.indexOf(playerBall) + 1;
    let otherPlayer = allPlayerPoints.length - position;
    if (otherPlayer === 0 && allPlayerPoints.length !== 1) {
      return {title: `Лузер!`,
        total: `Колличество набранных баллов: ` + playerBall,
        text: `Вы заняли ` + position + ` место из ` + allPlayerPoints.length + ` игроков. Это худший результат.`,
      };
    }
    let percent = Math.floor((otherPlayer / allPlayerPoints.length) * 100);
    return {title: `Вы настоящий меломан!`,
      total: `Колличество набранных баллов: ` + playerBall,
      text: `Вы заняли ` + position + ` место из ` + allPlayerPoints.length + ` игроков. Это лучше, чем у ` + percent + ` % игроков.`,
    };

  }
}
