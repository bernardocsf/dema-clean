import { CalendarDays, MapPin, ShieldCheck, Sparkles } from 'lucide-react'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Digital creator • Coimbra</span>
          <h1>Higienização profissional para a tua casa e para o teu carro.</h1>
          <p className="hero-copy">
            Na DEMA Clean cuidamos de sofás, colchões, carpetes, estofos de carro,
            carrinhos de bebé, cadeiras auto e muito mais, com rapidez, rigor e uma
            imagem moderna que transmite confiança.
          </p>

          <div className="hero-actions">
            <a href="#reservas" className="btn btn-primary btn-large">
              <CalendarDays size={18} /> Marcar serviço
            </a>
            <a href="#servicos" className="btn btn-ghost btn-large">
              Ver serviços
            </a>
          </div>

          <div className="hero-points">
            <div><ShieldCheck size={18} /> Atendimento com foco na confiança</div>
            <div><Sparkles size={18} /> Resultado visual valorizado</div>
            <div><MapPin size={18} /> Coimbra, Pombal e região</div>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span>Serviços em destaque</span>
            <strong>Reservas de 2ª a sábado</strong>
          </div>

          <ul className="check-list">
            <li>Higienização de sofás</li>
            <li>Higienização de colchões</li>
            <li>Higienização de carpetes</li>
            <li>Estofos e limpeza automóvel</li>
            <li>Polimento de óticas</li>
          </ul>

          <div className="hero-contact-card">
            <span>Contacto rápido</span>
            <a href="tel:+351910879788">+351 910 879 788</a>
            <a href="https://instagram.com/demaclean_" target="_blank" rel="noreferrer">
              @demaclean_
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
