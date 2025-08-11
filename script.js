document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       GALERÍA DE IMÁGENES
    ============================ */
    const galleryGrid = document.querySelector(".gallery-grid");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");
    const scrollAmount = 300;
    let autoScrollInterval;

    if (galleryGrid) {
        const scrollGallery = (direction = 1) => {
            galleryGrid.scrollBy({
                left: scrollAmount * direction,
                behavior: "smooth"
            });
        };

        // Botones manuales
        if (prevBtn) prevBtn.addEventListener("click", () => scrollGallery(-1));
        if (nextBtn) nextBtn.addEventListener("click", () => scrollGallery(1));

        // Auto-scroll infinito
        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                const atEnd = galleryGrid.scrollLeft >= (galleryGrid.scrollWidth - galleryGrid.clientWidth - 1);
                if (atEnd) {
                    galleryGrid.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollGallery(1);
                }
            }, 3000);
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        };

        startAutoScroll();

        galleryGrid.addEventListener("mouseenter", stopAutoScroll);
        galleryGrid.addEventListener("mouseleave", startAutoScroll);
    }

    /* ===========================
       ANIMACIÓN FADE-IN (mejorada para galería)
    ============================ */
    const fadeItems = document.querySelectorAll(".fade-in, .gallery-grid .project-item");

    if (fadeItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Si quieres que solo aparezca la primera vez:
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeItems.forEach(item => observer.observe(item));
    }

    /* ===========================
       MENÚ RESPONSIVE
    ============================ */
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isShown = navMenu.classList.toggle("show");
            navToggle.setAttribute("aria-expanded", isShown);
        });
    }

    /* ===========================
       NAVEGACIÓN SUAVE Y CAMBIO DE URL
    ============================ */
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Evita el comportamiento por defecto del enlace

            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID al que apunta el enlace

            // Usamos pushState para actualizar la URL sin recargar la página
            window.history.pushState(null, null, `/${targetId}`);

            // Desplazamos a la sección correspondiente
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });  // Realiza el desplazamiento con suavidad
            }
        });
    });

});
