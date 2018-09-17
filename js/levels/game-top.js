import {deleteTime, createTimeDasharray, checkTimeLow} from '../utils.js';

import AbstractView from "./abstract-view";

export default class Header extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="game__header">
    <a class="game__back" href="#">
    <span class="visually-hidden">Сыграть ещё раз</span>
    <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle class="timer__line" cx="390" cy="390" r="370" ${createTimeDasharray(this.state.time)} style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
    </svg>
      <div>      
      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml" ${checkTimeLow(this.state.time)}>
        <span class="timer__mins">${`0` + Math.floor(this.state.time / 60)}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${deleteTime(this.state.time)} </span>
      </div>
      <div class="game__mistakes">
      ${new Array(3 - this.state.lives)
        .fill(`<div class="wrong"></div>`)
        .join(``)}
      </div>
    </header>`;
  }

  onRestart() {}

  bind() {
    const welcomeButton = this.element.querySelector(`.game__back`);
    welcomeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onRestart();
    });
  }
}
