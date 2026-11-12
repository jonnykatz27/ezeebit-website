import { useEffect, useRef, useState } from 'react'

const SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void }
  }
}

/**
 * Calendly's inline scheduler. Its script is loaded once, the first time a
 * page with a calendar opens, and the widget is started by hand rather than
 * by the script's own scan of the page, so it also appears when the page is
 * reached by a link inside the site. Until it has loaded, and if it never
 * does, the box shows a plain link to the same calendar.
 */
const CalendlyEmbed = ({ url, title }: { url: string; title: string }) => {
  const box = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    let cancelled = false
    const start = () => {
      if (cancelled || !window.Calendly || el.querySelector('iframe')) return
      window.Calendly.initInlineWidget({ url, parentElement: el })
      const frame = el.querySelector('iframe')
      if (frame) {
        frame.title = title
        frame.addEventListener('load', () => setReady(true), { once: true })
      }
    }
    if (window.Calendly) {
      start()
      return
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT
      script.async = true
      document.head.appendChild(script)
    }
    script.addEventListener('load', start)
    return () => {
      cancelled = true
      script?.removeEventListener('load', start)
    }
  }, [url, title])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="size-6 rounded-full border-2 border-neutral-300 border-t-primary-500 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          <p className="text-sm text-neutral-600">
            Loading the calendar. If it does not appear,{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-600 hover:underline">open it in a new tab</a>.
          </p>
        </div>
      )}
      {/* Calendly asks for at least 320px across and sizes its frame to this box */}
      <div ref={box} className="relative min-w-[320px] h-[1040px] sm:h-[760px] lg:h-[720px]" />
    </div>
  )
}

export default CalendlyEmbed
