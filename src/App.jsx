import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Database, Sparkles, Moon, Sun, Copy, Check } from 'lucide-react';

const RAGChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Merhaba! 👋 Ben sizin vergi asistanınızım. Vergi ile ilgili tüm sorularınızda size yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = 'RAG Chatbot Pro - Vergi Asistanı | Luwi';
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: localStorage.getItem('chatSessionId') || generateSessionId(),
          timestamp: new Date().toISOString(),
          type: 'tax-assistant',
          source: 'rag-chatbot-pro'
        })
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || data.message || "Bir yanıt oluşturulamadı.",
        sender: 'bot',
        timestamp: new Date(),
        sources: data.sources || null
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Hata:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const generateSessionId = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chatSessionId', sessionId);
    return sessionId;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-lg`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className="absolute -bottom-1 -right-1 text-lg">💼</div>
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  RAG Chatbot Pro
                </h1>
                <p className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Vergi Asistanı
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1 mt-1`}>
                  <Database className="w-3 h-3" />
                  PostgreSQL Vector Store ile güçlendirildi
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="https://luwi.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  luwi
                </div>
                <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} animate-pulse`}></div>
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? 
                      <User className="w-5 h-5 text-white" /> : 
                      <Bot className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    }
                  </div>
                  <div className="flex-1">
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : darkMode 
                          ? message.error ? 'bg-red-900/20 border border-red-700' : 'bg-gray-700 text-gray-100'
                          : message.error ? 'bg-red-50 border border-red-200' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      {message.sources && (
                        <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            📚 Kaynak: {message.sources}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`flex items-center justify-between mt-2 px-2`}>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                      {message.sender === 'bot' && (
                        <button
                          onClick={() => copyToClipboard(message.text, message.id)}
                          className={`p-1 rounded transition-colors ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                          }`}
                        >
                          {copiedId === message.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Bot className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center space-x-2">
                      <Loader2 className={`w-4 h-4 animate-spin ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Düşünüyorum...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} p-4`}>
            <div className="flex items-end space-x-3">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Vergi ile ilgili sorunuzu yazın..."
                className={`flex-1 resize-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-400 border border-gray-300'
                }`}
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-3 rounded-xl transition-all transform ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 shadow-lg hover:shadow-xl' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Enter ile gönder • Shift+Enter ile yeni satır • Powered by <a href="https://luwi.dev" target="_blank" rel="noopener noreferrer" className={`font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>Luwi</a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RAGChatbot;