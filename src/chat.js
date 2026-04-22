// chat.js - Lógica del chat

let messages = [];
let conversationCount = 0;

export function init() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("input");
  const container = document.getElementById("messages");

  if (!form || !input || !container) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    // Mostrar loading
    const loadingId = addMessage("bot", "Aldor está tejiendo su respuesta arcana...", true);

    try {
      const response = await sendToAI([...messages]);
      updateMessage(loadingId, response);
      conversationCount++;
      updateConversationCount();
    } catch (error) {
      updateMessage(loadingId, "Lo siento, las energías arcanas fallaron. Intenta de nuevo.");
      console.error("Error:", error);
    }
  });
}

function addMessage(role, text, isLoading = false) {
  const id = Date.now() + Math.random();
  const message = { id, role, text, isLoading };
  messages.push(message);
  render();
  return id;
}

function updateMessage(id, newText) {
  const message = messages.find(m => m.id === id);
  if (message) {
    message.text = newText;
    message.isLoading = false;
    render();
  }
}

function render() {
  const container = document.getElementById("messages");
  if (!container) return;

  container.innerHTML = messages
    .map(m => `<div class="message ${m.role} ${m.isLoading ? 'loading' : ''}">${window.utils.formatMessage(m.text)}</div>`)
    .join("");

  container.scrollTop = container.scrollHeight;
}

async function sendToAI(conversationHistory) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: conversationHistory }),
  });

  if (!response.ok) {
    throw new Error('Error en la respuesta de la AI');
  }

  const data = await response.json();
  return data.response;
}

function updateConversationCount() {
  const countEl = document.getElementById('conversation-count');
  if (countEl) {
    countEl.textContent = conversationCount;
  }
}

export function getMessages() {
  return messages;
}

export function clearMessages() {
  messages = [];
  conversationCount = 0;
  render();
  updateConversationCount();
}