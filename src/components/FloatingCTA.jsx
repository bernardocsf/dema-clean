import { company } from '../data/content'

export default function FloatingCTA() {
  return (
    <a
      className="floating-cta"
      href={`https://wa.me/${company.phoneLink}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar por WhatsApp"
    >
      Pedir orçamento
    </a>
  )
}
