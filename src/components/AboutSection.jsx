import { aboutMe } from '../data/content'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

export default function AboutSection() {
  return (
    <section className="section" id="sobre">
      <div className="container about-reframe">
        <article className="about-reframe-hero card-glow">
          <figure className="about-reframe-media">
            <img className="about-photo" src={getMediaUrl(aboutMe.image)} alt={aboutMe.name} loading="lazy" />
          </figure>

          <div className="about-reframe-copy">
            <p className="eyebrow">Sobre Nós</p>
            <h2>{aboutMe.title}</h2>
            <p>{aboutMe.description}</p>
            {aboutMe.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="about-reframe-signature">
              <strong>{aboutMe.name}</strong>
              <span>{aboutMe.role}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
