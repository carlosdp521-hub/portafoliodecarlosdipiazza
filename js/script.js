// Detectar preferencia del sistema
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  document.body.classList.remove("dark-theme", "light-theme");
  document.body.classList.add(theme);
}

// Aplicar según preferencia inicial
applyTheme(prefersDarkScheme.matches ? "dark-theme" : "light-theme");

// Función para alternar
function toggleTheme() {
  if (document.body.classList.contains("dark-theme")) {
    applyTheme("light-theme");
  } else {
    applyTheme("dark-theme");
  }
}

// Ejemplo: botón de alternar (agrega en navbar)
const themeBtn = document.createElement("button");
themeBtn.textContent = "🌙";
themeBtn.className = "theme-toggle-btn";
themeBtn.style.cssText = `
position: fixed; bottom: 20px; right: 20px; 
padding: 10px 15px; border: none; border-radius: 50%; 
background: var(--btn-color); color:#121212; cursor:pointer; z-index:10000;
`;
document.body.appendChild(themeBtn);
themeBtn.addEventListener("click", toggleTheme);
