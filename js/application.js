import Welcome from './welcome-screen.js';
import QuestModel from './quest-model.js';
import StartGame from './game-screen.js';
import Resultat from './game-resultats.js';

export default class Application {

  static showWelcome() {
    const welcome = new Welcome();
    welcome.render();
  }

  static showGame() {
    const data = new QuestModel();
    data.createPack();
    const gameScreen = new StartGame(data);
    gameScreen.startGame();
  }

  static restartGame() {
    const data = new QuestModel();
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

}
