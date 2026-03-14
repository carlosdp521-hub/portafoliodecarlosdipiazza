const themes = [
  "theme-blue",
  "theme-green",
  "theme-purple",
  "theme-cyan",
  "theme-gold"
];

let currentTheme = 0;

function applyTheme(theme){
  document.body.classList.remove(...themes);
  document.body.classList.add(theme);
}

function changeTheme(){
  currentTheme++;

  if(currentTheme >= themes.length){
    currentTheme = 0;
  }

  applyTheme(themes[currentTheme]);
}

function initTheme(){

  applyTheme(themes[0]);

  setInterval(changeTheme,12000);
}

document.addEventListener("DOMContentLoaded",initTheme);
