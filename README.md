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
# noutro terminal
npm run server
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

## Pagamentos MB Way e Banco (API)

Foi adicionada uma API backend em `backend/server.js` com:

- `POST /api/vouchers/create-payment`
- `GET /api/payments/:paymentId`
- `POST /api/webhooks/mbway`

### Configuração rápida

1. Copia `.env.example` para `.env` e preenche as chaves do gateway.
2. Inicia backend: `npm run server`
3. Define no frontend: `VITE_PAYMENTS_API_URL=http://localhost:8787`

### MB Way com notificação na app

Para o cliente receber notificação real no MB Way é obrigatório:

- gateway ativo (ex.: EuPago/Ifthenpay),
- credenciais válidas,
- backend acessível publicamente,
- webhook do gateway a apontar para `/api/webhooks/mbway`.

Sem isso, o pedido MB Way não é confirmado automaticamente.

### Deploy rápido no Render

O projeto já inclui `render.yaml`.

1. Faz push deste repositório para GitHub.
2. No Render: `New +` -> `Blueprint` -> seleciona o repositório.
3. Confirma criação do serviço `dema-clean-payments-api`.
4. No Render, define as env vars reais:
   - `EUPAGO_API_KEY`
   - `EUPAGO_ENTITY` (se aplicável)
   - ou as da Ifthenpay se usares esse provider.
5. Copia a URL pública da API, ex.: `https://dema-clean-payments-api.onrender.com`

### Ligar frontend (GitHub Pages) à API pública

No teu terminal local, antes de build/deploy:

```bash
export VITE_PAYMENTS_API_URL=https://dema-clean-payments-api.onrender.com
npm run build
npm run deploy
```

Depois disso, o site público deixa de tentar `localhost`.
