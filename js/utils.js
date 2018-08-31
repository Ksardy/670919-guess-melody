
export const wrapperSlide = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const main = document.querySelector(`section.main`);

export const selectSlide = (template) => {
  main.innerHTML = ``;
  main.appendChild(template);
};


export const selectSlideGame = (data, element) => {
  data.append(element);
};

export const createDivGame = () => {
  const divGame = document.createElement(`div`);
  divGame.className = `game`;
  main.innerHTML = ``;
  main.appendChild(divGame);
};
export const createSecunds = (state) => {
  const arr = (state / 60).toFixed(2).split(`.`);
  return arr[1];
};
