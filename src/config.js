// Webhook configuration
export const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro';

// App configuration
export const APP_CONFIG = {
  appName: 'RAG Chatbot Pro',
  appSlogan: 'Vergi Asistanı',
  sessionIdPrefix: 'session',
  maxRetries: 3,
  requestTimeout: 60000, // 60 seconds
  contextWindowSize: 15,
  defaultModel: 'gpt-4o-mini',
  defaultTemperature: 0.3
};

// UI configuration
export const UI_CONFIG = {
  defaultDarkMode: true,
  maxMessageLength: 2000,
  typingIndicatorDelay: 300,
  copySuccessTimeout: 2000,
  scrollBehavior: 'smooth'
};