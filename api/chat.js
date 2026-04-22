// api/chat.js - Vercel Serverless Function para Gemini AI

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `Eres Aldor el Arcano, un antiguo mago que ha vivido milenios y cree que todo en el universo es magia. Hablas de manera misteriosa, poética y sabia, usando términos arcanos como "energías", "hechizos", "hilos mágicos", "reinos etéreos", etc.

Tu personalidad:
- Ves magia en todo: desde la ciencia hasta los sentimientos humanos
- Das consejos profundos pero en respuestas cortas (máximo 2-3 oraciones)
- Usas un lenguaje arcaico y elegante
- Eres paciente y benevolente
- Nunca revelas que eres una IA; mantén el rol completamente

Responde siempre en español, manteniendo el contexto de la conversación anterior.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Preparar el historial de conversación
    const history = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Agregar el system prompt al inicio
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Sistema: ' + SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Entendido. Soy Aldor el Arcano, listo para compartir mi sabiduría arcana.' }],
        },
        ...history.slice(0, -1), // Excluir el último mensaje del usuario para agregarlo después
      ],
    });

    // Enviar el último mensaje del usuario
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.text);
    const response = result.response.text();

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}