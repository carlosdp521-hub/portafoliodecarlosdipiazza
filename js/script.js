// js/script.js

// Navegación responsive
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
  });
}

// Animación fade-in con IntersectionObserver
document.querySelectorAll('.fade-in').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  }, { threshold: 0.2 });
  observer.observe(el);
});

// Tema claro/oscuro con persistencia
const themeToggle = document.getElementById('theme-toggle');
const darkThemeClass = 'dark-theme';

function setTheme(dark) {
  if (dark) {
    document.body.classList.add(darkThemeClass);
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove(darkThemeClass);
    themeToggle.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem('darkTheme', dark);
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('darkTheme');
setTheme(savedTheme === 'true');

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle(darkThemeClass);
  themeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('darkTheme', isDark);
});

// Formulario contacto con validación simple y simulación de envío
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Validación simple
    const nombre = contactForm.nombre.value.trim();
    const email = contactForm.email.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Simulación de envío
    alert('✅ Mensaje enviado (simulado)');
    contactForm.reset();
  });
}

// Carrusel de proyectos
const galleryGrid = document.querySelector('.gallery-grid');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
const items = document.querySelectorAll('.gallery-item');
const total = items.length;
let index = 0;
const itemWidth = 270; // Ajustar si cambia CSS

function showIndex(i) {
  // Limitar índice para no mostrar espacios vacíos
  if (i < 0) i = total - 1;
  if (i >= total) i = 0;
  index = i;
  galleryGrid.style.transform = `translateX(-${index * itemWidth}px)`;
}

prevBtn?.addEventListener('click', () => showIndex(index - 1));
nextBtn?.addEventListener('click', () => showIndex(index + 1));

// Auto slide cada 5 segundos
let autoSlide = setInterval(() => showIndex(index + 1), 5000);

// Pausar auto slide al interactuar
[prevBtn, nextBtn, galleryGrid].forEach(el => {
  el?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  el?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => showIndex(index + 1), 5000);
  });
});
