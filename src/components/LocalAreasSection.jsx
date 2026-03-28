import { company, localAreas } from '../data/content'

export default function LocalAreasSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Cobertura local</p>
          <h2>Serviço de proximidade para resposta rápida na tua zona.</h2>
          <p>
            A DEMA Clean atua em várias zonas da região centro com foco em rapidez de resposta e
            organização de agenda.
          </p>
        </div>

        <div className="areas-grid">
          {localAreas.map((area) => (
            <article key={area.name} className="area-card card-glow">
              <h3>{area.name}</h3>
              <p>{area.text}</p>
              <a href="#marcacoes">Marcar em {area.name}</a>
            </article>
          ))}
        </div>

        <p className="areas-note">
          Não viste a tua localidade? Envia pedido na mesma e confirmamos cobertura em minutos.
          <a href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer">
            {' '}
            Falar no WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
