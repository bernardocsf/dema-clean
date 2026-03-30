import { company, features } from '../data/content'

export default function Hero() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`

  return (
    <section className="hero section" id="inicio">
      <div className="container hero-layout">
        <div>
          <p className="eyebrow">Limpezas residenciais e automóvel</p>
          <h1>Profissionais em higienização com resposta rápida.</h1>
          <p className="hero-text">
            Atendimento profissional para casas, sofás, colchões, carpetes e interiores automóveis. Pedido simples,
            confirmação rápida e serviço com atenção ao detalhe.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#marcacoes">
              Solicitar orçamento
            </a>
            <a className="button button-secondary" href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </div>

          <div className="hero-meta">
            <span>{company.phoneDisplay}</span>
            <span>{company.email}</span>
            <span>{company.area}</span>
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
