import { company, faqs, localAreas, services } from '../data/content'

export default function SeoSchema() {
  const baseUrl = 'https://bernardocsf.github.io/dema-clean/'
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}#business`,
        name: company.name,
        image: `${baseUrl}logo.jpg`,
        url: baseUrl,
        areaServed: localAreas.map((area) => area.name),
        telephone: `+${company.phoneLink}`,
        email: company.email,
        sameAs: [company.instagramUrl],
        serviceType: services.map((service) => service.title),
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Coimbra',
          addressCountry: 'PT',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: company.name,
        inLanguage: 'pt-PT',
        publisher: {
          '@id': `${baseUrl}#business`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
