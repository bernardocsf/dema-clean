import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.resolve('backend/data')
const dataFile = path.join(dataDir, 'payments.json')

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ payments: {}, orders: {} }, null, 2), 'utf-8')
  }
}

function readStore() {
  ensureStore()
  return JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
}

function writeStore(data) {
  ensureStore()
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8')
}

export function saveOrder(order) {
  const data = readStore()
  data.orders[order.id] = order
  writeStore(data)
  return order
}

export function savePayment(payment) {
  const data = readStore()
  data.payments[payment.id] = payment
  writeStore(data)
  return payment
}

export function getPaymentById(id) {
  const data = readStore()
  return data.payments[id] || null
}

export function getPaymentByReference(reference) {
  const data = readStore()
  const values = Object.values(data.payments)
  return values.find((payment) => payment.gatewayReference === reference || payment.id === reference) || null
}

export function updatePayment(id, patch) {
  const data = readStore()
  const current = data.payments[id]
  if (!current) return null
  const updated = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  }
  data.payments[id] = updated
  writeStore(data)
  return updated
}
