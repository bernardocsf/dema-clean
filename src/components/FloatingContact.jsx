import { company } from '../data/content'

export default function FloatingContact() {
  return (
    <a
      href={company.whatsappLink}
      className="floating-contact"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
    >
      Pedir orçamento
    </a>
  )
}
