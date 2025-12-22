/* ===== MODO OSCURO ===== */
const darkBtn = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

/* ===== MENÚ MÓVIL ===== */
const menuBtn = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
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

/* ===== FIN SCRIPT ===== */