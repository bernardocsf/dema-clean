import { company } from '../data/content'

export default function BookingSection() {
  return (
    <section className="section section-contrast" id="marcacoes">
      <div className="container booking-layout">
        <div>
          <p className="eyebrow">Contacto Direto</p>
          <h2 className="booking-title-inline">
            <span>Fala connosco por telefone</span>
            <span>para marcar o serviço.</span>
          </h2>
          <p>
            Para garantir resposta imediata e evitar conflitos de disponibilidade, as marcações são tratadas por
            contacto direto. Liga para a DEMA Clean e confirmamos tudo no momento.
          </p>

          <div className="booking-side-cards">
            <div className="mini-card card-glow">
              <strong>Atendimento</strong>
              <span>Segunda a sábado</span>
            </div>
            <div className="mini-card card-glow">
              <strong>Zona de atuação</strong>
              <span>{company.area}</span>
            </div>
            <div className="mini-card card-glow">
              <strong>Canal preferencial</strong>
              <span>Telefone e WhatsApp</span>
            </div>
          </div>
        </div>

        <article className="booking-card card-glow" aria-label="Contacto para marcações">
          <p className="eyebrow">Marcações por telefone</p>
          <p className="booking-phone-main">{company.phoneDisplay}</p>
          <p>Se preferires, também podes iniciar contacto via WhatsApp para confirmação rápida.</p>

          <div className="hero-actions">
            <a className="button button-primary wide-button" href={`tel:${company.phoneLink}`}>
              Ligar agora
            </a>
            <a
              className="button button-secondary wide-button"
              href={`https://wa.me/${company.phoneLink}`}
              target="_blank"
              rel="noreferrer"
            >
              Abrir WhatsApp
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
