export default function ExperienceSection() {
  return (
    <section className="section section-contrast">
      <div className="container experience-layout">
        <div className="experience-card card-glow">
          <p className="eyebrow">Posicionamento</p>
          <h2>Uma presença digital forte ajuda o cliente a decidir mais depressa.</h2>
          <p>
            Esta plataforma foi desenhada para transmitir rigor, limpeza, organização e rapidez.
            Cada secção foi pensada para reforçar confiança, reduzir dúvidas e incentivar pedidos de
            orçamento e marcações.
          </p>
        </div>

        <div className="mini-grid">
          <div className="mini-card card-glow">
            <strong>Casa</strong>
            <span>Sofás, colchões, carpetes e muito mais.</span>
          </div>
          <div className="mini-card card-glow">
            <strong>Automóvel</strong>
            <span>Estofos, limpeza completa e polimento de óticas.</span>
          </div>
          <div className="mini-card card-glow">
            <strong>Rapidez</strong>
            <span>Pedido simples, resposta clara e contacto imediato.</span>
          </div>
          <div className="mini-card card-glow">
            <strong>Confiança</strong>
            <span>Visual premium e mensagem certa para converter clientes.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
