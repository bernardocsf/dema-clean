import { Instagram, MapPin, Phone } from 'lucide-react'
import SectionTitle from './SectionTitle'

function ContactSection() {
  return (
    <section id="contactos" className="section section-alt">
      <div className="container contact-layout">
        <SectionTitle
          eyebrow="Contactos"
          title="Tudo o que o cliente precisa para entrar em contacto sem perder tempo."
          description="A secção final reforça canais diretos, cobertura geográfica e uma chamada para ação clara."
        />

        <div className="contact-cards">
          <a className="contact-card" href="tel:+351910879788">
            <Phone size={22} />
            <span>Telefone</span>
            <strong>+351 910 879 788</strong>
          </a>

          <a className="contact-card" href="https://instagram.com/demaclean_" target="_blank" rel="noreferrer">
            <Instagram size={22} />
            <span>Instagram</span>
            <strong>@demaclean_</strong>
          </a>

          <div className="contact-card">
            <MapPin size={22} />
            <span>Zona de atuação</span>
            <strong>Coimbra, Pombal e região</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
