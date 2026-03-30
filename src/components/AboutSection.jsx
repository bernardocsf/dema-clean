import { aboutMe } from '../data/content'

export default function AboutSection() {
  return (
    <section className="section" id="sobre">
      <div className="container about-layout">
        <div>
          <p className="eyebrow">Sobre</p>
          <h2>Experiência, confiança e acompanhamento próximo em cada serviço.</h2>
          <p>{aboutMe.description}</p>
          <p>{aboutMe.shortBio}</p>

          <div className="mini-grid">
            {aboutMe.highlights.map((item) => (
              <article key={item.title} className="mini-card card-glow">
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="about-card card-glow" aria-label="Perfil profissional">
          <div className="about-avatar">BF</div>
          <strong>{aboutMe.name}</strong>
          <span>{aboutMe.role}</span>
          <p>{aboutMe.title}</p>
          <a className="button button-primary wide-button" href="#contactos">
            Pedir contacto
          </a>
        </aside>
      </div>
    </section>
  )
}
