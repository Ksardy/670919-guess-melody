
const templateWelcome = (state) =>`  
<section class="welcome">
<div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
<h2 class="welcome__rules-title">${state.welcome.title}</h2>
<p class="welcome__text">${state.welcome.welcomeTest}</p>
<ul class="welcome__rules-list">
  <li>${state.welcome.rules[0]}</li>
  <li>${state.welcome.rules[1]}</li>
</ul>
<p class="welcome__text">${state.welcome.text}</p>
</section>`;

export default templateWelcome;
