import { company } from '../data/content'

export default function ContactSection() {
  return (
    <section className="section" id="contactos">
      <div className="container contact-layout">
        <div className="contact-main card-glow">
          <p className="eyebrow">Contactos</p>
          <h2>
            Contacto rápido,
            <br />
            sem complicações.
          </h2>
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
        </div>
      </div>
    </section>
  )
}
