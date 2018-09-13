import AbstractView from "./abstract-view";

export default class WinResultat extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${this.state.title}</h2>
    <p class="result__total">${this.state.total}</p>
    <p class="result__text">${this.state.text}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>`;
  }

  onReGame() {}

  bind() {
    const button = this.element.querySelector(`.result__replay`);
    button.addEventListener(`click`, () => {
      this.onReGame();
    });
  }
}
