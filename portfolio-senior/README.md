# Portafolio Senior Style - Carlos Di Piazza

Versión premium del sitio web con una estética más cercana a un portafolio de ingeniero o desarrollador senior.

## Incluye

- fondo galaxia animado con canvas
- chatbot estilo ChatGPT que funciona sin backend
- cursor interactivo con resplandor
- diseño visual premium con efecto glassmorphism
- secciones con narrativa y movimiento estilo Apple
- integración preparada con GitHub API para repositorios y estadísticas
- versión lista para GitHub Pages

## Estructura

```text
portfolio-senior/
├── index.html
├── about.html
├── projects.html
├── skills.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── chatbot.js
│   └── github.js
├── data/
│   └── site-data.js
├── assets/
│   ├── logo.svg
│   └── favicon.svg
├── img/
│   └── profile-tech.svg
└── docs/
    └── CarlosDiPiazza-CV.pdf
```

## Activar GitHub real

Abre `data/site-data.js` y reemplaza:

```js
username: 'TU_USUARIO_GITHUB'
```

por tu usuario real. La página `projects.html` cargará automáticamente tus repositorios públicos y mostrará estadísticas básicas.

## Publicar

Sube la carpeta completa a tu repositorio y activa GitHub Pages en la rama principal.
