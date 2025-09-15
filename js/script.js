/* ==========================
   NAVBAR TOGGLE (Responsive)
========================== */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* ==========================
   CERRAR MENÚ AL HACER CLIC
========================== */
document.querySelectorAll(".nav-link").forEach(link =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  })
);

/* ==========================
   SCROLL SUAVE
========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60, // ajuste para navbar fija
        behavior: "smooth"
      });
    }
  });
});

/* ==========================
   ANIMACIONES SCROLL (Fade-in)
========================== */
const fadeElements = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});
