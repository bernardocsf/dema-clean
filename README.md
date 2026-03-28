# DEMA Clean Signature

Plataforma final da DEMA Clean com:
- identidade visual premium
- serviços destacados
- marcações com validação de segunda a sábado
- reviews com local e data
- FAQ orientada a conversão
- contactos atualizados
- logo incluído
- secção de cobertura local
- CTA móvel com Ligar + WhatsApp
- schema SEO LocalBusiness
- resumo de pedido e atalho para Google Calendar
- upload de fotos para orçamento
- consentimento RGPD no formulário

## Arranque

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
```

## Integrações Opcionais

### Webhook (Google Sheets / Apps Script / CRM)

Define a variável abaixo para receber os pedidos também por POST JSON:

```bash
VITE_BOOKING_WEBHOOK_URL=https://teu-endpoint-webhook
```

Sem esta variável, o fluxo principal continua por WhatsApp normalmente.

Guia completo para Google Apps Script + Drive:

`docs/google-apps-script.md`

### Deploy GitHub Pages

```bash
npm run deploy
```

URL pública esperada:

`https://bernardocsf.github.io/dema-clean/`
