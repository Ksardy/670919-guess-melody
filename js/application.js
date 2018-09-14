import Welcome from './welcome-screen.js';
import QuestModel from './quest-model.js';
import StartGame from './game-screen.js';
import Results from './game-results.js';
import ErrorScreen from './levels/error.js';
import {selectSlide} from './utils.js';
import Loader from './loader.js';

let questDatas = [];

class Application {

  static start() {
    Application.loadWelcome();
    Loader.loadData().
      then((data) => {
        questDatas = data;
        return questDatas;
      }).then(() => Loader.preLoadSounds(questDatas)).
      then(() => Application.showWelcome()).
      catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new Welcome();
    welcome.loaded();
    welcome.render();
  }

  static loadWelcome() {
    const welcome = new Welcome();
    welcome.render();
  }

  static showGame() {
    const data = new QuestModel(questDatas);
    const gameScreen = new StartGame(data);
    gameScreen.startGame();
  }

  static showResultsFail(game) {
    const playerBall = 0;
    const results = new Results(playerBall, game);
    results.resultsFail();
  }

  static showResultsWin(game) {
    game.createBall();
    Loader.saveResults(game).
      then(() => Loader.loadResults()).
      then((data) => new Results(data, game).resultsWin());
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    selectSlide(errorScreen.element);
  }

}

export default Application;
