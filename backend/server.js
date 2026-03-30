import express from 'express'
import { createId, createMagicLink, createVoucherCode } from './lib/ids.js'
import { getPaymentById, getPaymentByReference, saveOrder, savePayment, updatePayment } from './lib/store.js'
import { createMbwayPayment, parseWebhookStatus } from './providers/mbway.js'

const app = express()
const port = Number(process.env.PORT || 8787)
const publicBaseUrl = process.env.PUBLIC_BASE_URL || 'https://bernardocsf.github.io/dema-clean/'
const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || ''

app.use(express.json({ limit: '1mb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-webhook-token')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  next()
})

function cleanPhone(value) {
  return String(value || '').replace(/\D/g, '')
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, provider: process.env.PAYMENT_PROVIDER || 'eupago' })
})

app.post('/api/vouchers/create-payment', async (req, res) => {
  try {
    const {
      amount,
      buyerName,
      buyerEmail,
      receiverName,
      receiverMessage,
      paymentMethod,
      paymentMbwayPhone,
      paymentIban,
    } = req.body || {}

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount < 25 || parsedAmount > 150 || parsedAmount % 5 !== 0) {
      res.status(400).json({ error: 'Invalid amount. Must be between 25 and 150 and multiple of 5.' })
      return
    }

    if (!buyerName || !buyerEmail) {
      res.status(400).json({ error: 'Missing required buyer fields.' })
      return
    }

    const method = String(paymentMethod || '').trim()
    if (!['MB Way', 'IBAN'].includes(method)) {
      res.status(400).json({ error: 'Unsupported payment method.' })
      return
    }

    const orderId = createId('order')
    const paymentId = createId('pay')
    const voucherCode = createVoucherCode()
    const magicLink = createMagicLink(publicBaseUrl, voucherCode)

    const order = {
      id: orderId,
      amount: parsedAmount,
      buyerName,
      buyerEmail,
      receiverName: receiverName || '',
      receiverMessage: receiverMessage || '',
      paymentMethod: method,
      voucherCode,
      magicLink,
      createdAt: new Date().toISOString(),
    }

    saveOrder(order)

    if (method === 'MB Way') {
      const mbwayPhone = cleanPhone(paymentMbwayPhone)
      if (mbwayPhone.length !== 9) {
        res.status(400).json({ error: 'Invalid MB Way phone.' })
        return
      }

      const gateway = await createMbwayPayment({
        amount: parsedAmount,
        phone: mbwayPhone,
        orderId,
        customerName: buyerName,
      })

      savePayment({
        id: paymentId,
        orderId,
        method,
        status: 'pending',
        amount: parsedAmount,
        payerPhone: mbwayPhone,
        gatewayProvider: gateway.provider,
        gatewayReference: gateway.gatewayReference,
        gatewayRaw: gateway.raw,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      res.json({
        orderId,
        paymentId,
        status: 'pending',
        voucherCode,
        magicLink,
        message: 'Pedido MB Way criado. O pagador deve receber notificação na app MB Way.',
      })
      return
    }

    if (!String(paymentIban || '').trim()) {
      res.status(400).json({ error: 'IBAN source is required for bank transfer flow.' })
      return
    }

    savePayment({
      id: paymentId,
      orderId,
      method,
      status: 'pending_bank_transfer',
      amount: parsedAmount,
      payerIban: String(paymentIban).trim(),
      gatewayProvider: 'manual',
      gatewayReference: paymentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    res.json({
      orderId,
      paymentId,
      status: 'pending_bank_transfer',
      voucherCode,
      magicLink,
      message: 'Pedido criado. Aguarda confirmação manual da transferência.',
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create voucher payment.' })
  }
})

app.get('/api/payments/:paymentId', (req, res) => {
  const payment = getPaymentById(req.params.paymentId)
  if (!payment) {
    res.status(404).json({ error: 'Payment not found.' })
    return
  }

  res.json({
    id: payment.id,
    orderId: payment.orderId,
    method: payment.method,
    status: payment.status,
    amount: payment.amount,
    updatedAt: payment.updatedAt,
  })
})

app.post('/api/webhooks/mbway', (req, res) => {
  if (webhookSecret) {
    const received = req.headers['x-webhook-token']
    if (received !== webhookSecret) {
      res.status(401).json({ error: 'Invalid webhook token.' })
      return
    }
  }

  const body = req.body || {}
  const ref = body.reference || body.referencia || body.paymentId || body.id

  if (!ref) {
    res.status(400).json({ error: 'Missing payment reference in webhook payload.' })
    return
  }

  const payment = getPaymentByReference(String(ref))
  if (!payment) {
    res.status(404).json({ error: 'Payment not found for reference.' })
    return
  }

  const nextStatus = parseWebhookStatus(body)
  const updated = updatePayment(payment.id, {
    status: nextStatus,
    webhookPayload: body,
  })

  res.json({ ok: true, paymentId: updated.id, status: updated.status })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[payments-api] running on http://localhost:${port}`)
})
