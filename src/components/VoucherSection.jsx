import { useState } from 'react'
import { company } from '../data/content'

function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

function buildVoucherCode() {
  const segment = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `DEMA-${segment}`
}

function getMagicLink(voucherCode) {
  const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL}`
  return `${baseUrl}?voucher=${encodeURIComponent(voucherCode)}#marcacoes`
}

export default function VoucherSection() {
  const apiBase = (import.meta.env.VITE_PAYMENTS_API_URL || 'http://localhost:8787').replace(/\/$/, '')
  const [form, setForm] = useState({
    amount: 25,
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    receiverName: '',
    receiverEmail: '',
    receiverMessage: '',
    paymentMethod: 'MB Way',
    paymentMbwayPhone: '',
    paymentIban: '',
  })
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('info')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [voucherPreview, setVoucherPreview] = useState(null)

  function updateField(event) {
    const { name, value } = event.target

    if (name === 'buyerPhone' || name === 'paymentMbwayPhone') {
      setForm((current) => ({ ...current, [name]: formatPhoneInput(value) }))
      return
    }

    setForm((current) => ({ ...current, [name]: value }))
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('Copiado para a área de transferência.')
      setStatusType('success')
    } catch {
      setStatus('Não foi possível copiar automaticamente.')
      setStatusType('error')
    }
  }

  function validateStepOne() {
    const amount = Number(form.amount)
    const buyerPhoneDigits = form.buyerPhone.replace(/\D/g, '')

    if (!Number.isFinite(amount) || amount < 5 || amount > 100 || amount % 5 !== 0) {
      setStatus('O valor do voucher deve estar entre 5€ e 100€, em múltiplos de 5.')
      setStatusType('error')
      return false
    }

    if (buyerPhoneDigits.length !== 9) {
      setStatus('Insere um telefone de contacto válido com 9 dígitos.')
      setStatusType('error')
      return false
    }

    if (!form.receiverName || !form.receiverEmail) {
      setStatus('Preenche nome e email do destinatário.')
      setStatusType('error')
      return false
    }

    return true
  }

  function goToPaymentStep() {
    if (!validateStepOne()) return
    setStatus('')
    setStatusType('info')
    setStep(2)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateStepOne()) return

    if (step !== 2) {
      setStatus('Primeiro completa os dados e avança para o passo de pagamento.')
      setStatusType('error')
      return
    }

    const amount = Number(form.amount)
    const mbwayDigits = form.paymentMbwayPhone.replace(/\D/g, '')

    if (form.paymentMethod === 'MB Way' && mbwayDigits.length !== 9) {
      setStatus('Para pagamento MB Way, insere um número de telemóvel válido com 9 dígitos.')
      setStatusType('error')
      return
    }

    if (form.paymentMethod === 'IBAN' && !form.paymentIban.trim()) {
      setStatus('Para pagamento por banco, insere o IBAN de origem.')
      setStatusType('error')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${apiBase}/api/vouchers/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          buyerName: form.buyerName,
          buyerPhone: form.buyerPhone,
          buyerEmail: form.buyerEmail,
          receiverName: form.receiverName,
          receiverEmail: form.receiverEmail,
          receiverMessage: form.receiverMessage,
          paymentMethod: form.paymentMethod,
          paymentMbwayPhone: form.paymentMbwayPhone || '',
          paymentIban: form.paymentIban || '',
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        setStatus(result?.error || 'Falha ao criar pedido de pagamento.')
        setStatusType('error')
        return
      }

      setVoucherPreview({
        voucherCode: result.voucherCode || buildVoucherCode(),
        magicLink: result.magicLink || getMagicLink(result.voucherCode || buildVoucherCode()),
        amount,
        paymentMethod: form.paymentMethod,
        paymentId: result.paymentId || '',
        paymentStatus: result.status || 'pending',
      })

      if (form.paymentMethod === 'MB Way') {
        setStatus('Pedido MB Way criado. Confirma a notificação na app MB Way e verifica o estado abaixo.')
      } else {
        setStatus(`Pedido criado. Efetua a transferência para ${company.iban} e aguarda confirmação.`)
      }
      setStatusType('success')
    } catch {
      setStatus('Não foi possível ligar à API de pagamentos. Confirma se o backend está ativo.')
      setStatusType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function checkPaymentStatus() {
    if (!voucherPreview?.paymentId) return
    setIsCheckingStatus(true)
    try {
      const response = await fetch(`${apiBase}/api/payments/${voucherPreview.paymentId}`)
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setStatus(result?.error || 'Não foi possível verificar o estado do pagamento.')
        setStatusType('error')
        return
      }

      setVoucherPreview((current) =>
        current
          ? {
              ...current,
              paymentStatus: result.status || current.paymentStatus,
            }
          : current,
      )

      if (result.status === 'paid') {
        setStatus('Pagamento confirmado. Voucher pronto para envio ao destinatário.')
        setStatusType('success')
      } else {
        setStatus(`Estado atual do pagamento: ${result.status}.`)
        setStatusType('info')
      }
    } catch {
      setStatus('Erro ao consultar estado do pagamento.')
      setStatusType('error')
    } finally {
      setIsCheckingStatus(false)
    }
  }

  return (
    <section className="section section-contrast" id="vouchers">
      <div className="container voucher-layout">
        <div className="section-heading">
          <p className="eyebrow">Vouchers</p>
          <h2>Cria vouchers personalizados de forma simples.</h2>
          <p>
            Define o valor, para quem é o presente e os detalhes de entrega. O valor começa em 5€ e podes aumentar em
            blocos de 5€.
          </p>
        </div>

        <form className="voucher-card card-glow" onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="field-grid two-columns">
                <label>
                  <span>Valor do voucher (€)</span>
                  <div className="voucher-amount-wrap">
                    <input
                      className="voucher-range"
                      name="amount"
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={form.amount}
                      onChange={updateField}
                      required
                    />
                    <strong className="voucher-amount-value">{form.amount}€</strong>
                  </div>
                </label>
                <label>
                  <span>Nome de quem oferece</span>
                  <input name="buyerName" value={form.buyerName} onChange={updateField} required />
                </label>
              </div>

              <div className="field-grid two-columns">
                <label>
                  <span>Telefone de contacto</span>
                  <input
                    name="buyerPhone"
                    value={form.buyerPhone}
                    onChange={updateField}
                    placeholder="Ex.: 966 841 525"
                    inputMode="tel"
                    required
                  />
                </label>
                <label>
                  <span>Email de quem oferece (opcional)</span>
                  <input
                    name="buyerEmail"
                    type="email"
                    value={form.buyerEmail}
                    onChange={updateField}
                    placeholder="Ex.: cliente@email.com"
                  />
                </label>
              </div>

              <div className="field-grid two-columns">
                <label>
                  <span>Nome do destinatário</span>
                  <input name="receiverName" value={form.receiverName} onChange={updateField} required />
                </label>
                <label>
                  <span>Email do destinatário</span>
                  <input
                    name="receiverEmail"
                    type="email"
                    value={form.receiverEmail}
                    onChange={updateField}
                    placeholder="Ex.: destinatario@email.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Mensagem para o destinatário (opcional)</span>
                <input name="receiverMessage" value={form.receiverMessage} onChange={updateField} placeholder="Ex.: Feliz aniversário!" />
              </label>

              <div className="voucher-step-actions">
                <button className="button button-primary wide-button" type="button" onClick={goToPaymentStep}>
                  Prosseguir para pagamento
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="field-grid two-columns">
                <label>
                  <span>Método de pagamento</span>
                  <select className="booking-select" name="paymentMethod" value={form.paymentMethod} onChange={updateField}>
                    <option value="MB Way">MB Way</option>
                    <option value="IBAN">Banco (IBAN)</option>
                  </select>
                </label>
                {form.paymentMethod === 'MB Way' ? (
                  <label>
                    <span>Número MB Way para pagamento</span>
                    <input
                      name="paymentMbwayPhone"
                      value={form.paymentMbwayPhone}
                      onChange={updateField}
                      placeholder="Ex.: 966 841 525"
                      inputMode="tel"
                      required
                    />
                  </label>
                ) : (
                  <label>
                    <span>IBAN de origem</span>
                    <input
                      name="paymentIban"
                      value={form.paymentIban}
                      onChange={updateField}
                      placeholder="Ex.: PT50 0002 0123 1234 5678 9015 4"
                      required
                    />
                  </label>
                )}
              </div>

              <div className="payment-box">
                <strong>Dados para pagamento</strong>
                <p>
                  {form.paymentMethod === 'IBAN'
                    ? `Transferência para ${company.bankName}: ${company.iban}`
                    : `MB Way para ${company.phoneDisplay}`}
                </p>
              </div>

              <p className="voucher-mode-note">Por segurança, este formulário não recolhe CVV nem dados completos de cartão.</p>

              <div className="voucher-step-actions">
                <button className="button button-secondary" type="button" onClick={() => setStep(1)}>
                  Voltar aos dados
                </button>
                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'A criar pagamento...' : 'Encomendar voucher'}
                </button>
              </div>
            </>
          )}

          {voucherPreview ? (
            <div className="voucher-preview card-glow">
              <strong>Código do voucher: {voucherPreview.voucherCode}</strong>
              <p>Link mágico para marcação: {voucherPreview.magicLink}</p>
              <p>Estado pagamento: {voucherPreview.paymentStatus}</p>
              <div className="voucher-preview-actions">
                <button className="button button-secondary" type="button" onClick={() => copyText(voucherPreview.voucherCode)}>
                  Copiar código
                </button>
                <button className="button button-secondary" type="button" onClick={() => copyText(voucherPreview.magicLink)}>
                  Copiar link mágico
                </button>
                {voucherPreview.paymentId ? (
                  <button className="button button-secondary" type="button" onClick={checkPaymentStatus} disabled={isCheckingStatus}>
                    {isCheckingStatus ? 'A verificar...' : 'Verificar pagamento'}
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {status ? <p className={`form-status form-status-${statusType}`}>{status}</p> : null}
        </form>
      </div>
    </section>
  )
}
