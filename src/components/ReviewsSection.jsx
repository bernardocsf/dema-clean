import { Star } from 'lucide-react'
import { reviews } from '../data/content'
import SectionTitle from './SectionTitle'

function ReviewsSection() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Reviews"
          title="Prova social para reforçar confiança e aumentar pedidos de contacto."
          description="A secção de reviews pode depois ser ligada ao Google, Instagram ou recolha interna de testemunhos."
        />

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star size={16} key={`${review.name}-${index}`} fill="currentColor" />
                ))}
              </div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
