import { useEffect, useRef, useState } from 'react'

const CALENDLY = 'https://calendly.com'

/** Room held for the calendar before it reports its own height, so the page does not jump far when it does. */
const RESERVED = 720

/**
 * A Calendly booking page, set into the site so it reads as part of it: no
 * frame around it and no scrolling inside it. The page tells its parent how
 * tall its content is, and the frame takes exactly that height, growing and
 * shrinking as the visitor moves from the calendar to the details step.
 *
 * While `show` is false the frame is already loading, out of sight, so that
 * Calendly's files and connections are in place by the time it is wanted.
 * Changing `url` (to one carrying the visitor's answers) loads it again in
 * the same frame. The address has to name this site (embed_domain), or
 * Calendly does not report its height. If it never reports, the frame shows
 * anyway, at a fixed height, scrolling inside.
 */
const CalendlyEmbed = ({ url, show, title, onScheduled }: { url: string; show: boolean; title: string; onScheduled?: () => void }) => {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [fallback, setFallback] = useState(false)
  const [slow, setSlow] = useState(false)
  const scheduled = useRef(onScheduled)
  scheduled.current = onScheduled

  // Load (or reload) the page whenever the address changes
  useEffect(() => {
    const el = frame.current
    if (!el) return
    setHeight(null)
    setFallback(false)
    setSlow(false)
    el.src = `${url}${url.includes('?') ? '&' : '?'}embed_domain=${encodeURIComponent(window.location.host)}&embed_type=Inline`
  }, [url])

  useEffect(() => {
    const el = frame.current
    if (!el) return
    let first = true
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== CALENDLY || e.source !== el.contentWindow) return
      if (e.data?.event === 'calendly.event_scheduled') scheduled.current?.()
      if (e.data?.event !== 'calendly.page_height') return
      const reported = parseInt(e.data.payload?.height, 10)
      // It reports a few pixels while it is still starting up
      if (!(reported > 200)) return
      setHeight(reported)
      // A later step can be much shorter than the one before. If the top of it has scrolled out of view, bring it back.
      if (!first && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' })
      first = false
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Once it is wanted: offer another way in after a while, and show the frame regardless after longer
  useEffect(() => {
    if (!show || height !== null) return
    const slowTimer = window.setTimeout(() => setSlow(true), 5000)
    const timer = window.setTimeout(() => setFallback(true), 20000)
    return () => {
      window.clearTimeout(slowTimer)
      window.clearTimeout(timer)
    }
  }, [show, height, url])

  const ready = height !== null
  const scrolls = !ready && fallback

  return (
    <div className={show ? 'relative' : 'absolute left-0 top-0 h-0 w-full overflow-hidden'} style={show && !ready ? { minHeight: RESERVED } : undefined} aria-hidden={!show}>
      {show && !ready && !fallback && (
        <div className="absolute inset-x-0 top-0" role="status">
          <p className="mb-4 text-center text-sm text-neutral-600">
            Loading available times.
            {slow && (
              <>
                {' '}This can take a few seconds. You can also{' '}
                <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-600 hover:underline">open the calendar in a new tab</a>.
              </>
            )}
          </p>
          {/* A placeholder in the shape of the calendar: the month, then the days */}
          <div className="mx-auto max-w-[640px] rounded-2xl border border-neutral-200 p-6 sm:p-8 animate-pulse motion-reduce:animate-none" aria-hidden="true">
            <div className="mx-auto mb-6 h-6 w-40 rounded-md bg-neutral-100" />
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square rounded-full bg-neutral-100" />
              ))}
            </div>
          </div>
        </div>
      )}
      <iframe
        ref={frame}
        title={title}
        tabIndex={show ? undefined : -1}
        scrolling={scrolls ? 'auto' : 'no'}
        // The top of the calendar stops below the site's fixed header when it is scrolled back into view
        className={`block w-full scroll-mt-24 border-0 transition-opacity duration-300 ${show && (ready || scrolls) ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: ready ? height : RESERVED }}
      />
      {show && scrolls && (
        <p className="mt-4 text-center text-sm text-neutral-600">
          Trouble with the calendar?{' '}
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-600 hover:underline">Open it in a new tab</a>
        </p>
      )}
    </div>
  )
}

export default CalendlyEmbed
