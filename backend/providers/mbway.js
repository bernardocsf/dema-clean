function toEurCents(amount) {
  return Math.round(Number(amount) * 100)
}

async function createWithEupago({ amount, phone, orderId, customerName }) {
  const apiKey = process.env.EUPAGO_API_KEY
  const entity = process.env.EUPAGO_ENTITY || ''
  const endpoint = process.env.EUPAGO_MBWAY_CREATE_URL || 'https://sandbox.eupago.pt/api/v1.02/mbway/create'
  const usePhoneCountryCode = String(process.env.EUPAGO_PHONE_COUNTRY_CODE || '').trim() === '351'
  const normalizedPhone = usePhoneCountryCode && !String(phone).startsWith('351') ? `351${phone}` : String(phone)

  if (!apiKey) {
    throw new Error('EUPAGO_API_KEY is missing')
  }

  const payload = {
    chave: apiKey,
    valor: Number(amount).toFixed(2),
    id: orderId,
    alias: customerName || 'Cliente',
    per_dup: 0,
    telemovel: normalizedPhone,
    ...(entity ? { entidade: entity } : {}),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${apiKey}`,
    },
    body: JSON.stringify(payload),
  })

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      `Failed to create Eupago MB Way request: ${json?.mensagem || json?.message || JSON.stringify(json) || response.status}`,
    )
  }

  const estado = Number(json?.estado)
  const success =
    String(json?.sucesso ?? json?.success ?? '').toLowerCase() === 'true' ||
    json?.sucesso === 1 ||
    estado === 0 ||
    String(json?.status || '').toLowerCase() === 'success'

  if (!success) {
    throw new Error(
      `Gateway rejected MB Way request: ${json?.mensagem || json?.message || json?.estado || JSON.stringify(json)}`,
    )
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
