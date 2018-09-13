
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

  createResultats(arr, object) {
    console.log(object);
    let data = object.state;
    console.log(data);
    if (data.time === 0) {
      return {title: `Увы и ах!`,
        text: `Время вышло! Вы не успели отгадать все мелодии`,
      };
    }
    if (data.lives === 0) {
      return {title: `Увы и ах!`,
        text: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
      };
    } else {
      object.createBalls();

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
  }

}
