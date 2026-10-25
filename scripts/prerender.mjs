/**
 * Static pre-render script.
 *
 * Run after both the client and SSR builds:
 *   npm run build && npm run build:ssr && npm run prerender
 *   (or simply: npm run build:all)
 *
 * For each route it:
 *   1. Calls the SSR render() function to get the app HTML + Helmet head tags
 *   2. Injects them into dist/index.html
 *   3. Writes the result to dist/<route>/index.html
 *
 * This gives crawlers full HTML on every page without a runtime Node server.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const toAbs = (p) => path.resolve(root, p)

// ---------------------------------------------------------------------------
// All routes to pre-render
// ---------------------------------------------------------------------------
const staticRoutes = [
  '/',
  '/in-store',
  '/online',
  '/platforms',
  '/payouts',
  '/wallets',
  '/otc',
  '/pricing',
  '/developers',
  '/resources',
  '/resources/about',
  '/resources/faq',
  '/resources/legal',
  '/resources/blog',
  '/resources/user-manual',
  '/resources/where-to-spend',
  '/signup',
  '/contact',
  '/ezeebit-resources',
  '/careers',
  '/404',
]

const storeSlugs = [
  'sunbet',
  'scoin',
  'istore',
  'al-capone-premium',
  'court-order',
  'hydraulics',
  'le-creuset',
  'skins',
  'tintswalo-lodge',
  'swest-kicks',
  'soul-gallery',
  'subwear',
  'cultish',
  'diesel',
  'goodman-gallery',
  'story',
  'thobela-cars',
  'amiri',
  'yawa-africa',
  'bhh',
  'watch-channel',
  'superspar-royal-ascot',
  'luxity',
  'ritual',
]

const blogSlugs = [
  'crypto-deposits-igaming-sunbet',
  'most-comprehensive-crypto-payment-gateway-africa',
  'capital-flow-management-regulations',
  'ezeebit-raises-r35-million',
  'pundi-x-rebrand',
]

const routes = [
  ...staticRoutes,
  ...storeSlugs.map((s) => `/resources/stores/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
]

// ---------------------------------------------------------------------------
// Load template and SSR bundle
// ---------------------------------------------------------------------------
// The homepage is written back to dist/index.html, which is also our template
// source. Once that happens the <!--ssr-outlet--> marker is gone, so a second
// run without an intervening `npm run build` would stamp the homepage body into
// every route. Keep a pristine copy alongside it and prefer that on re-runs.
const templatePath = toAbs('dist/index.html')
// Cached outside dist/ so it is never deployed with the site.
const pristinePath = toAbs('node_modules/.cache/prerender-template.html')

function loadTemplate() {
  const built = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, 'utf-8')
    : null

  if (built?.includes('<!--ssr-outlet-->')) {
    fs.mkdirSync(path.dirname(pristinePath), { recursive: true })
    fs.writeFileSync(pristinePath, built, 'utf-8')
    return built
  }

  if (fs.existsSync(pristinePath)) {
    return fs.readFileSync(pristinePath, 'utf-8')
  }

  throw new Error(
    'dist/index.html has no <!--ssr-outlet--> marker and no pristine copy was ' +
      'cached. Run `npm run build` before pre-rendering.'
  )
}

// Head tags SEO.tsx re-emits through Helmet. Leaving the template's own copies
// in place would ship two of each, so strip them before injecting.
const SUPERSEDED_META_NAMES = [
  'description',
  'keywords',
  'robots',
  'googlebot',
  'twitter:card',
  'twitter:site',
  'twitter:title',
  'twitter:description',
  'twitter:image',
]
const SUPERSEDED_META_PROPS = [
  'og:title',
  'og:description',
  'og:image',
  'og:image:width',
  'og:image:height',
  'og:url',
  'og:type',
  'og:site_name',
  'og:locale',
  'article:published_time',
  'article:modified_time',
]

function stripSupersededHead(html) {
  let out = html
    // Anything a previous pre-render injected.
    .replace(/^[ \t]*<[^>]*\sdata-rh="true"[^>]*>.*$\n?/gim, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/^[ \t]*<link[^>]*rel="canonical"[^>]*>\s*$\n?/gim, '')
    .replace(/^[ \t]*<link[^>]*rel="alternate"[^>]*>\s*$\n?/gim, '')

  for (const name of SUPERSEDED_META_NAMES) {
    out = out.replace(
      new RegExp(`^[ \\t]*<meta[^>]*name="${name}"[^>]*>\\s*$\\n?`, 'gim'),
      ''
    )
  }
  for (const prop of SUPERSEDED_META_PROPS) {
    out = out.replace(
      new RegExp(`^[ \\t]*<meta[^>]*property="${prop}"[^>]*>\\s*$\\n?`, 'gim'),
      ''
    )
  }
  return out
}

const template = stripSupersededHead(loadTemplate())

// Dynamic import of the SSR bundle built by `vite build --ssr`
const { render } = await import(toAbs('.ssr/entry-server.js'))

// ---------------------------------------------------------------------------
// Pre-render each route
// ---------------------------------------------------------------------------
let successCount = 0
let failCount = 0

for (const url of routes) {
  try {
    const { html: appHtml, helmet } = render(url)

    // Start from the client-built template
    let page = template

    // Inject rendered app HTML
    if (!page.includes('<!--ssr-outlet-->')) {
      throw new Error('template is missing the <!--ssr-outlet--> marker')
    }
    page = page.replace('<!--ssr-outlet-->', () => appHtml)

    // Inject Helmet head tags (title, meta, canonical, og, etc.)
    if (helmet) {
      const headTags = [
        helmet.title?.toString() ?? '',
        helmet.priority?.toString() ?? '',
        helmet.meta?.toString() ?? '',
        helmet.link?.toString() ?? '',
        helmet.script?.toString() ?? '',
      ]
        .filter(Boolean)
        .join('\n    ')

      if (headTags) {
        // Helmet emits React's hrefLang; the HTML attribute is hreflang.
        const normalizedHead = headTags.replace(/\bhrefLang=/g, 'hreflang=')
        // The template already had its superseded tags stripped, so this is
        // the only title/description/og set on the page.
        page = page.replace('</head>', () => `  ${normalizedHead}\n  </head>`)
      }
    }

    // Determine output path
    const outRelPath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`
    const outPath = toAbs(outRelPath)

    const problems = []
    if (!page.includes('<h1')) problems.push('missing h1')
    else {
      // Decorative motion (rings, inactive tab panels) may still use opacity 0.
      // Fail only when the heading itself sits inside that style.
      const h1At = page.search(/<h1\b/)
      const before = page.slice(Math.max(0, h1At - 1200), h1At)
      const styleAt = before.lastIndexOf('opacity:0')
      if (styleAt !== -1) {
        const tail = before.slice(styleAt)
        const opens = (tail.match(/<(?:div|section|span|li|p|article|header|main)\b/g) || []).length
        const closes = (tail.match(/<\/(?:div|section|span|li|p|article|header|main)>/g) || []).length
        if (opens > closes) problems.push('h1 inside opacity:0')
      }
    }
    const jsonLd = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (jsonLd.length !== 1) problems.push(`${jsonLd.length} JSON-LD blocks`)
    else if (jsonLd[0][1].includes('&quot;') || jsonLd[0][1].includes('&#')) problems.push('escaped JSON-LD')
    else {
      try {
        const data = JSON.parse(jsonLd[0][1])
        const types = (data['@graph'] || []).map((node) => node['@type'])
        if (!types.includes('Organization') || !types.includes('WebSite')) {
          problems.push(`graph missing Organization/WebSite (${types.join(', ')})`)
        }
      } catch (parseErr) {
        problems.push(`invalid JSON-LD (${parseErr.message})`)
      }
    }
    // Helmet writes `<title data-rh="true">`, which does not contain the substring `<title>`.
    if (!/<title[\s>]/.test(page) || !page.includes('rel="canonical"') || !page.includes('name="description"')) {
      problems.push('missing title, description or canonical')
    }
    if (problems.length) {
      throw new Error(problems.join('; '))
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, page, 'utf-8')
    if (url === '/404') {
      fs.copyFileSync(outPath, toAbs('dist/404.html'))
    }

    console.log(`  ✓  ${url}`)
    successCount++
  } catch (err) {
    console.error(`  ✗  ${url}: ${err.message}`)
    failCount++
  }
}

console.log(`\nPre-render complete: ${successCount} succeeded, ${failCount} failed.`)
if (failCount > 0) process.exit(1)
