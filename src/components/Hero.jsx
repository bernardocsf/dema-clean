import { company, features } from '../data/content'

export default function Hero() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`

  return (
    <section className="hero section" id="inicio">
      <div className="container hero-layout">
        <div>
          <p className="eyebrow">Higienização profissional em casa e no automóvel</p>
          <h1>Limpeza profissional com resposta rápida.</h1>
          <p className="hero-text">
            Sofás, colchões, carpetes e automóvel. Simples, rápido e com qualidade.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#marcacoes">
              Marcar serviço
            </a>
            <a className="button button-secondary" href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer">
              Falar agora
            </a>
          </div>

          <div className="hero-meta">
            <span>{company.area}</span>
            <span>Segunda a sábado</span>
            <span>{company.phoneDisplay}</span>
          </div>
        </div>

        <div className="hero-panel card-glow">
          <img src={logoUrl} alt="DEMA Clean" className="hero-logo" />
          <div className="hero-stats">
            {features.map((item) => (
              <div key={item} className="stat-box">
                <strong>✔</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
