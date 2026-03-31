import { aboutMe } from '../data/content'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

export default function AboutSection() {
  return (
    <section className="section" id="sobre">
      <div className="container about-clean-shell">
        <figure className="about-clean-media card-glow">
          <img className="about-photo" src={getMediaUrl(aboutMe.image)} alt={aboutMe.name} loading="lazy" />
          <figcaption className="about-clean-caption">
            <strong>{aboutMe.name}</strong>
            <span>{aboutMe.role}</span>
          </figcaption>
        </figure>

        <div className="about-clean-content">
          <div className="about-clean-intro">
            <p className="eyebrow">Sobre Nós</p>
            <h2 className="about-title-inline">{aboutMe.title}</h2>
            <p>{aboutMe.description}</p>
            <p>{aboutMe.shortBio}</p>
          </div>

          <div className="about-clean-founders">
            {aboutMe.founders.map((founder) => (
              <article key={founder.name} className="about-clean-founder card-glow">
                <div className="about-avatar">{founder.initials}</div>
                <div className="about-clean-founder-copy">
                  <strong>{founder.name}</strong>
                  <span>{founder.role}</span>
                  <p>{founder.text}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="about-clean-mission card-glow" aria-label="Missão da DEMA">
            <p className="eyebrow">A Nossa Missão</p>
            <p className="about-clean-mission-text">{aboutMe.mission}</p>

            <div className="about-clean-pills">
              {aboutMe.highlights.map((item) => (
                <span key={item.title} className="about-clean-pill">
                  {item.title}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
