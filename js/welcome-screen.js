import {selectSlide} from './utils.js';
import Application from './application.js';
import Welcome from './levels/welcome.js';
import welcomeScreens from './welcome-data.js';

export default class WelcomeApplication {
  constructor() {
    this.welcome = new Welcome(welcomeScreens);
  }

  render() {
    this.welcome.onStartGame = () => Application.showGame();
    return selectSlide(this.welcome.element);
  }

  loaded() {
    this.welcome.loaded = (button) => {
      button.disabled = false;
      button.style = `cursor: default;`;
    };
  }
}
