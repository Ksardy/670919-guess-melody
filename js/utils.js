const TIME = {
  MAX_TIME: 300,
  TIME_LOW: 30,
  NULL_SECONDS: 0,
  LOW_SECONDS: 10,
};

const SVG_RADIUS = 2325;

export const rand = (arr) => Math.floor(Math.random() * arr.length);

export const wrapperSlide = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const main = document.querySelector(`section.main`);

export const selectSlide = (template) => {
  main.innerHTML = ``;
  return main.appendChild(template);
};

export const createDivGame = () => {
  const divGame = document.createElement(`div`);
  divGame.className = `game`;
  main.innerHTML = ``;
  main.appendChild(divGame);
  const div = document.querySelector(`.game`);
  return div;
};

export const createSecunds = (state) => {
  const arr = Math.floor(state % 60);
  if (arr === TIME.NULL_SECONDS) {
    return `00`;
  }
  if (arr < TIME.LOW_SECONDS) {
    return `0` + arr;
  }
  return arr;
};

export const timeLow = (state) => {
  if (state <= TIME.TIME_LOW && state % 2 === 0) {
    return `style="color: red;"`;
  }
  return `style="color:"`;
};

export const createTimeDasharray = (state)=> {
  let dash;
  if (state === TIME.MAX_TIME) {
    dash = 0;
  }
  if (state <= 0) {
    dash = SVG_RADIUS;
  } else {
    const time = state / TIME.MAX_TIME;
    dash = SVG_RADIUS - SVG_RADIUS * time;
  }
  return `stroke-dasharray="` + SVG_RADIUS + `" stroke-dashoffset="` + dash + `"`;
};
