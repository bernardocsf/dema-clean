import { reviews } from '../data/content'

export default function ReviewsSection() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-heading narrow">
          <p className="eyebrow">Reviews</p>
          <h2>Prova social forte para reforçar confiança antes do contacto.</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.name} className="review-card card-glow">
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
