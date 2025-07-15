# 🚀 Deployment Guide

## Production Webhook

Current production webhook endpoint:
```
http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro
```

## Environment Variables

Create a `.env` file in the root directory:
```env
VITE_WEBHOOK_URL=http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro
```

## CORS Configuration

### n8n Webhook Setup

Add these headers to your n8n Webhook node:

1. Go to your n8n workflow
2. Edit the Webhook node
3. Add Response Headers:
   - `Access-Control-Allow-Origin: *` (or your specific domain)
   - `Access-Control-Allow-Methods: POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`

### Mixed Content Issues

If your frontend is served over HTTPS but n8n uses HTTP:

1. **Option 1**: Configure n8n with SSL/TLS (recommended)
2. **Option 2**: Use a reverse proxy (nginx, Cloudflare)
3. **Option 3**: Deploy frontend on HTTP (not recommended for production)

## Deployment Platforms

### Vercel

1. Fork/clone the repository
2. Import to Vercel
3. Add environment variable:
   - Name: `VITE_WEBHOOK_URL`
   - Value: `http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro`
4. Deploy

### Netlify

1. Fork/clone the repository
2. Import to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables:
   - `VITE_WEBHOOK_URL=http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro`
5. Deploy

### Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_WEBHOOK_URL
ENV VITE_WEBHOOK_URL=$VITE_WEBHOOK_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Testing Production

### Test the Webhook
```bash
curl -X POST http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test mesajı",
    "sessionId": "test-123",
    "timestamp": "2025-01-16T00:00:00.000Z",
    "type": "tax-assistant",
    "source": "rag-chatbot-pro"
  }'
```

### Expected Response
```json
{
  "success": true,
  "sessionId": "test-123",
  "message": "Test mesajı",
  "response": "AI yanıtı burada olacak",
  "executionId": "xxx",
  "timestamp": "2025-01-16T00:00:00.000Z",
  "metadata": {
    "model": "gpt-4o-mini",
    "temperature": 0.3,
    "contextWindowUsed": true,
    "toolsAvailable": [...]
  }
}
```

## Monitoring

### n8n Execution Logs
- Check n8n execution history for errors
- Monitor webhook response times
- Track success/failure rates

### Frontend Console
- Check browser console for CORS errors
- Monitor network requests
- Verify response formats

## Troubleshooting

### CORS Errors
```
Access to fetch at 'http://n8n.luwi.dev:5678/webhook/rag-chatbot-pro' from origin 'https://yoursite.com' has been blocked by CORS policy
```
**Solution**: Add CORS headers to n8n webhook node

### Mixed Content Errors
```
Mixed Content: The page at 'https://yoursite.com' was loaded over HTTPS, but requested an insecure resource 'http://n8n.luwi.dev:5678/...'
```
**Solution**: Use HTTPS for n8n or deploy frontend on HTTP

### Connection Timeout
```
Error: Network request failed
```
**Solution**: Check n8n server status and firewall rules