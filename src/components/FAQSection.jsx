import SectionTitle from './SectionTitle'
import { faqs } from '../data/content'

export default function FAQSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <SectionTitle
          eyebrow="FAQ"
          title="Perguntas frequentes"
          text="Uma plataforma forte também tira dúvidas rapidamente e reduz fricção na hora da marcação."
        />

        <div className="faq-grid">
          {faqs.map((item) => (
            <article key={item.q} className="faq-card glass">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
