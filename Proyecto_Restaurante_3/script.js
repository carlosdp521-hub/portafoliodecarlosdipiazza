// =========================
// REFERENCIAS DEL DOM
// =========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navbar = document.getElementById("navbar");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id], header[id]");
const revealElements = document.querySelectorAll(".reveal");
const btnArriba = document.getElementById("btnArriba");
const formContacto = document.getElementById("form-contacto");
const formAcceso = document.querySelector(".formulario-simple");
const formRegistro = document.querySelector(".formulario-registro");

// =========================
// MENÚ MÓVIL
// =========================
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navAnchors.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =========================
// BOTÓN VOLVER ARRIBA + NAVBAR
// =========================
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }

  if (btnArriba) {
    btnArriba.style.display = window.scrollY > 250 ? "block" : "none";
  }

  activarSeccionActual();
});

if (btnArriba) {
  btnArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// =========================
// ANIMACIÓN DE APARICIÓN
// =========================
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => revealObserver.observe(element));

// =========================
// ENLACE ACTIVO SEGÚN SECCIÓN
// =========================
function activarSeccionActual() {
  let currentId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentId = section.getAttribute("id");
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove("active");
    const target = link.getAttribute("href").replace("#", "");

    if (target === currentId) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("load", activarSeccionActual);

// =========================
// FORMULARIOS
// =========================
if (formContacto) {
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Tu solicitud de reserva fue enviada correctamente.");
    formContacto.reset();
  });
}

if (formAcceso) {
  formAcceso.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Acceso enviado correctamente.");
    formAcceso.reset();
  });
}

if (formRegistro) {
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registro enviado correctamente.");
    formRegistro.reset();
  });
}