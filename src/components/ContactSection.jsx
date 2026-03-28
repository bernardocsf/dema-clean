import SectionTitle from './SectionTitle'
import { company } from '../data/content'

export default function ContactSection() {
  return (
    <section className="section" id="contactos">
      <div className="container contact-layout">
        <div>
          <SectionTitle
            eyebrow="Contactos"
            title="Fácil de contactar, fácil de converter"
            text="Também atualizei os teus dados com o novo número e novo email, para deixares esta versão pronta a adaptar e publicar."
          />
        </div>
        <div className="contact-grid">
          <article className="contact-card glass">
            <span>Telefone</span>
            <a href={company.phoneLink}>{company.phone}</a>
            <p>Contacto direto para marcações e pedidos rápidos.</p>
          </article>
          <article className="contact-card glass">
            <span>Email</span>
            <a href={company.emailLink}>{company.email}</a>
            <p>Ideal para pedidos mais detalhados ou parcerias.</p>
          </article>
          <article className="contact-card glass">
            <span>Instagram</span>
            <a href={company.instagram} target="_blank" rel="noreferrer">{company.instagramHandle}</a>
            <p>Canal visual perfeito para mostrar resultados e captar clientes.</p>
          </article>
          <article className="contact-card glass">
            <span>Zona</span>
            <strong>{company.location}</strong>
            <p>Atendimento sujeito a confirmação da localização e disponibilidade.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
