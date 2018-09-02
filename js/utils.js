const SVG_RADIUS = 2325;

const MAX_TIME = 300;

export const rand = (arr) => Math.floor(Math.random() * arr.length);

export const shuffle = (arr) => {
  let map = arr;
  let currentIndex = map.length;
  let temporaryValue;
  let randomIndex;
  for (let i = 0; i < map.length; i++) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = map[currentIndex];
    map[currentIndex] = map[randomIndex];
    map[randomIndex] = temporaryValue;
  }
  return map;
};

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


export const selectSlideGame = (data, element) => {
  return data.append(element);
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
  const arr = (state / 60).toFixed(2).split(`.`);
  return arr[1];
};

export const createTimeDasharray = (state)=> {
  let dash;
  if (state === MAX_TIME) {
    dash = 0;
  }
  if (state <= 0) {
    dash = SVG_RADIUS;
  } else {
    const time = state / MAX_TIME;
    dash = SVG_RADIUS - SVG_RADIUS * time;
  }
  return `stroke-dasharray="` + SVG_RADIUS + `" stroke-dashoffset="` + dash + `"`;
};
