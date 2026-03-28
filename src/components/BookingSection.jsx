import { useMemo, useState } from 'react'
import SectionTitle from './SectionTitle'
import { bookingServices, company } from '../data/content'

function formatDate(dateValue) {
  if (!dateValue) return 'Sem data escolhida'
  const date = new Date(`${dateValue}T12:00:00`)
  return new Intl.DateTimeFormat('pt-PT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(date)
}

export default function BookingSection() {
  const [form, setForm] = useState({
    name: '',
    service: bookingServices[0],
    date: '',
    time: '10:00',
    zone: 'Coimbra',
    details: '',
  })

  const dayStatus = useMemo(() => {
    if (!form.date) return { valid: true, message: 'Escolhe uma data entre segunda e sábado.' }
    const day = new Date(`${form.date}T12:00:00`).getDay()
    if (day === 0) {
      return { valid: false, message: 'Domingo está indisponível. Seleciona uma data de segunda a sábado.' }
    }
    return { valid: true, message: `Disponível para ${formatDate(form.date)}.` }
  }, [form.date])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!dayStatus.valid) {
      alert('A plataforma só aceita reservas de segunda a sábado.')
      return
    }

    alert('Pedido de reserva registado com sucesso. Esta versão é visual e pronta para integrares backend depois.')
  }

  return (
    <section className="section section-soft" id="reservas">
      <div className="container booking-layout">
        <div>
          <SectionTitle
            eyebrow="Reservas"
            title="Área de marcação desenhada para ser simples, rápida e convincente"
            text="Nesta versão, o formulário já valida os dias disponíveis e organiza o pedido com aspeto profissional."
          />
          <div className="booking-side glass">
            <h3>Porque esta secção funciona bem</h3>
            <ul>
              <li>Validação de segunda a sábado</li>
              <li>Escolha clara de serviço, zona e horário</li>
              <li>Bloco lateral com resumo do pedido</li>
              <li>Pronta para ligar a email, WhatsApp ou backend</li>
            </ul>
            <a href={company.whatsappLink} target="_blank" rel="noreferrer" className="text-link">Falar diretamente no WhatsApp</a>
          </div>
        </div>

        <div className="booking-card glass">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="field-grid two">
              <label>
                <span>Nome</span>
                <input name="name" value={form.name} onChange={updateField} placeholder="O teu nome" required />
              </label>
              <label>
                <span>Zona</span>
                <select name="zone" value={form.zone} onChange={updateField}>
                  <option>Coimbra</option>
                  <option>Pombal</option>
                  <option>Outra zona da região</option>
                </select>
              </label>
            </div>

            <label>
              <span>Serviço</span>
              <select name="service" value={form.service} onChange={updateField}>
                {bookingServices.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>

            <div className="field-grid two">
              <label>
                <span>Data</span>
                <input type="date" name="date" value={form.date} onChange={updateField} required />
              </label>
              <label>
                <span>Hora</span>
                <select name="time" value={form.time} onChange={updateField}>
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                </select>
              </label>
            </div>

            <label>
              <span>Detalhes</span>
              <textarea
                name="details"
                value={form.details}
                onChange={updateField}
                rows="5"
                placeholder="Ex.: sofá de 3 lugares, manchas visíveis, zona de Coimbra..."
              />
            </label>

            <div className={`booking-status ${dayStatus.valid ? 'ok' : 'error'}`}>
              {dayStatus.message}
            </div>

            <div className="summary-card">
              <small>Resumo da marcação</small>
              <strong>{form.service}</strong>
              <span>{form.zone} · {formatDate(form.date)} · {form.time}</span>
            </div>

            <button className="btn btn-solid" type="submit">Enviar pedido de reserva</button>
          </form>
        </div>
      </div>
    </section>
  )
}
