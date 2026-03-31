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

          <div className="hero-meta">
            <span>{company.area}</span>
          </div>
        </div>

        <div className="hero-panel card-glow">
          <img src={logoUrl} alt="DEMA Clean" className="hero-logo" />
          <div className="hero-stats">
            {features.map((item) => (
              <div key={item} className="stat-box">
                <strong aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" className="stat-box-icon">
                    <path
                      d="M4.5 10.5L8.2 14.2L15.5 6.8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
