import Welcome from './welcome-screen.js';
import QuestModel from './quest-model.js';
import StartGame from './game-screen.js';
import Resultat from './game-resultats.js';
import ErrorScreen from './levels/error.js';
import {selectSlide} from './utils.js';
import Loader from './loader.js';

let questData = [];

class Application {

  static start() {
    Application.loadWelcome();
    Loader.loadData().
      then((data) => questData = data).
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
    const data = new QuestModel(questData);
    const gameScreen = new StartGame(data);
    gameScreen.startGame();
  }

  static showResultatsFail(game) {
    const playBalls = 0;
    const resultat = new Resultat(playBalls, game);
    resultat.resultatsFail();
  }

  static showResultatsWin(game) {
    game.createBall();
    Loader.saveResults(game).
      then(() => Loader.loadResults()).
      then((data) => new Resultat(data, game).resultatsWin()).
      catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    selectSlide(errorScreen.element);
  }

}

export default Application;
