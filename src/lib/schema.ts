export const SITE_URL = 'https://ezeebit.com'

/** One market statement. Use this wording wherever the live markets are named. */
export const LIVE_MARKETS =
  'Ezeebit is live in South Africa, Kenya and Nigeria, with more markets to follow.'
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export type Crumb = { name: string; path: string }

export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return `${SITE_URL}/`
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/+$/, '')
}

/** The countries Ezeebit is live in, for the organisation and for each service. */
export const AREA_SERVED = [
  { '@type': 'Country', name: 'South Africa' },
  { '@type': 'Country', name: 'Kenya' },
  { '@type': 'Country', name: 'Nigeria' },
]

export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Ezeebit',
  legalName: 'Ezee Solutions Group (Pty) Ltd',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo-square.png`,
    contentUrl: `${SITE_URL}/logo-square.png`,
    width: 512,
    height: 512,
    caption: 'Ezeebit',
  },
  image: `${SITE_URL}/logo-square.png`,
  alternateName: ['Ezee Solutions Group', 'Ezeebit Pay'],
  description:
    `Ezeebit provides crypto and stablecoin payment infrastructure for merchants and platforms: in-store ePOS and QR payments, online checkout, platform pay-ins, stablecoin payouts, wallets, and an OTC desk. Ezeebit is regulated by the FSCA as a Crypto Asset Service Provider, FSP No. 53664. ${LIVE_MARKETS} Settlement is the same day on every plan, in stablecoin or in local currency (ZAR, KES, NGN or USD).`,
  slogan: 'Secure. Speedy. Ezee.',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
  },
  areaServed: AREA_SERVED,
  knowsAbout: [
    'Stablecoin payments',
    'Cryptocurrency payments',
    'Crypto payment gateway',
    'Stablecoin payouts',
    'Crypto point of sale',
    'OTC crypto trading',
  ],
  // The group's other companies, as the footer lists them
  subOrganization: [
    {
      '@type': 'Organization',
      name: 'Ezee Solutions Group (Kenya) Limited',
      address: { '@type': 'PostalAddress', addressCountry: 'KE' },
    },
    {
      '@type': 'Organization',
      name: 'Ezeebit Canada Ltd.',
      address: { '@type': 'PostalAddress', addressCountry: 'CA' },
    },
  ],
  founder: [
    { '@type': 'Person', name: 'Daniel Katz' },
    { '@type': 'Person', name: 'Jonathan Katz' },
    { '@type': 'Person', name: 'David Katz' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+27-21-879-5074',
      email: 'support@ezeebit.com',
      contactType: 'customer support',
      availableLanguage: ['English'],
      areaServed: ['ZA', 'KE', 'NG'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${SITE_URL}/book-a-call`,
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/ezeebit/',
    'https://x.com/ezeebit',
    'https://www.instagram.com/ezeebit/',
    'https://www.facebook.com/ezeebit.official',
  ],
}

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Ezeebit',
  url: `${SITE_URL}/`,
  inLanguage: 'en-ZA',
  publisher: { '@id': ORG_ID },
  description: `Crypto and stablecoin payment infrastructure for merchants and platforms. ${LIVE_MARKETS}`,
}

export function breadcrumbNode(crumbs: Crumb[]) {
  const items = [
    { name: 'Home', path: '/' },
    ...crumbs,
  ]
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(crumbs[crumbs.length - 1]?.path || '/')}#breadcrumb`,
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  }
}

/** The page itself, tied to the site, the organisation, and its breadcrumb. */
export function webPageNode(page: {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage'
  hasCrumbs: boolean
}) {
  const url = canonicalUrl(page.path)
  return {
    '@type': page.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...(page.hasCrumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  }
}

/** A product page's service: what Ezeebit provides there, and where. */
export function serviceNode(service: { path: string; name: string; serviceType: string; description: string }) {
  const url = canonicalUrl(service.path)
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
  }
}
