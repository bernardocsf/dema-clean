import SectionTitle from './SectionTitle'
import { faqs } from '../data/content'

function FAQSection() {
  return (
    <section className="section">
      <div className="container faq-layout">
        <SectionTitle
          eyebrow="FAQ"
          title="Perguntas frequentes que ajudam o cliente a decidir mais depressa."
          description="Uma boa plataforma deve remover dúvidas antes de o cliente sair da página."
        />

        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
