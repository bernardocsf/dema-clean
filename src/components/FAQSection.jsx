import { faqs } from '../data/content'

export default function FAQSection() {
  return (
    <section className="section section-contrast">
      <div className="container">
        <div className="section-heading narrow">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2>Respostas rápidas para remover objeções e facilitar a decisão.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <article key={faq.question} className="faq-item card-glow">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
