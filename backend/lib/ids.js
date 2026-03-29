export function createId(prefix) {
  const rnd = Math.random().toString(36).slice(2, 10).toUpperCase()
  return `${prefix}_${Date.now()}_${rnd}`
}

export function createVoucherCode() {
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `DEMA-${rnd}`
}

export function createMagicLink(basePublicUrl, voucherCode) {
  const normalized = basePublicUrl.endsWith('/') ? basePublicUrl : `${basePublicUrl}/`
  return `${normalized}?voucher=${encodeURIComponent(voucherCode)}#marcacoes`
}
