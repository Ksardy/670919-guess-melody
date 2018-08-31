
const createArtistTemplate = (state) => `<section class="game__screen">
  <h2 class="game__title">${state.quest}</h2>
  <div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
    <audio scr=${state.track}></audio>
  </div>

  <form class="game__artist">
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value=${state.answers[0].replace(/\s/g, ``)} id="answer-1">
      <label class="artist__name" for="answer-1">
        <img class="artist__picture" src=${state.images[0]} alt="Пелагея">
        ${state.answers[0]}
      </label>
    </div>

    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value=${state.answers[1].replace(/\s/g, ``)} id="answer-2">
      <label class="artist__name" for="answer-2">
        <img class="artist__picture" src=${state.images[1]} alt="Пелагея">
        ${state.answers[1]}
      </label>
    </div>

    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value=${state.answers[2].replace(/\s/g, ``)} id="answer-3">
      <label class="artist__name" for="answer-3">
        <img class="artist__picture" src=${state.images[2]} alt="Пелагея">
        ${state.answers[2]}
      </label>
    </div>
  </form>
</section>`;

export default createArtistTemplate;
