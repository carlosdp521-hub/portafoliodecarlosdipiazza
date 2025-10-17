/* =========================================================
   SCRIPT PRINCIPAL - Portafolio V3.0 | Carlos Di Piazza
   ========================================================= */

// ======= 1️⃣ Mostrar año actual automáticamente en el footer =======
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ======= 2️⃣ Animación suave al hacer scroll =======
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".seccion, .card-experiencia, .card-proyecto, .card-habilidad");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
});

// ======= 3️⃣ Menú responsive (hamburguesa) =======
const menuCheckbox = document.getElementById("menu-bar");
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (menuCheckbox) menuCheckbox.checked = false;
  });
});

// ======= 4️⃣ Botón para volver arriba =======
const btnTop = document.createElement("button");
btnTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
btnTop.classList.add("btn-top");
document.body.appendChild(btnTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btnTop.classList.add("visible");
  } else {
    btnTop.classList.remove("visible");
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ======= 5️⃣ Animación de entrada del header =======
window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  header.classList.add("show");
});
