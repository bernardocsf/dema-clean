import { Clock3, MapPinned, ShieldPlus, Sofa } from 'lucide-react'
import SectionTitle from './SectionTitle'

const items = [
  {
    icon: Sofa,
    title: 'Casa e automóvel na mesma marca',
    text: 'A plataforma comunica bem a variedade de serviços sem perder foco nem credibilidade.',
  },
  {
    icon: Clock3,
    title: 'Resposta rápida ao cliente',
    text: 'Chamadas para ação bem posicionadas para reduzir fricção no pedido.',
  },
  {
    icon: MapPinned,
    title: 'Cobertura bem definida',
    text: 'Coimbra, Pombal e região destacados logo nas primeiras secções.',
  },
  {
    icon: ShieldPlus,
    title: 'Imagem profissional',
    text: 'Visual moderno e estrutura fácil de escalar para anúncios e redes sociais.',
  },
]

function AdvantagesSection() {
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionTitle
          eyebrow="Vantagens"
          title="O que faz sentido existir nesta plataforma para gerar mais confiança."
          description="Para este tipo de negócio local, a prioridade é clareza, rapidez no contacto, prova social e reserva simples."
        />

        <div className="advantages-grid">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="advantage-card">
                <Icon size={22} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection
