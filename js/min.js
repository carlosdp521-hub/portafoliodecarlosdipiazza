const header = document.getElementById("header");
const sections = document.querySelectorAll(".section");
const skillFills = document.querySelectorAll(".skill-fill");
const typingElement = document.getElementById("typing");

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initSectionReveal();
  initSkillsAnimation();
  initTypingEffect();
});

function initHeaderScroll() {
  if (!header) return;

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scroll-active");
    } else {
      header.classList.remove("scroll-active");
    }
  };

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
}

function initSectionReveal() {
  if (!sections.length) return;

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  } else {
    sections.forEach((section) => section.classList.add("show"));
  }
}

function initSkillsAnimation() {
  if (!skillFills.length) return;

  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.dataset.width;

            if (width) {
              fill.style.width = width;
            }

            observer.unobserve(fill);
          }
        });
      },
      {
        threshold: 0.4
      }
    );

    skillFills.forEach((fill) => {
      fill.style.width = "0";
      skillsObserver.observe(fill);
    });
  } else {
    skillFills.forEach((fill) => {
      const width = fill.dataset.width;
      if (width) {
        fill.style.width = width;
      }
    });
  }
}

function initTypingEffect() {
  if (!typingElement) return;

  const text = "Analista Programador | Redes | Soporte TI | Automatización";
  let index = 0;
  typingElement.textContent = "";

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 45);
    }
  }

  type();
}