// app.js - Lógica principal de la aplicación

import * as utils from './utils.js';
import * as chat from './chat.js';

// Hacer disponibles globalmente para onclick
window.utils = utils;
window.chat = chat;

// Inicializar la aplicación
function init() {
  // Configurar navegación
  setupNavigation();

  // Manejar routing inicial
  utils.handleRoute();

  // Manejar cambios de historia (back/forward)
  window.addEventListener('popstate', utils.handleRoute);
}

function setupNavigation() {
  const homeBtn = document.getElementById('home-btn');
  const chatBtn = document.getElementById('chat-btn');
  const aboutBtn = document.getElementById('about-btn');

  if (homeBtn) homeBtn.addEventListener('click', () => utils.navigateTo('/home'));
  if (chatBtn) chatBtn.addEventListener('click', () => utils.navigateTo('/chat'));
  if (aboutBtn) aboutBtn.addEventListener('click', () => utils.navigateTo('/about'));
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);