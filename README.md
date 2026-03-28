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

### Tracking, Ads e Anti-spam (opcional)

Podes ativar as integrações por variáveis:

```bash
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
VITE_META_PIXEL_ID=123456789012345
VITE_CLARITY_ID=abcd1234xy
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA...
```

Notas:
- Sem estas variáveis, o site funciona normalmente.
- Com `VITE_TURNSTILE_SITE_KEY`, o formulário passa a exigir verificação anti-spam.

### Deploy GitHub Pages

```bash
npm run deploy
```

URL pública esperada:

`https://bernardocsf.github.io/dema-clean/`
