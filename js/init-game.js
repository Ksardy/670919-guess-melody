import {INITIAL_GAME, playersBalls} from './game-data.js';

import {selectSlide, wrapperSlide, createDivGame} from './utils.js';

import createArtistTemplate from './levels/game-artist.js';

import createGenreTemplate from './levels/game-genre.js';

import pack from './data.js';

import topTemplate from './levels/game-top.js';

import createSuccesResultats from './levels/result-success.js';

import templateFailResultat from './levels/fail.js';

import createResultats from './game-resultats.js';

import createBalls from './game-balls.js';

import templateWelcome from './levels/welcome.js';

import welcomeScreens from './welcome-data.js';

const start = () => {
  const element = wrapperSlide(templateWelcome(welcomeScreens));

  const agreeButton = element.querySelector(`.welcome__button`);

  agreeButton.addEventListener(`click`, () => startGame());
  selectSlide(element);
};

let packData = [];

/* если игрок 3 раза ошибся и жизни = 0, то запускаю экран поражения (через тотже обработчик результатов что и на победу)*/

const resultatsFail = (arr, game) => {
  const element = wrapperSlide(templateFailResultat(createResultats(arr, game)));
  let button = element.querySelector(`.result__replay`);
  button.addEventListener(`click`, () => {
    /* !!!!!!!!!!Не забыть переделать, должно не переключать на приветсвенный экран, а запускать  заново игру на туже с теме же данными!!!!!!!!*/
    start();
  });
  selectSlide(element);
};

/* если игрок закончил массив вопросов, то запускаю экран победы*/

const resultatsWinn = (arr, game) => {
  const element = wrapperSlide(createSuccesResultats(createResultats(arr, game)));
  let button = element.querySelector(`.result__replay`);
  button.addEventListener(`click`, () => {
    /* !!!!!!!!!!Не забыть переделать, должно не переключать на приветсвенный экран, а запускать  заново игру на туже с теме же данными!!!!!!!!*/
    start();
  });
  selectSlide(element);
};

/* под первую игрую создал функцию проверки, так как там массив инпутов*/

const liveUpdateGenre = (element, game, data) => {
  const buttons = Array.from(element.querySelectorAll(`input[type=checkbox]:checked`));
  for (const it of buttons) {
    /* если хотябы 1 ответ не верен, отнимаю жизнь и выхожу из функции, записываю ответ в массив ответов */
    if (it.value !== packData[0].trueAnswer) {
      game.lives -= 1;
      game.time -= 30;
      game.answers.push({answer: `false`, time: 30});
      updateTopTemplate(game, data);
      return;
    }
  }
  return;
};

/* для проигрывания музыки в жанре*/

const audioManioulated = (music) => {
  const buttons = Array.from(music.querySelectorAll(`.track__button`));
  const tracks = Array.from(music.querySelectorAll(`audio`));
  buttons.forEach((element, i) => {
    if (element.className === `track__button track__button--pause`) {
      tracks[i].play();
    }
  });
  buttons.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      if (element.className === `track__button track__button--play`) {
        let checkAudio = music.querySelector(`.track__button--pause`);
        if (checkAudio) {
          buttons.forEach((data, i) => {
            data.className = `track__button track__button--play`;
            tracks[i].pause();
          });
        }
        element.className = `track__button track__button--pause`;
        return tracks[index].play();
      } else {
        element.className = `track__button track__button--play`;
        return tracks[index].pause();
      }
    });
  });
};

/* Создает первый экран, подвешивается создание второго на обработчик, подвешиваю проверку ответов на клик, в data идит созданынй функцией игры див, который оборачивает  и хедер и игру*/

const updateCreateGenreTemplate = (game, data) => {
  data.className = `game game--genre`;
  const element = wrapperSlide(createGenreTemplate(packData[0]));
  const tracks = Array.from(element.querySelectorAll(`audio`));
  audioManioulated(element);
  const agreeButton = element.querySelector(`.game__submit`);
  agreeButton.disabled = true;
  /* проверю на активность батонов*/

  Array.from(element.querySelectorAll(`input[type=checkbox]`)).forEach((button) => {
    button.addEventListener(`change`, () => {
      if (element.querySelectorAll(`input[type=checkbox]:checked`).length > 0) {
        agreeButton.disabled = false;
      } else {
        agreeButton.disabled = true;
      }
    });
  });
  agreeButton.addEventListener(`click`, () => {
    liveUpdateGenre(element, game, data);
    /* если жизни кончились то экран фейла */

    if (game.lives === 0) {
      return resultatsFail(playersBalls, game);
    }
    /* режу массив данных */
    packData.shift();
    tracks.forEach((music) => {
      music.pause();
    });
    /* удалаю элемент */
    data.removeChild(element);
    /* запускаю второй экран, поставил функцию победы только на второй экран, так как только на нем может кончится длинна вопросов из 10 (в данных условиях) */
    return data.append(updateCreateArtistTemplate(game, data));
  });

  return element;
};


/* Создает второй экран, подвешивается создание первого на обработчик */

const updateCreateArtistTemplate = (game, data) => {
  data.className = `game game--artist`;
  const element = wrapperSlide(createArtistTemplate(packData[0]));
  const track = element.querySelector(`audio`);
  const buttonTrack = element.querySelector(`.track__button`);
  buttonTrack.addEventListener(`click`, () => {
    if (buttonTrack.className === `track__button track__button--play`) {
      buttonTrack.className = `track__button track__button--pause`;
      return track.play();
    } else {
      buttonTrack.className = `track__button track__button--play`;
      return track.pause();
    }
  });
  element.querySelectorAll(`.artist__input`).forEach((button) => {
    button.addEventListener(`click`, () => {
      if (button.value !== packData[0].trueAnswer) {
        game.lives -= 1;
        game.time -= 30;
        game.answers.push({answer: `false`, time: 30});
        updateTopTemplate(game, data);
      } else {
        game.time -= 30;
        updateTopTemplate(game, data);
        game.answers.push({answer: `true`, time: 30});
      }
      if (game.lives === 0) {
        return resultatsFail(playersBalls, game);
      }
      packData.shift();
      if (packData.length === 0) {
        game.balls = createBalls(game);
        return resultatsWinn(playersBalls, game);
      }
      track.pause();
      data.removeChild(element);
      return data.append(updateCreateGenreTemplate(game, data));
    });
  });
  return element;
};

/* обновляю верхний экран, удаляю первый див под него при обновлении */

const updateTopTemplate = (object, data) => {
  const element = wrapperSlide(topTemplate(object));
  const welcomeButton = element.querySelector(`.game__back`);
  welcomeButton.addEventListener(`click`, () => {
    start();
  });
  if (data.childNodes.length === 2) {
    data.removeChild(data.querySelector(`:first-child`));
  }
  data.prepend(element);
};

/* копирую данные, создаю массив ответов, создаю див в котором буду менять топ и экран игры, запускаю отрисовку топа и экрана первой игры*/

const startGame = () => {
  packData = pack.slice(0);
  let game = Object.assign({}, INITIAL_GAME);
  game.answers = [];
  createDivGame();
  const divGame = document.querySelector(`.game`);
  updateTopTemplate(game, divGame);
  divGame.append(updateCreateGenreTemplate(game, divGame));
};

start();
