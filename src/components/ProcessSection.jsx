import SectionTitle from './SectionTitle'
import { processSteps } from '../data/content'

export default function ProcessSection() {
  return (
    <section className="section section-soft" id="processo">
      <div className="container">
        <SectionTitle
          eyebrow="Processo"
          title="Uma jornada simples para o cliente e profissional para a DEMA"
          text="A experiência foi pensada para parecer séria e organizada, mesmo antes de integrares backend real."
        />
        <div className="process-grid">
          {processSteps.map((item) => (
            <article key={item.step} className="process-card glass">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
