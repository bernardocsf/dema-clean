import SectionTitle from './SectionTitle'
import { reviews } from '../data/content'

export default function ReviewsSection() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionTitle
          eyebrow="Reviews"
          title="Prova social com apresentação premium"
          text="Uma secção de testemunhos bem desenhada ajuda muito num ramo baseado em confiança, higiene e resultado visível."
          center
        />
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card glass" key={review.name}>
              <div className="stars">{'★'.repeat(review.rating)}</div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
