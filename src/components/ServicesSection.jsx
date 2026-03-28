import { services } from '../data/content'

export default function ServicesSection() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Serviços</p>
          <h2>Escolhe o serviço e marca em minutos.</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card card-glow">
              <div className="service-badge">DEMA</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
