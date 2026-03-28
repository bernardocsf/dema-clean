import { MessageCircleMore, Phone } from 'lucide-react'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#inicio" className="brand">
          <span className="brand-badge">DEMA</span>
          <div>
            <strong>DEMA Clean</strong>
            <span>Tá sujo? Relaxa, a DEMA despacha!</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#reservas">Reservas</a>
          <a href="#reviews">Reviews</a>
          <a href="#contactos">Contactos</a>
        </nav>

        <div className="nav-actions">
          <a href="tel:+351910879788" className="btn btn-secondary">
            <Phone size={16} /> Ligar
          </a>
          <a
            href="https://instagram.com/demaclean_"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <MessageCircleMore size={16} /> Instagram
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
