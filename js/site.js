const header = document.getElementById("header");
const sections = document.querySelectorAll(".section, .hero");
const navLinks = document.querySelectorAll("nav a");
const skillFills = document.querySelectorAll(".skill-fill");
const typingElement = document.getElementById("typing");
const backToTop = document.getElementById("back-to-top");

function initHeaderScroll() {
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scroll-active");
    } else {
      header.classList.remove("scroll-active");
    }

    if (backToTop) {
      if (window.scrollY > 350) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

function initSectionReveal() {
  if (!sections.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("show"));
  }
}

function initSkillsAnimation() {
  if (!skillFills.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.dataset.width;

            if (width) {
              fill.style.width = width;
            }

            currentObserver.unobserve(fill);
          }
        });
      },
      {
        threshold: 0.4
      }
    );

    skillFills.forEach((fill) => {
      fill.style.width = "0";
      observer.observe(fill);
    });
  } else {
    skillFills.forEach((fill) => {
      const width = fill.dataset.width;
      if (width) fill.style.width = width;
    });
  }
}

function initTypingEffect() {
  if (!typingElement) return;

  const phrases = [
    "Analista Programador",
    "Redes y Telecomunicaciones",
    "Soporte Técnico TI",
    "Automatización y Soluciones Tecnológicas"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 1400;
      } else {
        delay = 70;
      }
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      } else {
        delay = 35;
      }
    }

    setTimeout(type, delay);
  }

  type();
}

function initActiveNavLinks() {
  if (!sections.length || !navLinks.length) return;

  const sectionMap = Array.from(sections)
    .map((section) => {
      const id = section.getAttribute("id");
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (!id || !link) return null;
      return { section, id, link };
    })
    .filter(Boolean);

  const updateActiveLink = () => {
    let currentId = "";

    sectionMap.forEach(({ section, id }) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentId = id;
      }
    });

    navLinks.forEach((link) => link.classList.remove("active"));

    if (currentId) {
      const activeLink = document.querySelector(`nav a[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
}

function initBackToTop() {
  if (!backToTop) return;

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSite() {
  initHeaderScroll();
  initSectionReveal();
  initSkillsAnimation();
  initTypingEffect();
  initActiveNavLinks();
  initBackToTop();
}

document.addEventListener("DOMContentLoaded", initSite);
