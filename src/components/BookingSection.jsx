import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { company, services } from '../data/content'

const categories = ['Casa', 'Automóvel', 'Bebé e Infantil', 'Outro']

function getMinDate() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

function isSunday(dateValue) {
  if (!dateValue) return false
  return dateValue.getDay() === 0
}

export default function BookingSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: categories[0],
    service: services[0].title,
    date: null,
    time: '10:00',
    address: '',
    doorNumber: '',
    postalCode: '',
    locality: '',
    notes: '',
  })
  const [status, setStatus] = useState('')

  const minDate = useMemo(() => getMinDate(), [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function updateDateField(event) {
    const selectedDate = event

    if (isSunday(selectedDate)) {
      setForm((current) => ({ ...current, date: null }))
      setStatus('Domingos estão indisponíveis. Seleciona um dia de segunda a sábado.')
      return
    }

    setForm((current) => ({ ...current, date: selectedDate }))
    setStatus('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (isSunday(form.date)) {
      setStatus('As marcações estão disponíveis apenas de segunda a sábado.')
      return
    }

    if (!form.date) {
      setStatus('Seleciona uma data para a marcação.')
      return
    }

    const formattedDate = format(form.date, 'yyyy-MM-dd')

    const message = encodeURIComponent(
      `Pedido de marcação\nCategoria: ${form.category}\nServiço: ${form.service}\nNome: ${form.name}\nTelefone: ${form.phone}\nData pretendida: ${formattedDate}\nHora pretendida: ${form.time}\nMorada: ${form.address}, Nº ${form.doorNumber}, ${form.postalCode} ${form.locality}\nDetalhes: ${form.notes || '-'}`,
    )

    window.location.href = `https://wa.me/${company.phoneLink}?text=${message}`
    setStatus('Pedido preparado com sucesso. O WhatsApp foi aberto para envio.')
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
              <input name="locality" value={form.locality} onChange={updateField} placeholder="Ex.: Coimbra" required />
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

          <button className="button button-primary wide-button" type="submit">
            Enviar pedido de marcação
          </button>

          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </div>
    </section>
  )
}
