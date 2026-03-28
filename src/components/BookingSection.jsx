import { useMemo, useState } from 'react'
import { CalendarClock, CircleAlert, Send } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { services, timeSlots } from '../data/content'

const initialState = {
  name: '',
  phone: '',
  area: 'Coimbra',
  service: 'Sofás',
  date: '',
  time: '09:00',
  details: '',
}

function BookingSection() {
  const [formData, setFormData] = useState(initialState)
  const [message, setMessage] = useState('')

  const minimumDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.date) {
      setMessage('Seleciona uma data para o teu pedido.')
      return
    }

    const selectedDate = new Date(`${formData.date}T12:00:00`)

    if (selectedDate.getDay() === 0) {
      setMessage('As reservas estão disponíveis apenas de segunda a sábado.')
      return
    }

    const whatsappMessage = encodeURIComponent(
      `Olá DEMA Clean!%0A%0ANome: ${formData.name}%0ATelefone: ${formData.phone}%0AZona: ${formData.area}%0AServiço: ${formData.service}%0AData pretendida: ${formData.date}%0AHora pretendida: ${formData.time}%0ADetalhes: ${formData.details || 'Sem detalhes adicionais.'}`,
    )

    window.open(`https://wa.me/351910879788?text=${whatsappMessage}`, '_blank')
    setMessage('Pedido preparado com sucesso. Vais ser encaminhado para confirmação por mensagem.')
  }

  return (
    <section id="reservas" className="section section-alt">
      <div className="container booking-layout">
        <div>
          <SectionTitle
            eyebrow="Reservas"
            title="Uma área de marcação simples, rápida e preparada para conversão."
            description="A reserva pode depois ser ligada a um backend, Google Calendar, Supabase ou Firebase. Nesta versão, o pedido é enviado por mensagem para agilizar a confirmação."
          />

          <div className="feature-list">
            <div>
              <CalendarClock size={18} /> Disponível de segunda a sábado
            </div>
            <div>
              <CircleAlert size={18} /> Validação automática para bloquear domingos
            </div>
            <div>
              <Send size={18} /> Pedido enviado diretamente para contacto rápido
            </div>
          </div>
        </div>

        <form className="booking-card" onSubmit={handleSubmit}>
          <div className="field-grid two-columns">
            <label>
              Nome
              <input name="name" value={formData.name} onChange={onChange} placeholder="O teu nome" required />
            </label>
            <label>
              Telefone
              <input name="phone" value={formData.phone} onChange={onChange} placeholder="912 345 678" required />
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              Zona
              <select name="area" value={formData.area} onChange={onChange}>
                <option>Coimbra</option>
                <option>Pombal</option>
                <option>Outra localidade da região</option>
              </select>
            </label>

            <label>
              Serviço
              <select name="service" value={formData.service} onChange={onChange}>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-grid two-columns">
            <label>
              Data pretendida
              <input type="date" name="date" min={minimumDate} value={formData.date} onChange={onChange} required />
            </label>
            <label>
              Hora pretendida
              <select name="time" value={formData.time} onChange={onChange}>
                {timeSlots.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Detalhes
            <textarea
              name="details"
              value={formData.details}
              onChange={onChange}
              rows="5"
              placeholder="Ex.: sofá com manchas, limpeza interior completa, carrinho de bebé, etc."
            />
          </label>

          <button className="btn btn-primary btn-full" type="submit">
            Pedir marcação
          </button>

          {message ? <p className="form-message">{message}</p> : null}
        </form>
      </div>
    </section>
  )
}

export default BookingSection
