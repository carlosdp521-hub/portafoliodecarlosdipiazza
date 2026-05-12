// Menú responsivo para dispositivos móviles
const btnMenu = document.getElementById("btnMenu");
const navegacion = document.getElementById("navegacion");

btnMenu.addEventListener("click", () => {
  navegacion.classList.toggle("activa");

  if (navegacion.classList.contains("activa")) {
    btnMenu.textContent = "✕";
    btnMenu.setAttribute("aria-label", "Cerrar menú de navegación");
  } else {
    btnMenu.textContent = "☰";
    btnMenu.setAttribute("aria-label", "Abrir menú de navegación");
  }
});

// Cerrar menú al seleccionar una sección
const enlaces = document.querySelectorAll(".menu a");

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    navegacion.classList.remove("activa");
    btnMenu.textContent = "☰";
    btnMenu.setAttribute("aria-label", "Abrir menú de navegación");
  });
});

// Simulación de envío de formulario
const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  alert("Reserva enviada correctamente. Gracias por preferir Sabores de Chile.");
  formulario.reset();
});
