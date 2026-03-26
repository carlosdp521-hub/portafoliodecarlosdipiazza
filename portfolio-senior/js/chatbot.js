function initChatbot() {
  const chatbox = document.getElementById('chatbox');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('question');
  const chips = document.querySelectorAll('[data-question]');
  if (!chatbox || !form || !input) return;

  const data = window.siteData;

  const addMessage = (type, text) => {
    const row = document.createElement('div');
    row.className = `chat-message ${type}`;
    row.innerHTML = `<div class="chat-avatar">${type === 'bot' ? 'AI' : 'Yo'}</div><div class="chat-bubble">${text}</div>`;
    chatbox.appendChild(row);
    chatbox.scrollTop = chatbox.scrollHeight;
  };

  const answer = (question) => {
    const q = question.toLowerCase();
    const profile = data.profile;
    if (/perfil|resumen|quién|quien eres/.test(q)) {
      return `${profile.name} es ${profile.role}. ${profile.summary}`;
    }
    if (/tecnolog|habilidad|stack|manejas/.test(q)) {
      return `Las tecnologías y áreas principales son: ${profile.skills.join(', ')}.`;
    }
    if (/experiencia|trabajo|soporte|redes/.test(q)) {
      return `Experiencia destacada: ${profile.experience.join(' ')}`;
    }
    if (/github|repositorio|repositorios|stats|estadísticas/.test(q)) {
      const user = data.github.username;
      return user === 'TU_USUARIO_GITHUB'
        ? 'El sitio ya está preparado para conectarse a GitHub. Solo debes editar data/site-data.js y reemplazar TU_USUARIO_GITHUB por tu usuario real para mostrar tus repositorios y estadísticas en vivo.'
        : `El sitio se conecta al perfil de GitHub ${user} usando la API pública para mostrar repositorios, stars, forks y lenguajes.`;
    }
    if (/estudia|estudios|formación|formacion/.test(q)) {
      return `Formación actual y previa: ${profile.studies.join(' | ')}.`;
    }
    if (/contacto|correo|email|teléfono|telefono/.test(q)) {
      return `Puedes contactar a ${profile.name} por correo en ${profile.email} o por teléfono al ${profile.phone}.`;
    }
    if (/disponibilidad|freelance|oportunidad/.test(q)) {
      return profile.availability;
    }
    return 'Puedo responder sobre perfil profesional, habilidades, formación, experiencia técnica, contacto y conexión con GitHub.';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addMessage('user', value);
    const response = answer(value);
    input.value = '';
    setTimeout(() => addMessage('bot', response), 180);
  });

  chips.forEach((chip) => chip.addEventListener('click', () => {
    input.value = chip.dataset.question || '';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }));
}

document.addEventListener('DOMContentLoaded', initChatbot);
