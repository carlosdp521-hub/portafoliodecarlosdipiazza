// MENU MOBILE
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');

if(burger){
  burger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// SCROLL ANIMATIONS
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{threshold:0.2});

document.querySelectorAll('section, .card, h2').forEach(el => {
  el.classList.add('animate');
  observer.observe(el);
});

// ANIMAR BARRAS DE HABILIDADES
const skillBars = document.querySelectorAll('.skill-bar span');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const level = entry.target.dataset.level;
      entry.target.style.width = level;
    }
  });
},{threshold:0.5});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});
