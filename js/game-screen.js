import {createDivGame} from './utils.js';
import GameArtist from './levels/game-artist.js';
import GameGenre from './levels/game-genre.js';
import Application from './application.js';
import Header from './levels/game-top.js';


const ONE_SECOND = 1000;

let timer;

const NOT_WIN = 0;

export default class StartGameApplication {
  constructor(model) {
    this.model = model;
    this.divGame = createDivGame();
  }

  checkedAnswersGenre(game, data) {
    for (const it of data) {
      /* если хотябы 1 ответ не верен, отнимаю жизнь и выхожу из цикла, записываю ответ в массив ответов */
      if (it.value !== game.answerTrue()) {
        game.answerUpdateFalse();
        return;
      }
    }
    game.answerUpdateTrue();
    return;
  }

  updateCreateGenreTemplate(game, data, music) {
    game.currentTime();
    data.className = `game game--genre`;
    let startTime = game.time;
    const genre = new GameGenre(music[0]);

    genre.checkedMusic = (evt, buttons, tracks, current) => {
      this.audioManipulated(evt, buttons, tracks, current);
    };

    genre.nextLevel = (buttons) => {
      this.checkedAnswersGenre(game, buttons, startTime);
      this.updateTopTemplate(game.state, data);
      if (game.isLiveFail()) {
        this.stopTimer();
        return Application.showResultatsFail(game);
      }
      data.removeChild(genre.element);
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        return Application.showResultatsWin(game);
      }
      /* удалаю элемент */
      /* запускаю второй экран, поставил функцию победы только на второй экран, так как только на нем может кончится длинна вопросов из 10 (в данных условиях) */
      return this.checkedTypeAnswers(game, data, music);
    };

    return genre.element;
  }

  checkedTypeAnswers(game, data, music) {
    let questType = music[0].type;
    if (questType === `genre`) {
      return data.append(this.updateCreateGenreTemplate(game, data, music));
    } else {
      return data.append(this.updateCreateArtistTemplate(game, data, music));
    }
  }

  /* для проигрывания музыки в жанре*/

  audioManipulated(evt, buttons, tracks) {
    if (evt.target.className === `track__button track__button--play`) {
      for (const it of buttons) {
        if (it.className === `track__button track__button--pause`) {
          it.className = `track__button track__button--play`;
          tracks[it.dataset.button].pause();
        }
      }
      evt.target.className = `track__button track__button--pause`;
      tracks[evt.target.dataset.button].play();
      
    } else {
      evt.target.className = `track__button track__button--play`;
      tracks[evt.target.dataset.button].pause();
    }
  }

  updateCreateArtistTemplate(game, data, music) {
    game.currentTime();
    data.className = `game game--artist`;
    const artist = new GameArtist(music[0]);

    artist.checkedMusic = (evt, track) => {
      if (evt.target.className === `track__button track__button--play`) {
        evt.target.className = `track__button track__button--pause`;
        track.play();
      } else {
        evt.target.className = `track__button track__button--play`;
        track.pause();
      }
    };

    artist.nextLevel = (button) => {
      if (button.value !== game.answerTrue()) {
        game.answerUpdateFalse();
        this.updateTopTemplate(game.state, data);
      } else {
        game.answerUpdateTrue();
        this.updateTopTemplate(game.state, data);
      }
      if (game.isTimeFail()) {
        this.stopTimer();
        return Application.showResultatsFail(game);
      }
      if (game.isLiveFail()) {
        this.stopTimer();
        return Application.showResultatsFail(game);
      }
      data.removeChild(artist.element);
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        return Application.showResultatsWin(game);
      }
      return this.checkedTypeAnswers(game, data, music);
    };
    return artist.element;
  }

  /* обновляю верхний экран, удаляю первый див под него при обновлении */

  updateTopTemplate(object, data) {
    if (data.childNodes.length === 2) {
      data.removeChild(data.querySelector(`:first-child`));
    }
    const header = new Header(object);
    header.reGame = () => {
      Application.start();
    };
    data.prepend(header.element);
  }

  startTimer(game, divGame) {
    timer = setTimeout(() => {
      this.model.tick();
      this.updateTopTemplate(game.state, divGame);
      this.timerCheck(game);
      this.startTimer(game, divGame);
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(timer);
  }

  timerCheck(game) {
    if (game.state.time === 0) {
      this.stopTimer();
      return Application.showResultatsFail(NOT_WIN, game);
    }
    return -1;
  }

  startGame() {
    this.updateTopTemplate(this.model.state, this.divGame);
    this.startTimer(this.model, this.divGame);
    this.checkedTypeAnswers(this.model, this.divGame, this.model.packData);
  }
}

