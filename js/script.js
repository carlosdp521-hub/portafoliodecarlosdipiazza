// 🌗 Botón de tema
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeBtn.setAttribute("aria-pressed", "true");
}

// Alternar tema al hacer click
themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");

  themeBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
