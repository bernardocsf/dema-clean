import { services } from '../data/content'
import SectionTitle from './SectionTitle'

function ServicesSection() {
  return (
    <section id="servicos" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Serviços"
          title="Limpamos o que precisa de atenção com uma apresentação profissional e clara."
          description="A plataforma foi pensada para mostrar confiança, variedade de serviços e facilitar o contacto imediato."
        />

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-tag">DEMA Clean</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>{service.highlight}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
