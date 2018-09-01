import {createSecunds, createTimeDasharray} from '../utils.js';

const topTemplate = (state) => `<header class="game__header">
<a class="game__back" href="#">
<span class="visually-hidden">Сыграть ещё раз</span>
<img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
</a>
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
<circle class="timer__line" cx="390" cy="390" r="370" ${createTimeDasharray(state.time)} style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
</svg>
  <div>
  
  <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer__mins">${`0` + Math.floor(state.time / 60)}</span>
    <span class="timer__dots">:</span>
    <span class="timer__secs">${createSecunds(state.time)} </span>
  </div>
  <div class="game__mistakes">
  ${new Array(3 - state.lives)
    .fill(`<div class="wrong"></div>`)
    .join(``)}
  </div>
</header>`;

export default topTemplate;
