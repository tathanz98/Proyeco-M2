// utils.js - Utilidades para la aplicación

// Función para capitalizar la primera letra
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para escapar HTML para prevenir XSS
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Función para formatear mensajes
export function formatMessage(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

// Función para obtener el path actual
export function getCurrentPath() {
  return window.location.pathname;
}

// Función para navegar a una ruta
export function navigateTo(path) {
  window.history.pushState(null, null, path);
  handleRoute();
}

// Función para manejar el routing
export function handleRoute() {
  const path = getCurrentPath();
  const mainContent = document.getElementById('main-content');

  switch (path) {
    case '/':
    case '/home':
      renderHome(mainContent);
      break;
    case '/chat':
      renderChat(mainContent);
      break;
    case '/about':
      renderAbout(mainContent);
      break;
    default:
      renderHome(mainContent);
  }
}

// Funciones de renderizado de vistas
function renderHome(container) {
  container.innerHTML = `
    <div class="view home-view">
      <h1>Bienvenido al Reino Arcano</h1>
      <p>Invoca la sabiduría de Aldor el Arcano, el antiguo mago que ve magia en todo lo que existe.</p>
      <button onclick="window.utils.navigateTo('/chat')">Comenzar Conversación</button>
    </div>
  `;
}

function renderChat(container) {
  container.innerHTML = `
    <div class="view chat-view">
      <header class="chat-header">
        🧙 Conversación con Aldor
      </header>
      <div id="messages" class="messages"></div>
      <form id="chat-form" class="input-area">
        <input id="input" placeholder="Invoca tu mensaje..." />
        <button type="submit">➤</button>
      </form>
    </div>
  `;
  // Inicializar chat después de renderizar
  if (window.chat) {
    window.chat.init();
  }
}

function renderAbout(container) {
  container.innerHTML = `
    <div class="view about-view">
      <h1>Acerca de Aldor el Arcano</h1>
      <p>Aldor es un antiguo mago que ha recorrido los reinos de la magia durante milenios. Cree firmemente que todo en el universo es magia: desde el vuelo de un pájaro hasta el pensamiento humano.</p>
      <p>Su sabiduría arcana te guiará en tus preguntas, revelando los hilos mágicos que conectan todas las cosas.</p>
      <button onclick="window.utils.navigateTo('/home')">Volver al Inicio</button>
    </div>
  `;
}