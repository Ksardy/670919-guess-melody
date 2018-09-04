
import AbstractView from "./abstract-view";

export default class GameGenre extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="game__screen">
    <h2 class="game__title">${this.state.quest}</h2>
    <form class="game__tracks">
      <div class="track">
        <button class="track__button track__button--pause" type="button" data-button="0"></button>
        <div class="track__status">
        <audio src=${this.state.tracks[0]}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[0]} id="answer-1">
          <label class="game__check" for="answer-1">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="1"></button>
        <div class="track__status">
        <audio src=${this.state.tracks[1]}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[1]} id="answer-2">
          <label class="game__check" for="answer-2">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="2"></button>
        <div class="track__status">
        <audio src=${this.state.tracks[2]}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[2]} id="answer-3">
          <label class="game__check" for="answer-3">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="3"></button>
        <div class="track__status">
        <audio src=${this.state.tracks[3]}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[3]} id="answer-4">
          <label class="game__check" for="answer-4">Отметить</label>
        </div>
      </div>
  
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>`;
  }

  nextLevel() {}

  checkedMusic() {}

  bind() {
    const agreeButton = this.element.querySelector(`.game__submit`);
    const buttons = Array.from(this.element.querySelectorAll(`.track__button`));
    const tracks = Array.from(this.element.querySelectorAll(`audio`));
    tracks[0].play();
    let current = 0;

    agreeButton.disabled = true;

    Array.from(this.element.querySelectorAll(`input[type=checkbox]`)).forEach((button) => {
      button.addEventListener(`change`, () => {
        if (this.element.querySelectorAll(`input[type=checkbox]:checked`).length > 0) {
          agreeButton.disabled = false;
        } else {
          agreeButton.disabled = true;
        }
      });
    });

    agreeButton.addEventListener(`click`, () => {
      tracks[current].pause();
      const checkButtons = this.element.querySelectorAll(`input[type=checkbox]:checked`);
      this.nextLevel(checkButtons);
    });

    buttons.forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        this.checkedMusic(evt, buttons, tracks, current);
      });
    });
  }
}
