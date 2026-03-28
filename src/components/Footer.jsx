import { company } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{company.name}</strong>
          <p>{company.tagline}</p>
        </div>
        <div className="footer-links">
          <a href={company.phoneLink}>{company.phone}</a>
          <a href={company.emailLink}>{company.email}</a>
          <a href={company.instagram} target="_blank" rel="noreferrer">{company.instagramHandle}</a>
        </div>
      </div>
    </footer>
  )
}
