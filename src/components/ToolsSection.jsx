import { toolRecommendations } from '../data/content'

export default function ToolsSection() {
  return (
    <section className="section section-contrast" id="ferramentas">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Ferramentas</p>
          <h2>Stack recomendado para captar mais pedidos e medir resultados.</h2>
          <p>
            Estas integrações ajudam a melhorar conversão, reduzir spam, acompanhar desempenho e
            acelerar decisões com dados reais.
          </p>
        </div>

        <div className="tools-grid">
          {toolRecommendations.map((tool) => (
            <article key={tool.name} className="tool-card card-glow">
              <span className="tool-type">{tool.type}</span>
              <h3>{tool.name}</h3>
              <span className="tool-status">{tool.status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
