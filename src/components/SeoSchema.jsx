import { company, localAreas, services } from '../data/content'

export default function SeoSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    image: `${import.meta.env.BASE_URL}logo.jpg`,
    areaServed: localAreas.map((area) => area.name),
    telephone: `+${company.phoneLink}`,
    email: company.email,
    sameAs: [company.instagramUrl],
    url: 'https://bernardocsf.github.io/dema-clean/',
    serviceType: services.map((service) => service.title),
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Coimbra',
      addressCountry: 'PT',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
