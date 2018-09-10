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
    console.log(game._time);
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
        return Application.showResultatsFail(game.playersBalls, game);
      }
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        game.gameBalls();
        return Application.showResultatsWin(game.playersBalls, game);
      }
      /* удалаю элемент */
      data.removeChild(genre.element);
      /* запускаю второй экран, поставил функцию победы только на второй экран, так как только на нем может кончится длинна вопросов из 10 (в данных условиях) */
      return data.append(this.updateCreateArtistTemplate(game, data, music));
    };

    return genre.element;
  }

  /* для проигрывания музыки в жанре*/

  audioManipulated(evt, buttons, tracks, current) {
    if (evt.target.className === `track__button track__button--play`) {
      if (current !== evt.target.dataset.button) {
        buttons[current].className = `track__button track__button--play`;
        tracks[current].pause();
      }
      evt.target.className = `track__button track__button--pause`;
      tracks[evt.target.dataset.button].play();
      current = evt.target.dataset.button;
    } else {
      evt.target.className = `track__button track__button--play`;
      tracks[evt.target.dataset.button].pause();
      current = evt.target.dataset.button;
    }
  }

  updateCreateArtistTemplate(game, data, music) {
    game.currentTime();
    data.className = `game game--artist`;
    const artist = new GameArtist(music[0]);

    artist.checkedMusic = (evt, track) => {
      if (evt.target.className === `track__button track__button--pause`) {
        evt.target.className = `track__button track__button--play`;
        track.pause();
      } else {
        evt.target.className = `track__button track__button--pause`;
        track.pause();
      }
    };

    artist.nextLevel = (button) => {
      console.log(game.answerTrue());
      console.log(game.playersBalls);
      if (button.value !== game.answerTrue()) {
        game.answerUpdateFalse();
        this.updateTopTemplate(game.state, data);
      } else {
        game.answerUpdateTrue();
        this.updateTopTemplate(game.state, data);
      }
      if (game.isTimeFail()) {
        this.stopTimer();
        return Application.showResultatsFail(game.playersBalls, game);
      }
      if (game.isLiveFail()) {
        this.stopTimer();
        return Application.showResultatsFail(game.playersBalls, game);
      }
      game.nextAnswer();
      if (game.gameEnd()) {
        this.stopTimer();
        game.gameBalls();
        return Application.showResultatsWin(game.playersBalls, game);
      }
      data.removeChild(artist.element);
      return data.append(this.updateCreateGenreTemplate(game, data, music));
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
      Application.showWelcome();
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
      return Application.showResultatsFail(game.playersBalls, game);
    }
    return -1;
  }

  startGame() {
    this.updateTopTemplate(this.model.state, this.divGame);
    this.startTimer(this.model, this.divGame);
    this.divGame.append(this.updateCreateGenreTemplate(this.model, this.divGame, this.model.packData));
  }
}

