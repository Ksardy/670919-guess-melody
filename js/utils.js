
export const wrapperSlide = (template) => {
  const wrapper = document.createElement(`section`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const main = document.querySelector(`section.main`);

export const selectSlide = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export const getRandom = (names) => names[Math.floor(Math.random() * names.length)];
