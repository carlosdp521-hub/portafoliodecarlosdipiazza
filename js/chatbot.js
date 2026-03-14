const chatToggle = document.getElementById("chat-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const quickButtons = document.querySelectorAll(".quick-btn");

if (
  !chatToggle ||
  !chatbotBox ||
  !chatClose ||
  !chatForm ||
  !chatInput ||
  !chatMessages
) {
  console.error("No se encontraron todos los elementos del chatbot.");
} else {
  function addMessage(text, sender = "bot") {
    const item = document.createElement("div");
    item.className = `chat-message ${sender}`;
    item.textContent = text;
    chatMessages.appendChild(item);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    removeTyping();
    const typing = document.createElement("div");
    typing.className = "chat-message bot typing";
    typing.id = "typing-message";
    typing.textContent = "Escribiendo...";
    chatMessages.appendChild(typing);
    scrollToBottom();
  }

  function removeTyping() {
    const typing = document.getElementById("typing-message");
    if (typing) typing.remove();
  }

  function normalizeText(text = "") {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function includesAny(text, words) {
    return words.some((word) => text.includes(word));
  }

  function formatExperience() {
    return CV_DATA.experience
      .map((job) => {
        const highlights = Array.isArray(job.highlights)
          ? job.highlights.join(". ")
          : "";
        return `• ${job.role} en ${job.company} (${job.period}). ${highlights}.`;
      })
      .join("\n");
  }

  function formatEducation() {
    return CV_DATA.education
      .map((item) => {
        const base = `${item.institution}: ${item.program || item.note || ""}`.trim();
        const extra = [item.status, item.period].filter(Boolean).join(" | ");
        return `• ${base}${extra ? ` (${extra})` : ""}`;
      })
      .join("\n");
  }

  function buildReply(message) {
    const msg = normalizeText(message);

    if (!msg) {
      return "Escribe una pregunta sobre Carlos, su experiencia, estudios, habilidades o contacto.";
    }

    if (includesAny(msg, ["hola", "buenas", "hello", "hi"])) {
      return `Hola, soy el asistente virtual del portafolio de ${CV_DATA.name}. Puedes preguntarme por su perfil, experiencia, estudios, habilidades o contacto.`;
    }

    if (
      includesAny(msg, [
        "perfil profesional",
        "perfil",
        "quien eres",
        "quien es",
        "presentacion",
        "resumen",
        "sobre carlos",
        "acerca de"
      ])
    ) {
      return `${CV_DATA.name} es ${CV_DATA.title} en ${CV_DATA.location}. ${CV_DATA.summary}`;
    }

    if (
      includesAny(msg, [
        "experiencia",
        "trabajo",
        "laboral",
        "empleos",
        "empresa",
        "empresas",
        "donde trabajo"
      ])
    ) {
      return `Esta es la experiencia laboral principal de ${CV_DATA.name}:\n\n${formatExperience()}`;
    }

    if (
      includesAny(msg, [
        "estudios",
        "educacion",
        "formacion",
        "titulo",
        "carrera",
        "iacc",
        "aiep"
      ])
    ) {
      return `Formación de ${CV_DATA.name}:\n\n${formatEducation()}`;
    }

    if (
      includesAny(msg, [
        "habilidades",
        "skills",
        "tecnologias",
        "tecnicas",
        "conocimientos",
        "que sabe",
        "que maneja"
      ])
    ) {
      return `Habilidades técnicas: ${CV_DATA.skills.technical.join(", ")}.\n\nHabilidades blandas: ${CV_DATA.skills.soft.join(", ")}.`;
    }

    if (
      includesAny(msg, [
        "programacion",
        "bases de datos",
        "base de datos",
        "software",
        "desarrollo",
        "codigo",
        "algoritmos"
      ])
    ) {
      return `${CV_DATA.name} cuenta con formación en análisis y programación computacional, además de experiencia en programación, bases de datos y resolución de problemas tecnológicos.`;
    }

    if (
      includesAny(msg, [
        "redes",
        "telecomunicaciones",
        "cctv",
        "seguridad",
        "biometria",
        "control de acceso",
        "huawei",
        "ubiquiti"
      ])
    ) {
      return `${CV_DATA.name} tiene experiencia en gestión de redes y telecomunicaciones, instalación y configuración de CCTV, control de acceso, biometría, detección de incendios, switches, antenas Ubiquiti y equipos Huawei.`;
    }

    if (
      includesAny(msg, [
        "proyectos",
        "proyecto",
        "logros",
        "implementacion",
        "vitacura",
        "las condes",
        "providencia",
        "lo barnechea"
      ])
    ) {
      return "Entre sus experiencias destacadas están la participación en proyectos de instalación y configuración de redes en edificios corporativos y municipales, implementación de sistemas de seguridad electrónica y soporte en proyectos tecnológicos con documentación técnica y capacitaciones internas.";
    }

    if (includesAny(msg, ["servicios", "ofrece", "especialidades", "areas"])) {
      return `Carlos puede aportar en las siguientes áreas: ${CV_DATA.services.join(", ")}.`;
    }

    if (
      includesAny(msg, [
        "contacto",
        "correo",
        "email",
        "telefono",
        "celular",
        "portafolio"
      ])
    ) {
      return `Puedes contactar a ${CV_DATA.name} por correo en ${CV_DATA.email} o por teléfono al ${CV_DATA.phone}.`;
    }

    if (
      includesAny(msg, [
        "blandas",
        "trabajo en equipo",
        "responsable",
        "proactivo"
      ])
    ) {
      return `Entre sus habilidades blandas destacan: ${CV_DATA.skills.soft.join(", ")}.`;
    }

    return `Puedo ayudarte con información sobre ${CV_DATA.name}: perfil profesional, experiencia laboral, estudios, habilidades técnicas, habilidades blandas, servicios y datos de contacto.`;
  }

  async function sendMessage(message) {
    if (!message) return;

    addMessage(message, "user");
    showTyping();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const reply = buildReply(message);
    removeTyping();
    addMessage(reply, "bot");
    chatInput.focus();
  }

  chatToggle.addEventListener("click", () => {
    chatbotBox.classList.toggle("open");
    if (chatbotBox.classList.contains("open")) {
      setTimeout(() => chatInput.focus(), 150);
    }
  });

  chatClose.addEventListener("click", () => {
    chatbotBox.classList.remove("open");
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    chatInput.value = "";
    await sendMessage(message);
  });

  quickButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const question = button.dataset.question;
      await sendMessage(question);
    });
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      chatbotBox.classList.remove("open");
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    addMessage(
      "Hola, soy el asistente virtual de Carlos Di Piazza. Puedes preguntarme sobre su perfil, experiencia, habilidades, estudios o contacto.",
      "bot"
    );
  });
}