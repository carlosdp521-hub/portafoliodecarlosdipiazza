// js/script.js

// Navegación responsive
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active'); // Usar 'active' para coincidir con CSS
    navToggle.setAttribute('aria-expanded', isActive);
  });
}

// Animación fade-in con IntersectionObserver
// Añadir la clase 'fade-in' a los elementos que quieres animar en tu HTML
// Ejemplo: <section id="sobre-mi" class="fade-in">
document.querySelectorAll('.fade-in').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  }, { threshold: 0.2 }); // El 20% del elemento debe ser visible
  observer.observe(el);
});

// Tema claro/oscuro con persistencia
const themeToggle = document.getElementById('theme-toggle');
const darkThemeClass = 'dark-theme';

function setTheme(dark) {
  if (dark) {
    document.body.classList.add(darkThemeClass);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove(darkThemeClass);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
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
const totalItems = items.length; // Renombrado para evitar conflicto con 'total' en showIndex
let currentIndex = 0; // Renombrado para evitar conflicto con 'index' en showIndex

// Calcular el ancho de un item dinámicamente, incluyendo el gap
function getItemWidth() {
  if (items.length === 0) return 0;
  const itemStyle = getComputedStyle(items[0]);
  const itemWidth = items[0].offsetWidth;
  const gap = parseFloat(itemStyle.marginRight) || parseFloat(getComputedStyle(galleryGrid).gap);
  return itemWidth + gap;
}

function showIndex(i) {
  if (!galleryGrid || items.length === 0) return;

  // Limitar índice para no mostrar espacios vacíos
  if (i < 0) {
    currentIndex = totalItems - 1;
  } else if (i >= totalItems) {
    currentIndex = 0;
  } else {
    currentIndex = i;
  }

  const widthToScroll = getItemWidth();
  galleryGrid.scrollTo({
    left: currentIndex * widthToScroll,
    behavior: 'smooth'
  });
}

prevBtn?.addEventListener('click', () => showIndex(currentIndex - 1));
nextBtn?.addEventListener('click', () => showIndex(currentIndex + 1));

// Auto slide cada 5 segundos
let autoSlide;
function startAutoSlide() {
  autoSlide = setInterval(() => showIndex(currentIndex + 1), 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Iniciar auto slide al cargar
startAutoSlide();

// Pausar auto slide al interactuar
[prevBtn, nextBtn, galleryGrid].forEach(el => {
  el?.addEventListener('mouseenter', stopAutoSlide);
  el?.addEventListener('mouseleave', startAutoSlide);
});

// Ajustar el carrusel si la ventana cambia de tamaño
window.addEventListener('resize', () => {
  // Recalcular la posición actual para evitar desalineaciones
  showIndex(currentIndex);
});
