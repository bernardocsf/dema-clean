import SectionTitle from './SectionTitle'
import { services } from '../data/content'

export default function ServicesSection() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <SectionTitle
          eyebrow="Serviços"
          title="Tudo o que a tua marca precisa de mostrar para vender melhor"
          text="Organizei os serviços em cartões premium para tornar a navegação clara e rápida, com foco em confiança e decisão imediata do cliente."
        />

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card glass" key={service.title}>
              <span className="service-badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#reservas">Reservar este serviço</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
