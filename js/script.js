/* =====================
   Gestor de Tema (Claro / Oscuro)
===================== */
class ThemeManager {
  constructor(button) {
    this.button = button;
    this.body = document.body;
    this.init();
  }

  init() {
    if (localStorage.getItem("theme") === "dark") {
      this.body.classList.add("dark");
      this.button.setAttribute("aria-pressed", "true");
    }
    this.button.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.body.classList.toggle("dark");
    const isDark = this.body.classList.contains("dark");
    this.button.setAttribute("aria-pressed", isDark ? "true" : "false");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
}

/* =====================
   Carrusel con Swipe
===================== */
class Carousel {
  constructor(trackId, prevId, nextId, autoplayMs = 4000) {
    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevId);
    this.nextBtn = document.getElementById(nextId);
    this.index = 0;
    this.autoplayMs = autoplayMs;
    this.autoplayInterval = null;

    // swipe
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;

    this.initEvents();
    this.startAutoplay();
    window.addEventListener("resize", () => this.update());
  }

  getProjectWidth() {
    const project = this.track.querySelector(".project");
    if (!project) return 300;
    const style = window.getComputedStyle(project);
    const gap = parseInt(style.marginRight) || 24;
    return project.offsetWidth + gap;
  }

  update() {
    const width = this.getProjectWidth();
    this.track.style.transition = "transform 0.3s ease";
    this.track.style.transform = `translateX(${-this.index * width}px)`;
  }

  next() {
    const total = this.track.querySelectorAll(".project").length;
    this.index = (this.index + 1) % total;
    this.update();
  }

  prev() {
    const total = this.track.querySelectorAll(".project").length;
    this.index = (this.index - 1 + total) % total;
    this.update();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), this.autoplayMs);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  // Swipe / Drag
  onDragStart(clientX) {
    this.isDragging = true;
    this.startX = clientX;
    this.currentX = clientX;
    this.track.style.transition = "none";
  }

  onDragMove(clientX) {
    if (!this.isDragging) return;
    this.currentX = clientX;
    const delta = this.currentX - this.startX;
    const width = this.getProjectWidth();
    const offset = -this.index * width + delta;
    this.track.style.transform = `translateX(${offset}px)`;
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    const delta = this.currentX - this.startX;
    const threshold = 50;
    if (delta > threshold) {
      this.prev();
    } else if (delta < -threshold) {
      this.next();
    } else {
      this.update();
    }
    this.resetAutoplay();
  }

  initEvents() {
    // Botones
    this.nextBtn.addEventListener("click", () => { this.next(); this.resetAutoplay(); });
    this.prevBtn.addEventListener("click", () => { this.prev(); this.resetAutoplay(); });

    // Pausa autoplay
    this.track.addEventListener("mouseenter", () => this.stopAutoplay());
    this.track.addEventListener("mouseleave", () => this.startAutoplay());

    // Teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { this.next(); this.resetAutoplay(); }
      if (e.key === "ArrowLeft") { this.prev(); this.resetAutoplay(); }
    });

    // Touch
    this.track.addEventListener("touchstart", e => this.onDragStart(e.touches[0].clientX));
    this.track.addEventListener("touchmove", e => this.onDragMove(e.touches[0].clientX));
    this.track.addEventListener("touchend", () => this.onDragEnd());

    // Mouse drag
    this.track.addEventListener("mousedown", e => this.onDragStart(e.clientX));
    this.track.addEventListener("mousemove", e => this.onDragMove(e.clientX));
    this.track.addEventListener("mouseup", () => this.onDragEnd());
    this.track.addEventListener("mouseleave", () => this.onDragEnd());
  }
}

/* =====================
   Navbar móvil
===================== */
function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navMenu");
  toggle.addEventListener("click", () => {
    const expanded = menu.classList.toggle("show");
    toggle.setAttribute("aria-expanded", expanded);
  });
}

/* =====================
   Inicialización
===================== */
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager(document.getElementById("themeBtn"));
  new Carousel("track", "prev", "next", 4000);
  initMenu();
});
