import { company } from '../data/content'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-shell">
        <a href="#top" className="brand">
          <img src="/logo.jpg" alt="Logótipo DEMA Clean" className="brand-logo" />
          <div>
            <strong>{company.name}</strong>
            <span>{company.location}</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#reservas">Reservas</a>
          <a href="#reviews">Reviews</a>
          <a href="#contactos" className="nav-cta">Contactos</a>
        </nav>
      </div>
    </header>
  )
}
