import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { company, services } from '../data/content'

const categories = ['Casa', 'Automóvel', 'Bebé e Infantil', 'Outro']
const urgencyOptions = ['Normal', 'Urgente (24h)', 'Muito urgente (Hoje)']
const contactWindows = ['09:00-12:00', '12:00-15:00', '15:00-19:00', 'Depois das 19:00']

function getMinDate() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

function isSunday(dateValue) {
  if (!dateValue) return false
  return dateValue.getDay() === 0
}

function formatPhoneInput(value) {
  return value.replace(/[^\d+\s()-]/g, '').slice(0, 20)
}

function formatPostalCodeInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 7)
  if (digits.length <= 4) return digits
  return `${digits.slice(0, 4)}-${digits.slice(4)}`
}

function normalizeGermanPhone(value) {
  const compact = value.replace(/[\s()-]/g, '')
  if (!compact) return ''

  if (compact.startsWith('+49')) return compact
  if (compact.startsWith('0049')) return `+${compact.slice(2)}`
  if (compact.startsWith('49')) return `+${compact}`
  if (compact.startsWith('0')) return `+49${compact.slice(1)}`
  return compact
}

function isValidGermanPhone(value) {
  return /^\+49\d{7,13}$/.test(value)
}

function getGoogleCalendarUrl({ date, time, service, location }) {
  const [hours, minutes] = time.split(':').map(Number)
  const start = new Date(date)
  start.setHours(hours, minutes, 0, 0)

  const end = new Date(start)
  end.setHours(end.getHours() + 2)

  const toGoogleDate = (value) => {
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    const hour = String(value.getHours()).padStart(2, '0')
    const minute = String(value.getMinutes()).padStart(2, '0')
    return `${year}${month}${day}T${hour}${minute}00`
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `DEMA Clean - ${service}`,
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
    details: 'Pedido gerado pela plataforma DEMA Clean.',
    location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export default function BookingSection() {
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || company.turnstileSiteKey

  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: categories[0],
    service: services[0].title,
    urgency: urgencyOptions[0],
    contactWindow: contactWindows[0],
    date: null,
    time: '10:00',
    address: '',
    doorNumber: '',
    postalCode: '',
    locality: '',
    notes: '',
    consent: false,
  })
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('info')
  const [bookingSummary, setBookingSummary] = useState(null)

  const minDate = useMemo(() => getMinDate(), [])

  function updateField(event) {
    const { name, value, type, checked } = event.target

    if (name === 'phone') {
      setForm((current) => ({ ...current, phone: formatPhoneInput(value) }))
      return
    }

    if (name === 'postalCode') {
      setForm((current) => ({ ...current, postalCode: formatPostalCodeInput(value) }))
      return
    }

    if (type === 'checkbox') {
      setForm((current) => ({ ...current, [name]: checked }))
      return
    }

    setForm((current) => ({ ...current, [name]: value }))
  }

  function updateDateField(event) {
    const selectedDate = event

    if (isSunday(selectedDate)) {
      setForm((current) => ({ ...current, date: null }))
      setStatus('Domingos estão indisponíveis. Seleciona um dia de segunda a sábado.')
      setStatusType('error')
      return
    }

    setForm((current) => ({ ...current, date: selectedDate }))
    setStatus('')
    setStatusType('info')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const turnstileTokenInput = formElement.elements.namedItem('cf-turnstile-response')
    const turnstileToken = turnstileTokenInput instanceof HTMLInputElement ? turnstileTokenInput.value : ''

    const normalizedPhone = normalizeGermanPhone(form.phone)
    const cleanPostal = form.postalCode.replace(/\D/g, '')

    if (isSunday(form.date)) {
      setStatus('As marcações estão disponíveis apenas de segunda a sábado.')
      setStatusType('error')
      return
    }

    if (!form.date) {
      setStatus('Seleciona uma data para a marcação.')
      setStatusType('error')
      return
    }

    if (!isValidGermanPhone(normalizedPhone)) {
      setStatus('Insere um número da Alemanha válido (ex.: +49 1512 3456789).')
      setStatusType('error')
      return
    }

    if (cleanPostal.length !== 7) {
      setStatus('Insere um código postal válido no formato 0000-000.')
      setStatusType('error')
      return
    }

    if (!form.consent) {
      setStatus('Precisas de aceitar a política de privacidade para continuar.')
      setStatusType('error')
      return
    }

    if (turnstileSiteKey && !turnstileToken) {
      setStatus('Confirma a verificação anti-spam antes de enviar.')
      setStatusType('error')
      return
    }

    const formattedDate = format(form.date, 'yyyy-MM-dd')
    const locationLine = [
      form.address,
      `Nº ${form.doorNumber}`,
      [form.postalCode, form.locality].filter(Boolean).join(' '),
    ]
      .filter(Boolean)
      .join(', ')
    const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL || company.bookingsWebhookUrl

    const message = encodeURIComponent(
      `📥 Pedido de marcação\n\nCategoria: ${form.category}\nServiço: ${form.service}\nUrgência: ${form.urgency}\n\nNome: ${form.name}\nTelefone: ${normalizedPhone}\nMelhor horário de contacto: ${form.contactWindow}\n\nData pretendida: ${formattedDate}\nHora pretendida: ${form.time}\n\nMorada: ${locationLine}\n\nDetalhes: ${form.notes || '-'}`,
    )

    const googleCalendarUrl = getGoogleCalendarUrl({
      date: form.date,
      time: form.time,
      service: form.service,
      location: locationLine,
    })

    setBookingSummary({
      name: form.name,
      service: form.service,
      urgency: form.urgency,
      date: formattedDate,
      time: form.time,
      location: locationLine,
      phone: normalizedPhone,
      calendarUrl: googleCalendarUrl,
    })

    if (webhookUrl) {
      try {
        const payload = {
          name: form.name,
          phone: normalizedPhone,
          category: form.category,
          service: form.service,
          urgency: form.urgency,
          contactWindow: form.contactWindow,
          date: formattedDate,
          time: form.time,
          address: form.address,
          doorNumber: form.doorNumber,
          postalCode: form.postalCode,
          locality: form.locality,
          notes: form.notes || '',
          consent: form.consent,
          turnstileToken,
        }

        // Sem Content-Type custom para evitar preflight/CORS com Apps Script.
        await fetch(webhookUrl, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      } catch {
        // Non-blocking: o pedido continua por WhatsApp mesmo que o webhook falhe.
      }
    }

    window.location.href = `https://wa.me/${company.phoneLink}?text=${message}`
    setStatus(
      webhookUrl
        ? 'Pedido preparado com sucesso. Dados registados no formulário e WhatsApp aberto.'
        : 'Pedido preparado com sucesso. WhatsApp aberto.',
    )
    setStatusType('success')
  }

  return (
    <section className="section section-contrast" id="marcacoes">
      <div className="container booking-layout">
        <div>
          <p className="eyebrow">Marcações</p>
          <h2>Reserva organizada, rápida e pronta para o cliente agir no momento certo.</h2>
          <p>
            O formulário está preparado para recolher as informações essenciais de forma clara e sem
            ruído. O pedido segue diretamente para contacto, acelerando a confirmação.
          </p>

          <div className="booking-side-cards">
            <div className="mini-card card-glow">
              <strong>Dias ativos</strong>
              <span>Segunda a sábado</span>
            </div>
            <div className="mini-card card-glow">
              <strong>Canal direto</strong>
              <span>WhatsApp: {company.phoneDisplay}</span>
            </div>
            <div className="mini-card card-glow">
              <strong>Zona de atuação</strong>
              <span>{company.area}</span>
            </div>
          </div>

          {bookingSummary ? (
            <article className="booking-summary card-glow">
              <strong>Resumo do pedido</strong>
              <p>
                {bookingSummary.name} pediu <b>{bookingSummary.service}</b> ({bookingSummary.urgency}) para {bookingSummary.date} às {bookingSummary.time}.
              </p>
              <p>Morada: {bookingSummary.location}</p>
              <p>Contacto: {bookingSummary.phone}</p>
              <a href={bookingSummary.calendarUrl} target="_blank" rel="noreferrer">
                Adicionar ao Google Calendar
              </a>
            </article>
          ) : null}
        </div>

        <form className="booking-card card-glow" onSubmit={handleSubmit}>
          <div className="field-grid two-columns">
            <label>
              <span>Nome</span>
              <input name="name" value={form.name} onChange={updateField} required />
            </label>
            <label>
              <span>Telefone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="Ex.: +49 1512 3456789"
                inputMode="tel"
                required
              />
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Categoria</span>
              <select className="booking-select" name="category" value={form.category} onChange={updateField}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Serviço</span>
              <select className="booking-select" name="service" value={form.service} onChange={updateField}>
                {services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Urgência</span>
              <select className="booking-select" name="urgency" value={form.urgency} onChange={updateField}>
                {urgencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Melhor horário de contacto</span>
              <select className="booking-select" name="contactWindow" value={form.contactWindow} onChange={updateField}>
                {contactWindows.map((windowOption) => (
                  <option key={windowOption} value={windowOption}>
                    {windowOption}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Data pretendida</span>
              <DatePicker
                selected={form.date}
                onChange={updateDateField}
                minDate={minDate}
                filterDate={(date) => date.getDay() !== 0}
                dateFormat="dd-MM-yyyy"
                locale={pt}
                formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 1).toUpperCase()}
                placeholderText="Seleciona a data"
                title="Domingos indisponíveis"
                required
              />
            </label>
            <label>
              <span>Hora pretendida</span>
              <input name="time" type="time" value={form.time} onChange={updateField} required />
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Rua / Avenida</span>
              <input
                name="address"
                value={form.address}
                onChange={updateField}
                placeholder="Ex.: Rua da Liberdade"
                required
              />
            </label>
            <label>
              <span>Número de porta</span>
              <input name="doorNumber" value={form.doorNumber} onChange={updateField} placeholder="Ex.: 145" required />
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Código postal</span>
              <input name="postalCode" value={form.postalCode} onChange={updateField} placeholder="Ex.: 3000-123" required />
            </label>
            <label>
              <span>Localidade</span>
              <input name="locality" value={form.locality} onChange={updateField} placeholder="Ex.: Berlim (opcional)" />
            </label>
          </div>

          <label>
            <span>Detalhes do pedido</span>
            <textarea
              name="notes"
              rows="5"
              value={form.notes}
              onChange={updateField}
              placeholder="Ex.: sofá de 3 lugares, colchão de casal, limpeza interior completa..."
            />
          </label>

          <label className="consent-row">
            <input type="checkbox" name="consent" checked={form.consent} onChange={updateField} />
            <span>
              Aceito a política de privacidade e autorizo contacto para orçamento e marcação.
            </span>
          </label>

          {turnstileSiteKey ? (
            <div className="turnstile-wrap">
              <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
            </div>
          ) : null}

          <button className="button button-primary wide-button" type="submit">
            Enviar pedido de marcação
          </button>

          {status ? <p className={`form-status form-status-${statusType}`}>{status}</p> : null}
        </form>
      </div>
    </section>
  )
}
