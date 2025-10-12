document.addEventListener('DOMContentLoaded', () => {

  // === Footer dinámico ===
  const yearSpans = document.querySelectorAll('#year, #year2, #year3, #year4, #year5');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(el => el.textContent = currentYear);

  // === Mobile nav toggle ===
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    
  }

  // === Smooth scroll para anclas internas ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Scroll reveal genérico ===
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill, .tools-grid li, .project');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 100 && !el.classList.contains('revealed')) {
        setTimeout(() => {
          el.classList.add('revealed');
          // Animación de barras de habilidad
          if (el.classList.contains('skill')) {
            const bar = el.querySelector('.skill-bar div');
            if (bar) {
              const width = bar.getAttribute('style').match(/width:\s*(\d+%)/);
              if (width) bar.style.width = width[1];
            }
          }
        }, index * 100);
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // === Carrusel de proyectos ===
  const track = document.getElementById('track');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  if (track && next && prev) {
    next.addEventListener('click', () => track.scrollBy({ left: 350, behavior: 'smooth' }));
    prev.addEventListener('click', () => track.scrollBy({ left: -350, behavior: 'smooth' }));
  }

  // === Tilt 3D solo en no-touch devices ===
  const projects = document.querySelectorAll('.project');
  if (!('ontouchstart' in window)) {
    projects.forEach(project => {
      project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        const rotateX = dy * 10;
        const rotateY = dx * 10;
        project.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
      project.addEventListener('mouseleave', () => {
        project.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }

});
