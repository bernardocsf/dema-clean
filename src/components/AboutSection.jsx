import { aboutMe } from '../data/content'

export default function AboutSection() {
  return (
    <section className="section" id="sobre">
      <div className="container about-layout">
        <div>
          <p className="eyebrow">Sobre mim</p>
          <h2>{aboutMe.title}</h2>
          <p>{aboutMe.description}</p>

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
          <p>{aboutMe.shortBio}</p>
        </aside>
      </div>
    </section>
  )
}
