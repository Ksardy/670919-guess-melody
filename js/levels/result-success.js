
const createSuccesResultats = (state) => `<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">${state.title}</h2>
<p class="result__total">${state.total}</p>
<p class="result__text">${state.text}</p>
<button class="result__replay" type="button">Сыграть ещё раз</button>
</section>`;

export default createSuccesResultats;
