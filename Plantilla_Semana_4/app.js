const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("menu");
const scrollTopButton = document.getElementById("scrollTop");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("clave");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuTables = document.querySelectorAll(".menu-table");
const sections = document.querySelectorAll("main section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Ocultar" : "Ver";
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    menuTables.forEach((table) => {
      const matches = category === "all" || table.dataset.category === category;
      table.hidden = !matches;
    });
  });
});

const setMessage = (element, message, type) => {
  element.textContent = message;
  element.className = `form-message ${type}`;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const formReserva = document.getElementById("formReserva");
const mensajeReserva = document.getElementById("mensajeReserva");

if (formReserva && mensajeReserva) {
  formReserva.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = document.getElementById("personas").value;

    if (nombre.length < 3) {
      setMessage(mensajeReserva, "Ingresa un nombre válido de al menos 3 caracteres.", "error");
      return;
    }

    if (!validateEmail(correo)) {
      setMessage(mensajeReserva, "Ingresa un correo electrónico válido.", "error");
      return;
    }

    if (!fecha || !hora || !personas) {
      setMessage(mensajeReserva, "Completa todos los campos obligatorios de la reserva.", "error");
      return;
    }

    setMessage(mensajeReserva, "Reserva enviada correctamente. Pronto nos pondremos en contacto.", "success");
    formReserva.reset();
  });
}

const formRegistro = document.getElementById("formRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

if (formRegistro && mensajeRegistro) {
  formRegistro.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("emailRegistro").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (usuario.length < 4) {
      setMessage(mensajeRegistro, "El nombre de usuario debe tener al menos 4 caracteres.", "error");
      return;
    }

    if (!validateEmail(email)) {
      setMessage(mensajeRegistro, "Ingresa un correo válido para registrarte.", "error");
      return;
    }

    if (clave.length < 6) {
      setMessage(mensajeRegistro, "La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    setMessage(mensajeRegistro, "Registro realizado correctamente.", "success");
    formRegistro.reset();
    passwordInput.type = "password";
    togglePassword.textContent = "Ver";
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopButton.classList.add("show");
  } else {
    scrollTopButton.classList.remove("show");
  }

  let currentSection = "inicio";
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${currentSection}`);
  });
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));
