document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const projects = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let index = 0;

  // Obtener gap definido en CSS (en px)
  function getGap() {
    const style = getComputedStyle(track);
    const gap = style.gap || style.columnGap || '0px';
    return parseInt(gap, 10);
  }

  // Actualiza la posición del carrusel según el índice actual
  function updateCarousel() {
    if (!projects.length) return;

    const gap = getGap();
    const projectWidth = projects[0].getBoundingClientRect().width;
    const moveX = (projectWidth + gap) * index;

    track.style.transform = `translateX(-${moveX}px)`;

    // Actualizar estado botones
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= projects.length - 1;

    // Actualizar aria-hidden para accesibilidad
    projects.forEach((proj, i) => {
      proj.setAttribute('aria-hidden', i !== index);
      proj.tabIndex = i === index ? 0 : -1;
    });
  }

  // Manejadores de botones
  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (index < projects.length - 1) {
      index++;
      updateCarousel();
    }
  });

  // Navegación con teclado (flechas izquierda/derecha)
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('.carousel')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (index > 0) {
          index--;
          updateCarousel();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (index < projects.length - 1) {
          index++;
          updateCarousel();
        }
      }
    }
  });

  // Debounce para resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 150);
  });

  // Inicializar
  updateCarousel();
});
