import { company } from '../data/content'

export default function Footer() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="brand brand-footer">
          <img src={logoUrl} alt="Logótipo DEMA Clean" className="brand-logo" />
          <div>
            <strong>{company.name}</strong>
            <span>{company.slogan}</span>
          </div>
        </div>

        <div className="footer-right">
          <a href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.instagramUrl} target="_blank" rel="noreferrer">
            {company.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  )
}
