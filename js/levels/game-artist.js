import AbstractView from "./abstract-view";

const sound = (URLString) => {
  const mySound = new Audio([URLString]);
  mySound.play;
  return mySound;
};

export default class GameArtist extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="game__screen">
    <h2 class="game__title">${this.state.question}</h2>
    <div class="game__track">
      <button class="track__button track__button--pause data-button="0" type="button"></button>
      <audio autoplay src=${this.state.src}></audio>
    </div>
    
  
    <form class="game__artist">
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value=${this.state.answers[0].title.replace(/\s/g, ``)} id="answer-1">
        <label class="artist__name" for="answer-1">
          <img class="artist__picture" src=${this.state.answers[0].image.url} alt="Пелагея">
          ${this.state.answers[0].title}
        </label>
      </div>
  
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value=${this.state.answers[1].title.replace(/\s/g, ``)} id="answer-2">
        <label class="artist__name" for="answer-2">
          <img class="artist__picture" src=${this.state.answers[1].image.url} alt="Пелагея">
          ${this.state.answers[1].title}
        </label>
      </div>
  
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value=${this.state.answers[2].title.replace(/\s/g, ``)} id="answer-3">
        <label class="artist__name" for="answer-3">
          <img class="artist__picture" src=${this.state.answers[2].image.url} alt="Пелагея">
          ${this.state.answers[2].title}
        </label>
      </div>
    </form>
  </section>`;
  }

  nextLevel() {}

  checkedMusic() {}

  bind() {
    const track = this.element.querySelector(`audio`);
    const buttonTrack = this.element.querySelector(`.track__button`);

    buttonTrack.addEventListener(`click`, (evt) => {
      this.checkedMusic(evt, track);
    });

    this.element.querySelectorAll(`.artist__input`).forEach((button) => {
      button.addEventListener(`click`, () => {
        track.pause();
        this.nextLevel(button);
      });
    });
  }
}
