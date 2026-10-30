export const SITE_URL = 'https://ezeebit.com'

/** One market statement. Use this wording wherever the live markets are named. */
export const LIVE_MARKETS =
  'Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow.'
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
  description:
    `Ezeebit provides FSCA-regulated stablecoin and cryptocurrency payment infrastructure for merchants across Africa, including in-store ePOS, online checkout, payouts and wallets. ${LIVE_MARKETS} Stablecoin settlement is the same day on every plan. Local-currency settlement, in ZAR, KES, NGN or USD, is the next business day.`,
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
  },
  areaServed: {
    '@type': 'Continent',
    name: 'Africa',
  },
  founder: [
    { '@type': 'Person', name: 'Daniel Katz' },
    { '@type': 'Person', name: 'Jonathan Katz' },
    { '@type': 'Person', name: 'David Katz' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+27-21-879-5074',
    email: 'support@ezeebit.com',
    contactType: 'customer support',
    availableLanguage: ['English'],
    areaServed: 'ZA',
  },
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
  description: `Stablecoin and crypto payments for merchants across Africa. ${LIVE_MARKETS}`,
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
