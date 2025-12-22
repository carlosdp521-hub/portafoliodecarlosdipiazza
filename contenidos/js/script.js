document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => {
        card.style.opacity = "0";
        observer.observe(card);
    });
});

/* ===== FILTRO INSIGNIAS ===== */
const filterButtons = document.querySelectorAll(".filters button");
const badges = document.querySelectorAll(".badge-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        badges.forEach(badge => {
            badge.style.display =
                filter === "all" || badge.dataset.type === filter
                    ? "block"
                    : "none";
        });
    });
});
/* ===== FIN FILTRO INSIGNIAS ===== */

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});
