import { process } from '../data/content'

export default function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading narrow">
          <p className="eyebrow">Como funciona</p>
          <h2>Um percurso simples para transformar interesse em marcação.</h2>
        </div>

        <div className="process-grid">
          {process.map((item, index) => (
            <article key={item.title} className="process-card card-glow">
              <span className="process-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
