
import AbstractView from "./abstract-view";

export default class Welcome extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="welcome">
    <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <button class="welcome__button" style="cursor: wait;"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">${this.state.welcome.title}</h2>
    <p class="welcome__text">${this.state.welcome.welcomeTest}</p>
    <ul class="welcome__rules-list">
      <li>${this.state.welcome.rules[0]}</li>
      <li>${this.state.welcome.rules[1]}</li>
    </ul>
    <p class="welcome__text">${this.state.welcome.text}</p>
    </section>`;
  }

  onGame() {}

  loaded() {}

  bind() {
    const agreeButton = this.element.querySelector(`.welcome__button`);
    agreeButton.disabled = true;
    this.loaded(agreeButton);

    agreeButton.addEventListener(`click`, () => this.onGame());
  }

}
