import { Helmet } from 'react-helmet-async'
import JsonLd from './JsonLd'
import {
  absoluteUrl,
  breadcrumbNode,
  canonicalUrl,
  organizationNode,
  websiteNode,
  type Crumb,
} from '../lib/schema'

interface SEOProps {
  title: string
  description: string
  /** Site path, beginning with /. Homepage is "/". */
  canonicalUrl: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  /** Use `title` exactly, without appending "| Ezeebit". */
  exactTitle?: boolean
  crumbs?: Crumb[]
  extraNodes?: object[]
  publishedTime?: string
  modifiedTime?: string
}

function clampDescription(description: string) {
  const clean = description.replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  const sliced = clean.slice(0, 157)
  const boundary = sliced.lastIndexOf(' ')
  return `${(boundary > 80 ? sliced.slice(0, boundary) : sliced).trim()}…`
}

const SEO = ({
  title,
  description,
  canonicalUrl: path,
  ogImage = '/og-default.png',
  ogType = 'website',
  noindex = false,
  exactTitle = false,
  crumbs,
  extraNodes,
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const fullTitle = exactTitle || title.startsWith('Ezeebit') ? title : `${title} | Ezeebit`
  const summary = clampDescription(description)
  const url = canonicalUrl(path)
  const image = absoluteUrl(ogImage)

  const graph: object[] = [organizationNode, websiteNode]
  if (crumbs && crumbs.length > 0) graph.push(breadcrumbNode(crumbs))
  if (extraNodes) graph.push(...extraNodes)

  return (
    <>
      <Helmet>
        <html lang="en-ZA" />
        <title>{fullTitle}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en-ZA" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        {ogImage === '/og-default.png' && <meta property="og:image:width" content="1200" />}
        {ogImage === '/og-default.png' && <meta property="og:image:height" content="630" />}
        <meta property="og:url" content={url} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="Ezeebit" />
        <meta property="og:locale" content="en_ZA" />
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ezeebit" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />

        <meta
          name="robots"
          content={noindex
            ? 'noindex, follow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
        />
      </Helmet>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />
    </>
  )
}

export default SEO
