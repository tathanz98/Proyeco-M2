# Aldor el Arcano - Chat SPA

Una Single Page Application responsive para chatear con Aldor el Arcano, un antiguo mago que cree que todo es magia, utilizando Google Gemini AI.

## Características

- Routing SPA con History API
- Tres vistas: Home, Chat, About
- Integración con Google Gemini AI via Vercel Serverless Function
- Historial de conversación durante la sesión
- Diseño responsive mobile-first
- Tests unitarios con Vitest
- Desplegado en Vercel

## Estructura del Proyecto

```
project-root/
├── api/
│   └── functions.js          # Vercel Serverless Function para Gemini AI
├── src/
│   ├── index.html            # HTML principal
│   ├── styles.css            # Estilos CSS
│   ├── app.js                # Lógica principal de la app
│   ├── chat.js               # Lógica específica del chat
│   └── utils.js              # Utilidades
├── tests/
│   ├── utils.test.js         # Tests para utils.js
│   └── app.test.js           # Tests para app.js
├── .env                      # Variables de entorno (no subir)
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos ignorados por git
├── package.json              # Dependencias y scripts
└── README.md                 # Esta documentación
```

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd aldor-chat-spa
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura variables de entorno:
   - Copia `.env.example` a `.env`
   - Agrega tu API key de Google Gemini en `.env`

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre http://localhost:8000 en tu navegador.

5. Ejecuta tests:
   ```bash
   npm test
   ```

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega

## Uso de IA en el Desarrollo

Durante el desarrollo, utilicé las siguientes herramientas de IA:

- **GitHub Copilot**: Para generar código boilerplate, sugerir implementaciones de routing SPA, y ayudar con la integración de la API de Gemini.
- **Google AI Studio**: Para probar y refinar el system prompt del personaje Aldor el Arcano.

Decisiones tomadas:
- Elegí Aldor el Arcano como personaje por su personalidad distintiva y temática mágica.
- El system prompt fue iterado en AI Studio para asegurar respuestas cortas, misteriosas y en tono arcano.
- La estructura del proyecto siguió las mejores prácticas sugeridas, con separación de concerns.

## API Key

La API key de Gemini nunca se expone en el frontend. Se maneja únicamente en la serverless function de Vercel.