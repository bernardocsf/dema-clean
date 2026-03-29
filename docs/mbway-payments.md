# MB Way + Banco (Voucher)

## Endpoints

### `POST /api/vouchers/create-payment`
Cria encomenda e pedido de pagamento.

Exemplo body:

```json
{
  "amount": 25,
  "buyerName": "Bernardo",
  "buyerPhone": "966 841 525",
  "buyerEmail": "cliente@email.com",
  "receiverName": "Cliente B",
  "receiverEmail": "clienteb@email.com",
  "receiverMessage": "Feliz aniversário",
  "paymentMethod": "MB Way",
  "paymentMbwayPhone": "966 111 222",
  "paymentIban": ""
}
```

### `GET /api/payments/:paymentId`
Consulta estado do pagamento (`pending`, `paid`, `failed`, `expired`, `pending_bank_transfer`).

### `POST /api/webhooks/mbway`
Recebe callback do gateway e atualiza estado do pagamento.

Header opcional de proteção:

- `x-webhook-token: <PAYMENT_WEBHOOK_SECRET>`

## Variáveis principais

- `PAYMENT_PROVIDER=eupago` ou `ifthenpay`
- `EUPAGO_API_KEY=...`
- `IFTHENPAY_API_KEY=...`
- `VITE_PAYMENTS_API_URL=https://teu-backend.com`

## Notas de segurança

- Não guardar CVV/cartão no frontend.
- Se precisares de cartão, usa PSP com checkout alojado (Stripe, Eupago hosted checkout, etc.).
