import { useMemo, useState } from 'react'
import { company, services } from '../data/content'

function getMinDate() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now.toISOString().split('T')[0]
}

function isSunday(dateValue) {
  if (!dateValue) return false
  const date = new Date(`${dateValue}T12:00:00`)
  return date.getDay() === 0
}

export default function BookingSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0].title,
    date: '',
    time: '10:00',
    location: '',
    notes: '',
  })
  const [status, setStatus] = useState('')

  const minDate = useMemo(() => getMinDate(), [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (isSunday(form.date)) {
      setStatus('As marcações estão disponíveis apenas de segunda a sábado.')
      return
    }

    const subject = encodeURIComponent(`Pedido de marcação - ${form.service}`)
    const body = encodeURIComponent(
      `Nome: ${form.name}\nTelefone: ${form.phone}\nEmail: ${form.email}\nServiço: ${form.service}\nData pretendida: ${form.date}\nHora pretendida: ${form.time}\nZona: ${form.location}\nDetalhes: ${form.notes}`,
    )

    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
    setStatus('Pedido preparado com sucesso. O teu email foi aberto para envio.')
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
              <span>{company.email}</span>
            </div>
            <div className="mini-card card-glow">
              <strong>Zona de atuação</strong>
              <span>{company.area}</span>
            </div>
          </div>
        </div>

        <form className="booking-card card-glow" onSubmit={handleSubmit}>
          <div className="field-grid two-columns">
            <label>
              <span>Nome</span>
              <input name="name" value={form.name} onChange={updateField} required />
            </label>
            <label>
              <span>Telefone</span>
              <input name="phone" value={form.phone} onChange={updateField} required />
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={updateField} required />
            </label>
            <label>
              <span>Serviço</span>
              <select name="service" value={form.service} onChange={updateField}>
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
              <span>Data pretendida</span>
              <input name="date" type="date" min={minDate} value={form.date} onChange={updateField} required />
            </label>
            <label>
              <span>Hora pretendida</span>
              <input name="time" type="time" value={form.time} onChange={updateField} required />
            </label>
          </div>

          <label>
            <span>Localidade</span>
            <input name="location" value={form.location} onChange={updateField} placeholder="Ex.: Coimbra" required />
          </label>

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

          <button className="button button-primary wide-button" type="submit">
            Enviar pedido de marcação
          </button>

          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </div>
    </section>
  )
}
