import { company } from '../data/content'

export default function Footer() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-identity card-glow">
          <div className="brand brand-footer">
            <img src={logoUrl} alt="Logótipo DEMA Clean" className="brand-logo" />
            <div>
              <strong>{company.name}</strong>
              <span>{company.slogan}</span>
            </div>
          </div>
          <p className="footer-text">
            Serviço profissional de higienização com resposta rápida, acompanhamento próximo e foco em qualidade.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <strong>Navegação</strong>
            <a href="#marcacoes">Orçamento</a>
            <a href="#reviews">Depoimentos</a>
            <a href="#galeria">Galeria</a>
            <a href="#sobre">Sobre</a>
          </div>

          <div className="footer-col">
            <strong>Contactos</strong>
            <a href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.instagramUrl} target="_blank" rel="noreferrer">
              {company.instagramHandle}
            </a>
          </div>

          <div className="footer-col">
            <strong>Informação</strong>
            <span>{company.area}</span>
            <span>{company.scheduleWeek}</span>
            <span>{company.scheduleWeekend}</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {company.name}. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
