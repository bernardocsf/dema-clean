import { services } from '../data/content'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

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
          {services.map((service) => (
            <article key={service.title} className="service-card card-glow">
              <div className="service-media">
                <img className="service-image" src={getMediaUrl(service.image)} alt={service.title} loading="lazy" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
