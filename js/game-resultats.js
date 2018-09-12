
import {selectSlide} from './utils.js';
import Application from './application.js';
import WinResultat from './levels/result-success.js';
import FailResultat from './levels/fail.js';

export default class ResultatApplication {
  constructor(arr, game) {
    this.resultate = this.createResultats(arr, game);
  }


  resultatsFail() {
    const fail = new FailResultat(this.resultate);
    fail.reStart = () => {
      Application.showGame();
    };
    return selectSlide(fail.element);
  }

  resultatsWin() {
    const resultat = new WinResultat(this.resultate);
    resultat.reStart = () => {
      Application.showGame();
    };
    return selectSlide(resultat.element);
  }

  createResultats(data, object) {
    let player = object.state;
    console.log(data);
    if (player.time === 0) {
      return {title: `Увы и ах!`,
        text: `Время вышло! Вы не успели отгадать все мелодии`,
      };
    }
    if (player.lives === 0) {
      return {title: `Увы и ах!`,
        text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
      };
    } else {
      const playerBall = object.playerBalls;
      const arr = data.map((element) => element.playerBalls);
      arr.sort((a, b) => b - a);
      let position = arr.indexOf(playerBall) + 1;
      let otherPlayer = arr.length - position;
      if (otherPlayer === 0 && arr.length !== 1) {
        return {title: `Лузер!`,
          total: `Позор!`,
          text: `Вы заняли ` + position + ` место из ` + arr.length + ` игроков. Это худший результат.`,
        };
      } else {
        let percent = Math.floor((otherPlayer / arr.length) * 100);
        return {title: `Вы настоящий меломан!`,
          total: `Молодец!`,
          text: `Вы заняли ` + position + ` место из ` + arr.length + ` игроков. Это лучше, чем у ` + percent + ` % игроков.`,
        };
      }
    }
  }
}
