import { MessageCircleMore } from 'lucide-react'

function FloatingContact() {
  return (
    <a
      className="floating-whatsapp"
      href="https://wa.me/351910879788"
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a DEMA Clean"
    >
      <MessageCircleMore size={20} />
      Falar agora
    </a>
  )
}

export default FloatingContact
