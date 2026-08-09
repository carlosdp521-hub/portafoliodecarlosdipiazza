const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const contactForm = $('#contact-form');
const formStatus = $('#form-status');
const yearElement = $('#year');
const sections = $$('main section[id]');
const navLinks = $$('.nav-link[href^="#"]');
const themeToggle = $('#theme-toggle');
const mainNav = $('#main-nav');

const getStoredTheme = () => {
  try {
    return localStorage.getItem('portfolio-theme');
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch {
    // El sitio continúa funcionando aunque localStorage esté bloqueado.
  }
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Activar modo claro' : 'Activar modo oscuro'
    );

    const icon = $('.theme-icon', themeToggle);
    const label = $('.theme-label', themeToggle);

    if (icon) icon.textContent = isDark ? '☀' : '◐';
    if (label) label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  }
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = getStoredTheme();
applyTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

if (!savedTheme) {
  systemTheme.addEventListener?.('change', (event) => {
    applyTheme(event.matches ? 'dark' : 'light');
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const setFormStatus = (message, type = 'muted') => {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.className = `form-status mt-3 mb-0 text-${type}`;
};

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = $('button[type="submit"]', contactForm);
    const buttonLabel = $('.button-label', submitButton);
    const formData = Object.fromEntries(new FormData(contactForm).entries());

    if (formData._honey) return;

    setFormStatus('Enviando mensaje...', 'muted');

    if (submitButton) {
      submitButton.disabled = true;
      if (buttonLabel) buttonLabel.textContent = 'Enviando...';
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Nuevo mensaje desde el portafolio',
          _template: 'table'
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setFormStatus('¡Gracias! Tu mensaje fue enviado correctamente.', 'success');
      contactForm.reset();
    } catch (error) {
      const message = error.name === 'AbortError'
        ? 'La solicitud tardó demasiado. Intenta nuevamente.'
        : 'No fue posible enviar el mensaje. Intenta nuevamente o escríbeme directamente a carlosmdipiazzaf@gmail.com.';

      setFormStatus(message, 'danger');
    } finally {
      window.clearTimeout(timeoutId);

      if (submitButton) {
        submitButton.disabled = false;
        if (buttonLabel) buttonLabel.textContent = 'Enviar mensaje';
      }
    }
  });
}

const closeMobileMenu = () => {
  if (!mainNav || !window.bootstrap) return;

  const instance = bootstrap.Collapse.getInstance(mainNav);
  if (instance && window.innerWidth < 992) {
    instance.hide();
  }
};

navLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveLink(visible.target.id);
    },
    { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25, 0.5] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const assistantToggle = $('#assistant-toggle');
const assistantPanel = $('#virtual-assistant');
const assistantClose = $('#assistant-close');
const assistantForm = $('#assistant-form');
const assistantInput = $('#assistant-input');
const assistantMessages = $('#assistant-messages');
const assistantSuggestions = $$('[data-question]');

const normalizeQuestion = (text) => text
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const getAssistantReply = (question) => {
  const text = normalizeQuestion(question);

  if (/(hola|buenas|hello|hi)/.test(text)) {
    return '¡Hola! Soy el asistente virtual de Carlos. Puedo contarte sobre su perfil, experiencia, habilidades, proyectos, CV o contacto.';
  }

  if (/(proyecto|cctv|redes|biometr|ubiquiti|huawei|lectmocity|vehiculo|adivina)/.test(text)) {
    return 'Carlos cuenta con proyectos de seguridad electrónica y telecomunicaciones, además de proyectos académicos en Java y Python. Puedes revisarlos en la sección Proyectos.';
  }

  if (/(perfil|sobre mi|quien eres|quien es carlos|presentacion)/.test(text)) {
    return 'Carlos Di Piazza es Analista Programador con experiencia práctica en redes, telecomunicaciones, soporte técnico y seguridad electrónica.';
  }

  if (/(experiencia|trabajo|empresa|clicksolutions|inge smart)/.test(text)) {
    return 'Carlos ha trabajado en proyectos de CCTV, control de acceso, detección de incendios, redes, telecomunicaciones y soporte técnico. Puedes ver el detalle en Experiencia.';
  }

  if (/(habilidad|tecnologia|conocimiento|skill|programacion|base de datos)/.test(text)) {
    return 'Sus principales áreas son redes y telecomunicaciones, seguridad electrónica y CCTV, soporte técnico, programación y bases de datos.';
  }

  if (/(cv|curriculum|descargar)/.test(text)) {
    return 'Puedes revisar el CV en la sección Currículum o descargar el PDF desde el sitio.';
  }

  if (/(contact|correo|email|telefono|llamar|whatsapp)/.test(text)) {
    return 'Puedes contactar a Carlos por correo en carlosmdipiazzaf@gmail.com o por teléfono al +56 9 7909 5565.';
  }

  return 'Puedo ayudarte con información sobre el perfil, experiencia, habilidades, proyectos, CV o contacto. ¿Sobre cuál te gustaría saber más?';
};

const addAssistantMessage = (text, sender = 'bot') => {
  if (!assistantMessages) return;

  const message = document.createElement('div');
  message.className = `assistant-message ${sender}`;
  message.textContent = text;
  assistantMessages.appendChild(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const openAssistant = () => {
  if (!assistantPanel || !assistantToggle) return;

  assistantPanel.classList.add('is-open');
  assistantPanel.setAttribute('aria-hidden', 'false');
  assistantToggle.setAttribute('aria-expanded', 'true');

  window.setTimeout(() => assistantInput?.focus(), 100);
};

const closeAssistant = () => {
  if (!assistantPanel || !assistantToggle) return;

  assistantPanel.classList.remove('is-open');
  assistantPanel.setAttribute('aria-hidden', 'true');
  assistantToggle.setAttribute('aria-expanded', 'false');
  assistantToggle.focus();
};

if (assistantToggle && assistantPanel && assistantForm && assistantInput) {
  addAssistantMessage(
    '¡Hola! Soy el asistente virtual de Carlos. ¿Qué te gustaría conocer?'
  );

  assistantToggle.addEventListener('click', openAssistant);
  assistantClose?.addEventListener('click', closeAssistant);

  assistantForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const question = assistantInput.value.trim();
    if (!question) return;

    addAssistantMessage(question, 'user');
    assistantInput.value = '';

    window.setTimeout(() => {
      addAssistantMessage(getAssistantReply(question));
    }, 250);
  });

  assistantSuggestions.forEach((button) => {
    button.addEventListener('click', () => {
      const question = button.dataset.question;
      if (!question) return;

      addAssistantMessage(question, 'user');
      window.setTimeout(() => {
        addAssistantMessage(getAssistantReply(question));
      }, 250);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && assistantPanel.classList.contains('is-open')) {
      closeAssistant();
    }
  });
}
