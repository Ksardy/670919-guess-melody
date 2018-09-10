import AbstractView from "./abstract-view";

export default class ErrorScreen extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <div style="color: black; font-size: 34px;">
        <p>Произошла ошибка: ${this.error.message}</p>
      </div>`;
  }

}
