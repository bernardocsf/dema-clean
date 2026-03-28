export default function TrustBar() {
  const items = [
    {
      title: 'Serviço local',
      text: 'Coimbra, Pombal e região',
    },
    {
      title: 'Atendimento rápido',
      text: 'Pedidos e confirmações com contacto direto',
    },
    {
      title: 'Marcações organizadas',
      text: 'Disponibilidade de segunda a sábado',
    },
    {
      title: 'Imagem profissional',
      text: 'Plataforma pronta para apresentar ao cliente',
    },
  ]

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-marquee" aria-label="Destaques de serviço">
          <div className="trust-track">
            <div className="trust-group">
              {items.map((item) => (
                <article key={`a-${item.title}`} className="trust-item">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
            <div className="trust-group" aria-hidden="true">
              {items.map((item) => (
                <article key={`b-${item.title}`} className="trust-item">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
