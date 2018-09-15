import {createDivGame} from './utils.js';
import GameArtist from './levels/game-artist.js';
import GameGenre from './levels/game-genre.js';
import Application from './application.js';
import Header from './levels/game-top.js';

const ONE_SECOND = 1000;

let timer;

export default class StartGameApplication {
  constructor(model) {
    this.model = model;
    this.divGame = createDivGame();
  }

  checkAnswersGenre(game, data) {
    for (const it of data) {
      /* если хотябы 1 ответ не верен, отнимаю жизнь и выхожу из цикла, записываю ответ в массив ответов */
      if (it.value !== game.takeAnswerTrue()) {
        game.answerUpdateFalse();
        return;
      }
    }
    game.answerUpdateTrue();
    return;
  }

  updateCreateGenreTemplate(game, data, sounds) {
    game.takeCurrentTime();
    data.className = `game game--genre`;
    let startTime = game.time;
    const genre = new GameGenre(sounds[0]);

    genre.onCheckMusic = (evt, buttons, tracks, current) => {
      this.audioSwitch(evt, buttons, tracks, current);
    };

    genre.onSelectNextLevel = (buttons) => {
      this.checkAnswersGenre(game, buttons, startTime);
      this.updateTopTemplate(game.state, data);
      if (game.isLiveFail()) {
        this.stopTimer();
        return Application.showResultsFail(game);
      }
      data.removeChild(genre.element);
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        return Application.showResultsWin(game);
      }
      /* удалаю элемент */
      /* запускаю второй экран, поставил функцию победы только на второй экран, так как только на нем может кончится длинна вопросов из 10 (в данных условиях) */
      return this.checkTypeAnswers(game, data, sounds);
    };

    return genre.element;
  }

  checkTypeAnswers(game, data, sounds) {
    let questType = sounds[0].type;
    if (questType === `genre`) {
      return data.append(this.updateCreateGenreTemplate(game, data, sounds));
    } else {
      return data.append(this.updateCreateArtistTemplate(game, data, sounds));
    }
  }

  /* для проигрывания музыки в жанре*/

  audioSwitch(evt, buttons, tracks) {
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

  updateCreateArtistTemplate(game, data, sounds) {
    game.takeCurrentTime();
    data.className = `game game--artist`;
    const artist = new GameArtist(sounds[0]);

    artist.onCheckMusic = (evt, track) => {
      if (evt.target.className === `track__button track__button--play`) {
        evt.target.className = `track__button track__button--pause`;
        track.play();
      } else {
        evt.target.className = `track__button track__button--play`;
        track.pause();
      }
    };

    artist.onSelectNextLevel = (button) => {
      if (button.value !== game.takeAnswerTrue()) {
        game.answerUpdateFalse();
        this.updateTopTemplate(game.state, data);
      } else {
        game.answerUpdateTrue();
        this.updateTopTemplate(game.state, data);
      }
      if (game.isTimeFail()) {
        this.stopTimer();
        return Application.showResultsFail(game);
      }
      if (game.isLiveFail()) {
        this.stopTimer();
        return Application.showResultsFail(game);
      }
      data.removeChild(artist.element);
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        return Application.showResultsWin(game);
      }
      return this.checkTypeAnswers(game, data, sounds);
    };
    return artist.element;
  }

  /* обновляю верхний экран, удаляю первый див под него при обновлении */

  updateTopTemplate(object, data) {
    if (data.childNodes.length === 2) {
      data.removeChild(data.querySelector(`:first-child`));
    }
    const header = new Header(object);
    header.onRestart = () => {
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
      return Application.showResultsFail(game);
    }
    return -1;
  }

  startGame() {
    this.updateTopTemplate(this.model.state, this.divGame);
    this.startTimer(this.model, this.divGame);
    this.checkTypeAnswers(this.model, this.divGame, this.model.packData);
  }
}

