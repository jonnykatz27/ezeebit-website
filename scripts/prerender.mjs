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
const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8')

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

    // Start from the client-built template
    let page = template

    // Inject rendered app HTML
    page = page.replace('<!--ssr-outlet-->', appHtml)

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
        // Remove the generic <title> already in the template to avoid duplicates
        page = page.replace(/<title>[^<]*<\/title>/, '')
        // Inject before </head>
        page = page.replace('</head>', `  ${headTags}\n  </head>`)
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
