import { company } from '../data/content'

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="topbar-icon">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="topbar-icon topbar-icon-whatsapp">
      <path
        d="M12 4.2a7.8 7.8 0 0 0-6.7 11.8L4 20l4.2-1.3A7.8 7.8 0 1 0 12 4.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 9.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4l.4 1.1c.1.3.1.5-.1.7l-.3.4c-.1.1-.2.3 0 .5.4.8 1 1.5 1.8 2 .2.1.4.1.5 0l.4-.5c.2-.2.4-.2.6-.1l1 .5c.3.1.4.3.4.5v.4c0 .3-.2.5-.4.7-.4.2-.9.4-1.4.3-1-.2-2-.7-3-1.6-.8-.7-1.5-1.6-1.9-2.6-.3-.7-.3-1.5-.1-2.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Navbar() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`

  return (
    <>
      <div className="topbar">
        <div className="container topbar-shell">
          <div className="topbar-contact-group">
            <a className="topbar-link" href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              <span>
                <strong>{company.phoneDisplay}</strong> (chamada para a rede m&oacute;vel nacional)
              </span>
            </a>
            <span className="topbar-separator" aria-hidden="true">
              |
            </span>
            <a className="topbar-link" href={`mailto:${company.email}`}>
              <span>
                <strong>{company.email}</strong>
              </span>
            </a>
            <span className="topbar-separator" aria-hidden="true">
              |
            </span>
            <a className="topbar-link" href={company.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram DEMA Clean">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

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
            <a href="#reviews">Depoimentos</a>
            <a href="#galeria">Galeria</a>
            <a href="#sobre">Sobre</a>
          </nav>

          <a className="nav-cta" href="#marcacoes">
            Orçamento
          </a>
        </div>
      </header>
    </>
  )
}
