const themes = [
  "theme-blue",
  "theme-green",
  "theme-purple",
  "theme-cyan",
  "theme-gold"
];

let currentTheme = 0;

function applyTheme(theme) {
  document.body.classList.remove(...themes);
  document.body.classList.add(theme);
}

function saveTheme(theme) {
  try {
    localStorage.setItem("selectedTheme", theme);
  } catch (error) {
    console.warn("No se pudo guardar el tema:", error);
  }
}

function loadTheme() {
  try {
    const stored = localStorage.getItem("selectedTheme");
    return themes.includes(stored) ? stored : themes[0];
  } catch (error) {
    return themes[0];
  }
}

function changeTheme() {
  currentTheme++;
  if (currentTheme >= themes.length) {
    currentTheme = 0;
  }

  const nextTheme = themes[currentTheme];
  applyTheme(nextTheme);
  saveTheme(nextTheme);
}

function initTheme() {
  const initialTheme = loadTheme();
  currentTheme = themes.indexOf(initialTheme);
  if (currentTheme === -1) {
    currentTheme = 0;
  }

  applyTheme(themes[currentTheme]);
  setInterval(changeTheme, 12000);

  const themeSwitcher = document.getElementById("theme-switcher");
  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", () => {
      changeTheme();
    });
  }
}

document.addEventListener("DOMContentLoaded", initTheme);
