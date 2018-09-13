import Welcome from './welcome-screen.js';
import QuestModel from './quest-model.js';
import StartGame from './game-screen.js';
import Resultat from './game-resultats.js';
import ErrorScreen from './levels/error.js';
import {selectSlide} from './utils.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questData;

class Application {

  static start() {
    Application.loadWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => questData = data).
      then((questData) => console.log(questData)).
      then((response) => Application.showWelcome()).
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

  static showResultatsFail(arr, game) {
    const resultat = new Resultat(arr, game);
    resultat.resultatsFail();
  }

  static showResultatsWin(arr, game) {
    const resultat = new Resultat(arr, game);
    resultat.resultatsWin();
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    selectSlide(errorScreen.element);
  }

}

export default Application;
