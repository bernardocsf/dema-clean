import { reviews } from '../data/content'

export default function ReviewsSection() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-heading narrow">
          <p className="eyebrow">Depoimentos</p>
          <h2>Clientes satisfeitos com resultados reais.</h2>
          <p>Feedback de quem já confiou na DEMA Clean para limpezas técnicas e higienização.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.name} className="review-card card-glow">
              <div className="review-head">
                <div className="review-avatar">{review.avatar}</div>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="stars">★★★★★</div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
