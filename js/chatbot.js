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
  let isLoading = false;

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

  function setLoadingState(state) {
    isLoading = state;
    chatInput.disabled = state;

    const submitButton = chatForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = state;
      submitButton.textContent = state ? "Enviando..." : "Enviar";
    }
  }

  async function sendMessage(message) {
    if (!message || isLoading) return;

    addMessage(message, "user");
    showTyping();
    setLoadingState(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      removeTyping();

      if (data.reply) {
        addMessage(data.reply, "bot");
      } else {
        addMessage("No se recibió una respuesta válida del servidor.", "bot");
      }
    } catch (error) {
      console.error("Error en el chatbot:", error);
      removeTyping();
      addMessage("No se pudo conectar con el servidor del chatbot.", "bot");
    } finally {
      setLoadingState(false);
      chatInput.focus();
    }
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