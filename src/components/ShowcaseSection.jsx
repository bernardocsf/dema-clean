import SectionTitle from './SectionTitle'

const cards = [
  {
    title: 'Antes e depois',
    text: 'Zona ideal para colocares fotografias reais de resultados, criando prova visual imediata.',
  },
  {
    title: 'Serviço ao detalhe',
    text: 'Explica o tipo de limpeza, o cuidado com materiais e o benefício para o cliente.',
  },
  {
    title: 'Marca que transmite confiança',
    text: 'Design escuro, elegante e premium para reforçar profissionalismo e aumentar a perceção de valor.',
  },
]

export default function ShowcaseSection() {
  return (
    <section className="section" id="destaques">
      <div className="container showcase-layout">
        <div>
          <SectionTitle
            eyebrow="Destaques"
            title="Uma montra digital preparada para converter"
            text="Esta plataforma não é só bonita. Foi desenhada para guiar o visitante até ao pedido de marcação."
          />
        </div>
        <div className="showcase-grid">
          {cards.map((card) => (
            <article key={card.title} className="showcase-card glass">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
