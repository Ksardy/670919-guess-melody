
export const render = (template) => {
  const wrapper = document.createElement(`section`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const main = document.querySelector(`section.main`);

export const selectSlide = (element) => {
  main.innerHTML = ``;
  main.appendChild(element.cloneNode(true));
};
