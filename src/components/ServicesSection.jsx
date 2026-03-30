import { services } from '../data/content'

export default function ServicesSection() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Serviços</p>
          <h2 className="services-title-inline">Serviços de higienização para casa, bebé e automóvel.</h2>
          <p>Escolhe o tipo de limpeza que precisas e fala connosco para receber confirmação e orçamento.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.title} className="service-card card-glow">
              <span className="service-badge">Serviço {String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
