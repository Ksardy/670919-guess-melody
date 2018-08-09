'use strict';

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

const screens = Array.from(document.querySelectorAll(`template`)).
  map((it) => it.content);

let current;

/* Приветственный экран */

screens.forEach((item, index) => {
  if (item.firstElementChild.classList.contains(`welcome`)) {
    current = index;
    return;
  }
});

const main = document.querySelector(`main`);

const createArrow = () => {
  const nodeArrow = document.createElement(`div`);
  nodeArrow.className = `arrows__wrap`;
  nodeArrow.style = `position: absolute; top: 135px; left: 50%; margin-left: -56px;`;
  main.insertAdjacentElement(`beforeend`, nodeArrow);

  const nodeBtnLeft = document.createElement(`div`);
  nodeBtnLeft.className = `arrows__btn`;
  nodeBtnLeft.style = `background: none; border: 2px solid black; padding: 5px 20px;`;
  nodeBtnLeft.innerHTML = `<-`;
  nodeArrow.appendChild(nodeBtnLeft);

  const nodeBtnRight = document.createElement(`div`);
  nodeBtnRight.className = `arrows__btn`;
  nodeBtnRight.style = `background: none; border: 2px solid black; padding: 5px 20px;`;
  nodeBtnRight.innerHTML = `->`;
  nodeArrow.appendChild(nodeBtnRight);

  nodeBtnLeft.addEventListener(`click`, () => select(current + 1));
  nodeBtnRight.addEventListener(`click`, () => select(current - 1));
};

const selectSlide = (element) => {
  main.innerHTML = ``;
  main.appendChild(element.cloneNode(true));
  createArrow();
};

const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

select(current);
