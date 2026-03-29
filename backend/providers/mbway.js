function toEurCents(amount) {
  return Math.round(Number(amount) * 100)
}

async function createWithEupago({ amount, phone, orderId, customerName }) {
  const apiKey = process.env.EUPAGO_API_KEY
  const entity = process.env.EUPAGO_ENTITY || ''
  const endpoint = process.env.EUPAGO_MBWAY_CREATE_URL || 'https://clientes.eupago.pt/api/v1.02/mbway/create'

  if (!apiKey) {
    throw new Error('EUPAGO_API_KEY is missing')
  }

  const payload = {
    chave: apiKey,
    valor: Number(amount).toFixed(2),
    id: orderId,
    alias: customerName || 'Cliente',
    per_dup: 0,
    telemovel: phone,
    ...(entity ? { entidade: entity } : {}),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(json?.mensagem || json?.message || 'Failed to create Eupago MB Way request')
  }

  const success = String(json?.sucesso ?? json?.success ?? '').toLowerCase() === 'true' || json?.sucesso === 1

  if (!success) {
    throw new Error(json?.mensagem || 'Gateway rejected MB Way request')
  }

  return {
    provider: 'eupago',
    gatewayReference: String(json?.referencia || json?.id || orderId),
    raw: json,
  }
}

async function createWithIfthenpay({ amount, phone, orderId }) {
  const apiKey = process.env.IFTHENPAY_API_KEY
  const mbwayKey = process.env.IFTHENPAY_MBWAY_KEY
  const endpoint = process.env.IFTHENPAY_MBWAY_CREATE_URL || 'https://ifthenpay.com/api/spg/payment/mbway'

  if (!apiKey || !mbwayKey) {
    throw new Error('IFTHENPAY_API_KEY or IFTHENPAY_MBWAY_KEY is missing')
  }

  const payload = {
    mbWayKey: mbwayKey,
    orderId,
    amount: toEurCents(amount),
    mobileNumber: `351${phone}`,
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(json?.message || 'Failed to create Ifthenpay MB Way request')
  }

  return {
    provider: 'ifthenpay',
    gatewayReference: String(json?.requestId || json?.id || orderId),
    raw: json,
  }
}

export async function createMbwayPayment(input) {
  const provider = (process.env.PAYMENT_PROVIDER || 'eupago').toLowerCase()

  if (provider === 'ifthenpay') {
    return createWithIfthenpay(input)
  }

  return createWithEupago(input)
}

export function parseWebhookStatus(body) {
  const normalizedStatus = String(body?.status || body?.estado || body?.payment_status || '').toLowerCase()

  if (['paid', 'success', 'sucesso', 'completed'].includes(normalizedStatus)) {
    return 'paid'
  }

  if (['rejected', 'failed', 'cancelled', 'canceled', 'recusado'].includes(normalizedStatus)) {
    return 'failed'
  }

  if (['expired', 'expirado'].includes(normalizedStatus)) {
    return 'expired'
  }

  return 'pending'
}
