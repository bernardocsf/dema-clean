import { company, metrics, highlights } from '../data/content'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Plataforma premium de limpeza e higienização</p>
          <h1>
            A melhor presença digital para uma marca que cuida de <span>casas e carros</span> com rigor.
          </h1>
          <p className="hero-copy">
            Na DEMA Clean, o serviço tem de parecer profissional antes, durante e depois da marcação.
            Esta versão foi pensada para transmitir confiança, facilitar reservas e transformar visitas em
            pedidos reais.
          </p>

          <div className="hero-actions">
            <a href="#reservas" className="btn btn-solid">Marcar serviço</a>
            <a href={company.whatsappLink} className="btn btn-ghost" target="_blank" rel="noreferrer">Pedir orçamento</a>
          </div>

          <div className="bullet-grid">
            {highlights.map((item) => (
              <div className="bullet-card" key={item}>{item}</div>
            ))}
          </div>
        </div>

        <div className="hero-panel glass">
          <div className="hero-logo-wrap">
            <img src="/logo.jpg" alt="DEMA Clean" className="hero-logo" />
          </div>
          <div className="hero-panel-top">
            <span className="tag">Imagem premium</span>
            <span className="tag">Mobile first</span>
          </div>
          <div className="metrics-grid">
            {metrics.map((item) => (
              <article key={item.label} className="metric-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="hero-contact-strip">
            <a href={company.phoneLink}>{company.phone}</a>
            <a href={company.emailLink}>{company.email}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
