# RAG Chatbot Pro - Vergi Asistanı 🤖💼

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/n8n-Workflow-EA4B71?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PostgreSQL-Vector_Store-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
</div>

## 📌 Genel Bakış

RAG Chatbot Pro, n8n workflow otomasyonu ve PostgreSQL Vector Store ile güçlendirilmiş, modern ve kullanıcı dostu bir vergi asistanı chatbot'udur. Vergi ile ilgili sorularınıza hızlı ve doğru yanıtlar sunar.

## ✨ Özellikler

### 🎨 Modern Arayüz
- **Dark/Light Mode**: Göz yormayan tema desteği
- **Responsive Tasarım**: Mobil uyumlu
- **Smooth Animasyonlar**: Profesyonel kullanıcı deneyimi
- **Gradient Renkler**: Modern ve çekici görünüm

### 🚀 Teknik Özellikler
- **n8n Webhook Entegrasyonu**: Gerçek zamanlı veri işleme
- **PostgreSQL Vector Store**: Akıllı ve hızlı veri erişimi
- **Session Yönetimi**: Kullanıcı oturumlarını takip
- **Hata Yönetimi**: Kullanıcı dostu hata mesajları

### 💬 Chatbot Özellikleri
- **Vergi Uzmanlığı**: Vergi konularında uzmanlaşmış AI
- **Kaynak Gösterimi**: Yanıtların kaynaklarını gösterir
- **Mesaj Kopyalama**: Tek tıkla mesajları kopyalayın
- **Klavye Kısayolları**: Enter ile gönder, Shift+Enter ile yeni satır

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- n8n instance (webhook için)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/umutluwi/rag-chatbot-vergi-asistani.git
cd rag-chatbot-vergi-asistani
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
# veya
yarn dev
```

4. **Production build**
```bash
npm run build
# veya
yarn build
```

## 🔧 Konfigürasyon

### Webhook URL
Webhook URL'sini değiştirmek için `src/App.jsx` dosyasında:
```javascript
const response = await fetch('http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro', {
  // Kendi webhook URL'nizi buraya yazın
});
```

### Webhook Payload
Chatbot şu formatta veri gönderir:
```json
{
  "message": "Kullanıcı sorusu",
  "sessionId": "session_1234567890_abc123",
  "timestamp": "2025-01-16T12:00:00.000Z",
  "type": "tax-assistant",
  "source": "rag-chatbot-pro"
}
```

## 🚀 Deploy

### Vercel ile Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umutluwi/rag-chatbot-vergi-asistani)

### Netlify ile Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/umutluwi/rag-chatbot-vergi-asistani)

### Manuel Deploy

1. Build alın: `npm run build`
2. `dist` klasörünü herhangi bir static hosting servisine yükleyin

## 📡 n8n Workflow Entegrasyonu

1. n8n'de bir Webhook node oluşturun
2. HTTP Method: POST
3. Path: `/webhook/rag-chatbot-pro`
4. Response Mode: "On Last Node"
5. Gelen veriyi işleyin ve yanıt döndürün

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'e push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**[Luwi](https://luwi.dev)**

---

<div align="center">
  <p>Made with ❤️ by <a href="https://luwi.dev">Luwi</a></p>
</div>