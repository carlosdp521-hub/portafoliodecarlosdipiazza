document.addEventListener("DOMContentLoaded", () => {
  const elementosReveal = document.querySelectorAll(".reveal");
  const botonArriba = document.getElementById("btnArriba");
  const navbar = document.getElementById("navbar");
  const formulario = document.querySelector(".formulario");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  elementosReveal.forEach((elemento) => observer.observe(elemento));

  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      botonArriba.style.display = "block";
      navbar.classList.add("scrolled");
    } else {
      botonArriba.style.display = "none";
      navbar.classList.remove("scrolled");
    }
  });

  botonArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Tu solicitud de reserva fue enviada correctamente.");
    formulario.reset();
  });
});