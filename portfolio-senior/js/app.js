const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const yearNode = document.getElementById('currentYear');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (yearNode) yearNode.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach((link) => {
  if (link.getAttribute('href') === page) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const storedTheme = localStorage.getItem('portfolio-theme') || 'cosmos';
root.dataset.theme = storedTheme;
if (themeToggle) {
  const labels = { cosmos: 'Cosmos', aurora: 'Aurora', light: 'Light' };
  themeToggle.querySelector('span:last-child').textContent = labels[storedTheme] || 'Tema';
  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'cosmos' ? 'aurora' : root.dataset.theme === 'aurora' ? 'light' : 'cosmos';
    root.dataset.theme = next;
    localStorage.setItem('portfolio-theme', next);
    themeToggle.querySelector('span:last-child').textContent = labels[next];
  });
}

const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

const cursor = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  root.style.setProperty('--cursor-x', `${event.clientX}px`);
  root.style.setProperty('--cursor-y', `${event.clientY}px`);
  if (cursor) cursor.classList.add('active');
});

window.addEventListener('pointerdown', () => cursor?.classList.add('pulse'));
window.addEventListener('pointerup', () => cursor?.classList.remove('pulse'));

const starCanvas = document.getElementById('galaxyCanvas');
if (starCanvas) {
  const ctx = starCanvas.getContext('2d');
  let stars = [];
  let width = 0;
  let height = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  const makeStars = () => {
    width = starCanvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    height = starCanvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
    starCanvas.style.width = `${window.innerWidth}px`;
    starCanvas.style.height = `${window.innerHeight}px`;
    const count = Math.min(180, Math.floor(window.innerWidth / 8));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const dx = (pointerX * (window.devicePixelRatio || 1) - width / 2) * 0.0009;
    const dy = (pointerY * (window.devicePixelRatio || 1) - height / 2) * 0.0009;

    for (const star of stars) {
      star.x += star.vx + dx;
      star.y += star.vy + dy;
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });
  window.addEventListener('resize', makeStars);
  makeStars();
  draw();
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre')?.value.trim() || 'No indicado';
    const email = document.getElementById('email')?.value.trim() || 'No indicado';
    const asunto = document.getElementById('asunto')?.value.trim() || 'Consulta desde portafolio premium';
    const mensaje = document.getElementById('mensaje')?.value.trim() || 'Hola Carlos, me gustaría conversar contigo.';

    const bodyMail = [`Nombre: ${nombre}`, `Correo: ${email}`, '', mensaje].join('\n');
    window.location.href = `mailto:${window.siteData?.profile?.email || 'carlosmdipiazzaf@gmail.com'}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(bodyMail)}`;
  });
}
