/* =====================
   Modo oscuro / claro
===================== */
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

// Verificar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.setAttribute("aria-pressed", "true");
}

// Cambiar tema
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeBtn.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


/* =====================
   Carrusel de proyectos
===================== */
const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;
let autoplay;

// Calcular el ancho del primer proyecto
function getProjectWidth() {
  const project = track.querySelector(".project");
  return project ? project.offsetWidth + 24 : 300; // 24 = gap aproximado
}

// Actualizar desplazamiento del carrusel
function updateCarousel() {
  const width = getProjectWidth();
  track.style.transform = `translateX(${-index * width}px)`;
}

// Avanzar a siguiente proyecto
function nextProject() {
  const projects = track.querySelectorAll(".project").length;
  index = (index + 1) % projects;
  updateCarousel();
}

// Retroceder al proyecto anterior
function prevProject() {
  const projects = track.querySelectorAll(".project").length;
  index = (index - 1 + projects) % projects;
  updateCarousel();
}

// Eventos de botones
nextBtn.addEventListener("click", () => {
  nextProject();
  resetAutoplay();
});
prevBtn.addEventListener("click", () => {
  prevProject();
  resetAutoplay();
});

// ==================== AUTOPLAY ====================
function startAutoplay() {
  autoplay = setInterval(nextProject, 7000); // cada 7s
}
function stopAutoplay() {
  clearInterval(autoplay);
}
function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}
startAutoplay();

// Pausar autoplay si el usuario pasa el mouse sobre el carrusel
track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

// ==================== NAVEGACIÓN CON TECLADO ====================
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextProject();
    resetAutoplay();
  }
  if (e.key === "ArrowLeft") {
    prevProject();
    resetAutoplay();
  }
});

// Ajustar carrusel si cambia el tamaño de la ventana
window.addEventListener("resize", updateCarousel);

/* =====================
   Modo oscuro / claro
===================== */
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

// Verificar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.setAttribute("aria-pressed", "true");
}

// Cambiar tema
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


/* =====================
   Carrusel de proyectos
===================== */
const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;
let autoplayInterval;

// calcular el ancho del primer proyecto
function getProjectWidth() {
  const project = track.querySelector(".project");
  return project ? project.offsetWidth + 24 : 300; // 24 = gap aproximado
}

function updateCarousel() {
  const width = getProjectWidth();
  track.style.transform = `translateX(${-index * width}px)`;
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
  const projects = track.querySelectorAll(".project").length;
  if (index < projects - 1) {
    index++;
  } else {
    index = 0; // volver al inicio
  }
  updateCarousel();
});

// Botón anterior
prevBtn.addEventListener("click", () => {
  const projects = track.querySelectorAll(".project").length;
  if (index > 0) {
    index--;
  } else {
    index = projects - 1; // ir al último
  }
  updateCarousel();
});

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    nextBtn.click();
  }, 4000); // cada 4 segundos
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Iniciar autoplay
startAutoplay();

// Pausar cuando el mouse entra
track.addEventListener("mouseenter", stopAutoplay);
// Reanudar cuando el mouse sale
track.addEventListener("mouseleave", startAutoplay);

// Ajustar si cambia el tamaño de la ventana
window.addEventListener("resize", updateCarousel);
