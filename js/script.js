document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    const scrollAmount = 300;

    // Botones manuales
    nextBtn.addEventListener("click", () => {
        galleryGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        galleryGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Movimiento automático infinito
    setInterval(() => {
        if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - 1) {
            galleryGrid.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            galleryGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }, 3000);

    // Animación fade-in
    const items = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));

    // Menú responsive
    document.querySelector(".nav-toggle").addEventListener("click", () => {
        document.querySelector(".nav-menu").classList.toggle("show");
    });
});
