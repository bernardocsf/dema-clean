import { company } from '../data/content'

export default function Navbar() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#inicio" aria-label="DEMA Clean">
          <img src={logoUrl} alt="Logótipo DEMA Clean" className="brand-logo" />
          <div>
            <strong>{company.name}</strong>
            <span>{company.slogan}</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#marcacoes">Marcações</a>
          <a href="#reviews">Reviews</a>
          <a href="#contactos">Contactos</a>
        </nav>

        <a className="nav-cta" href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer">
          Pedir orçamento
        </a>
      </div>
    </header>
  )
}
