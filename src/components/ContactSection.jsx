import { company } from '../data/content'

export default function ContactSection() {
  return (
    <section className="section" id="contactos">
      <div className="container contact-layout">
        <div className="contact-main card-glow">
          <p className="eyebrow">Contactos</p>
          <h2>Fale connosco e peça informações sobre o seu serviço.</h2>
          <p>
            Atendimento por telefone, WhatsApp e email para pedidos de orçamento, confirmação de disponibilidade e
            esclarecimento de dúvidas.
          </p>
        </div>

        <div className="contact-grid">
          <a className="contact-card card-glow" href={`tel:${company.phoneLink}`}>
            <span>Telefone</span>
            <strong>{company.phoneDisplay}</strong>
          </a>
          <a className="contact-card card-glow" href={`mailto:${company.email}`}>
            <span>Email</span>
            <strong>{company.email}</strong>
          </a>
          <a className="contact-card card-glow" href={company.instagramUrl} target="_blank" rel="noreferrer">
            <span>Instagram</span>
            <strong>{company.instagramHandle}</strong>
          </a>
          <div className="contact-card card-glow">
            <span>Zona</span>
            <strong>{company.area}</strong>
          </div>
          <div className="contact-card card-glow">
            <span>Horário</span>
            <strong>{company.scheduleWeek}</strong>
          </div>
          <div className="contact-card card-glow">
            <span>Disponibilidade extra</span>
            <strong>{company.scheduleWeekend}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
