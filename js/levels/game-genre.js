
import AbstractView from "./abstract-view";

export default class GameGenre extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="game__screen">
    <h2 class="game__title">${this.state.question}</h2>
    <form class="game__tracks">
      <div class="track">
        <button class="track__button track__button--pause" type="button" data-button="0"></button>
        <div class="track__status">
        <audio autoplay src=${this.state.answers[0].src}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[0].genre} id="answer-1">
          <label class="game__check" for="answer-1">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="1"></button>
        <div class="track__status">
        <audio src=${this.state.answers[1].src}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[1].genre} id="answer-2">
          <label class="game__check" for="answer-2">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="2"></button>
        <div class="track__status">
        <audio src=${this.state.answers[2].src}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[2].genre} id="answer-3">
          <label class="game__check" for="answer-3">Отметить</label>
        </div>
      </div>
  
      <div class="track">
        <button class="track__button track__button--play" type="button" data-button="3"></button>
        <div class="track__status">
        <audio src=${this.state.answers[3].src}></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value=${this.state.answers[3].genre} id="answer-4">
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
      for (const it of buttons) {
        if (it.className === `track__button track__button--pause`) {
          it.className = `track__button track__button--play`;
          tracks[it.dataset.button].pause();
        }
      }
      const checkButtons = this.element.querySelectorAll(`input[type=checkbox]:checked`);
      this.nextLevel(checkButtons);
    });

    buttons.forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        this.checkedMusic(evt, buttons, tracks);
      });
    });
  }
}
