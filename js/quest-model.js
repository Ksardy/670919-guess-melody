import {INITIAL_GAME} from './init-data.js';

export default class QuestModel {
  constructor(data) {
    this._state = Object.assign({}, INITIAL_GAME);
    this._state.answers = [];
    this._musicData = data;
    this._packData = this._musicData.slice(0);
  }

  get state() {
    return this._state;
  }

  get packData() {
    return this._packData;
  }

  get playersBalls() {
    return this._balls;
  }

  nextAnswer() {
    this._packData.shift();
  }

  isLiveFail() {
    return this._state.lives === 0;
  }

  currentTime() {
    this._time = this._state.time;
  }

  answerTrue() {
    if (this._packData[0].type === `genre`) {
      return this._packData[0].genre;
    } else {
      for (const it of this._packData[0].answers) {
        if (it.isCorrect === true) {
          return it.title.replace(/\s/g, ``);
        }
      }
      return -1;
    }
  }

  isTimeFail() {
    return this._state.time === 0;
  }

  tick() {
    this._state.time -= 1;
  }

  gameEnd() {
    return this._packData.length === 0;
  }

  get playerBall() {
    return this._ball;
  }

  answerUpdateTrue() {
    this._state.answers.push({answer: `true`, time: this._time - this._state.time});
  }

  answerUpdateFalse() {
    this._state.lives -= 1;
    this._state.answers.push({answer: `false`, time: this._time - this._state.time});
  }

  initBalls(data) {
    let currentBall = 0;
    for (const it of data.answers) {
      switch (true) {
        case (it.answer === `true` && it.time > 30):
          currentBall += 1;
          break;
        case (it.answer === `true` && it.time <= 30):
          currentBall += 2;
          break;
        case (it.answer === `false`):
          currentBall -= 2;
          break;
      }
    }
    return currentBall;
  }

  createBall() {
    this._ball = this.initBalls(this._state);
  }
}
