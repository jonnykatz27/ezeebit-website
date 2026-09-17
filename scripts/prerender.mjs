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
  'watch-channel',
  'superspar-royal-ascot',
  'luxity',
  'ritual',
]

const blogSlugs = [
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
  'twitter:title',
  'twitter:description',
  'twitter:image',
]
const SUPERSEDED_META_PROPS = [
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:type',
  'og:site_name',
]

function stripSupersededHead(html) {
  let out = html
    // Anything a previous pre-render injected.
    .replace(/^[ \t]*<[^>]*\sdata-rh="true"[^>]*>.*$\n?/gim, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/^[ \t]*<link[^>]*rel="canonical"[^>]*>\s*$\n?/gim, '')

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
const { render } = await import(toAbs('dist/server/entry-server.js'))

// ---------------------------------------------------------------------------
// Pre-render each route
// ---------------------------------------------------------------------------
let successCount = 0
let failCount = 0

for (const url of routes) {
  try {
    const { html: appHtml, helmet } = render(url)

    // entry-server.tsx keeps its own copy of the route table, so a route added
    // to App.tsx but not there falls through to the catch-all and renders the
    // 404 page. That still writes a file and still looks like a success, so
    // catch it here rather than shipping a 404 at a real URL.
    if (url !== '/404' && /rel="canonical"[^>]*\/404"/.test(helmet?.link?.toString() ?? '')) {
      throw new Error(
        'rendered the 404 page — add this route to src/entry-server.tsx as well as src/App.tsx'
      )
    }

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
        // The template already had its superseded tags stripped, so this is
        // the only title/description/og set on the page.
        page = page.replace('</head>', () => `  ${headTags}\n  </head>`)
      }
    }

    // Determine output path
    const outRelPath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`
    const outPath = toAbs(outRelPath)

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, page, 'utf-8')

    console.log(`  ✓  ${url}`)
    successCount++
  } catch (err) {
    console.error(`  ✗  ${url}: ${err.message}`)
    failCount++
  }
}

console.log(`\nPre-render complete: ${successCount} succeeded, ${failCount} failed.`)
if (failCount > 0) process.exit(1)
