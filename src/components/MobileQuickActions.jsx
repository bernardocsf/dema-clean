import { company } from '../data/content'

export default function MobileQuickActions() {
  return (
    <div className="mobile-quick-actions" aria-label="Ações rápidas">
      <a href={`tel:${company.phoneLink}`} className="mobile-quick-call">
        Ligar
      </a>
      <a href={`https://wa.me/${company.phoneLink}`} target="_blank" rel="noreferrer" className="mobile-quick-whatsapp">
        WhatsApp
      </a>
    </div>
  )
}
