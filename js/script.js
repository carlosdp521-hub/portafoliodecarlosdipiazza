// Tema oscuro / claro
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.setAttribute('aria-pressed', isLight);
});

// Carrusel proyectos
const track = document.getElementById('track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

function updateCarousel() {
  const projectWidth = track.children[0].offsetWidth + 16; // ancho + gap
  track.style.transform = `translateX(${-index * projectWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  index = Math.max(0, index - 1);
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  index = Math.min(track.children.length - 1, index + 1);
  updateCarousel();
});

// Ajustar carrusel al redimensionar
window.addEventListener('resize', updateCarousel);
updateCarousel();
