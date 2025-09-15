// NAVBAR TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link =>
  link.addEventListener("click", () => navMenu.classList.remove("active"))
);

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.getElementById(this.getAttribute("href").substring(1));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
    }
  });
});

// FADE-IN
const fadeElements = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => appearOnScroll.observe(el));

// GALERÍA DESLIZANTE
const galleryGrid = document.getElementById("gallery-grid");
const galleryItems = document.querySelectorAll(".gallery-item");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");

let scrollIndex = 0;
const totalItems = galleryItems.length;

function moveGallery(index) {
  const itemWidth = galleryItems[0].offsetWidth + 20; 
  galleryGrid.style.transform = `translateX(-${itemWidth * index}px)`;
}

prevBtn.addEventListener("click", () => {
  scrollIndex = (scrollIndex - 1 + totalItems) % totalItems;
  moveGallery(scrollIndex);
});
nextBtn.addEventListener("click", () => {
  scrollIndex = (scrollIndex + 1) % totalItems;
  moveGallery(scrollIndex);
});

setInterval(() => {
  scrollIndex = (scrollIndex + 1) % totalItems;
  moveGallery(scrollIndex);
}, 4000);

// EMAILJS FORM
document.querySelector(".contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", this)
    .then(() => {
      alert("✅ Mensaje enviado con éxito!");
      this.reset();
    }, (error) => {
      alert("❌ Error al enviar: " + JSON.stringify(error));
    });
});

// DARK MODE
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Aplicar tema por defecto
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark-theme");
}
