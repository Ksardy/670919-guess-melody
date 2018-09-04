import {INITIAL_GAME, playersBalls} from './game-data.js';
import {selectSlide, wrapperSlide, createDivGame} from './utils.js';
import createArtistTemplate from './levels/game-artist.js';
import GameGenre from './levels/game-genre.js';
import createPack from './data.js';
import Header from './levels/game-top.js';
import WinResultat from './levels/result-success.js';
import FailResultat from './levels/fail.js';
import createResultats from './game-resultats.js';
import createBalls from './game-balls.js';
import Welcome from './levels/welcome.js';
import welcomeScreens from './welcome-data.js';
import musicData from './music-data.js';

let packData = [];

let packs = [];

const checkedAnswersGenre = (game, data)=> {
  for (const it of data) {
    /* если хотябы 1 ответ не верен, отнимаю жизнь и выхожу из цикла, записываю ответ в массив ответов */
    if (it.value !== packData[0].trueAnswer) {
      game.lives -= 1;
      game.time -= 30;
      game.answers.push({answer: `false`, time: 30});
      return;
    }
  }
  game.time -= 30;
  game.answers.push({answer: `true`, time: 30});
  return;
};

/* для проигрывания музыки в жанре*/

const audioGenreManipulated = (music) => {
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
  const genre = new GameGenre(packData[0]);

  genre.nextLevel = (buttons) => {
    console.log(buttons);
    checkedAnswersGenre(game, buttons);
    updateTopTemplate(game, data);
    if (game.lives === 0) {
      resultatsFail(playersBalls, game);
      return resultatsFail(playersBalls, game);
    }
    packData.shift();
    if (packData.length === 0) {
      game.balls = createBalls(game);
      return resultatsWinn(playersBalls, game);
    }
    /* удалаю элемент */
    data.removeChild(genre.element);
    /* запускаю второй экран, поставил функцию победы только на второй экран, так как только на нем может кончится длинна вопросов из 10 (в данных условиях) */
    return data.append(updateCreateArtistTemplate(game, data));
  };

  return genre.element;
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
        game.answers.push({answer: `true`, time: 30});
        updateTopTemplate(game, data);
      }
      if (game.lives === 0) {
        resultatsFail(playersBalls, game);
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
  if (data.childNodes.length === 2) {
    data.removeChild(data.querySelector(`:first-child`));
  }
  const header = new Header(object);
  header.reGame = () => {
    initiateSite();
  };
  data.prepend(header.element);
};


/* если игрок закончил массив вопросов, то запускаю экран победы*/

const resultatsWinn = (arr, game) => {
  const resultat = new WinResultat(createResultats(arr, game));
  resultat.reStart = () => startGame();
  return selectSlide(resultat.element);
};

/* если игрок 3 раза ошибся и жизни = 0, то запускаю экран поражения (через тотже обработчик результатов что и на победу)*/

const resultatsFail = (arr, game) => {
  const fail = new FailResultat(createResultats(arr, game));
  fail.reStart = () => startGame();
  return selectSlide(fail.element);
};

const startGame = () => {
  packData = packs.slice(0);
  let game = Object.assign({}, INITIAL_GAME);
  game.answers = [];
  const divGame = createDivGame();
  updateTopTemplate(game, divGame);
  divGame.append(updateCreateGenreTemplate(game, divGame));
};

const initiateSite = () => {
  packs = createPack(musicData);
  const welcome = new Welcome(welcomeScreens);
  welcome.game = () => startGame();
  return selectSlide(welcome.element);
};

export default initiateSite;
