import { preloadAllRoutes, preloadRoute } from '../routePages'

/**
 * Fetches page chunks before they are needed, so moving between pages is
 * instant rather than waiting on a download after the click.
 *
 * - A link the reader points at, focuses, or touches starts its page's
 *   download at once, which is usually done before the click lands.
 * - Once the first page has loaded and the browser is idle, every other
 *   page is fetched in the background, unless the reader has asked to save
 *   data or is on a 2G connection.
 */
export function startPrefetching() {
  const onIntent = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link || link.target === '_blank' || link.origin !== window.location.origin) return
    if (link.pathname === window.location.pathname) return
    preloadRoute(link.pathname).catch(() => undefined)
  }
  document.addEventListener('pointerover', onIntent, { passive: true })
  document.addEventListener('focusin', onIntent, { passive: true })
  document.addEventListener('touchstart', onIntent, { passive: true })

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return

  const idle = (fn: () => void) =>
    'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 5000 }) : setTimeout(fn, 2000)
  const whenLoaded = () => idle(() => { preloadAllRoutes() })
  if (document.readyState === 'complete') whenLoaded()
  else window.addEventListener('load', whenLoaded, { once: true })
}
