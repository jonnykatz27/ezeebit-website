import { useState, useEffect, useRef, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'

/**
 * Each demo's own natural height at full width, used until it reports its own.
 * The iframe is sized from this rather than left to collapse, so a message
 * that never arrives cannot break the layout.
 */
const DEMO_HEIGHT: Record<'payin' | 'payout', number> = { payin: 798, payout: 951 }

export const DemoPanel = ({ label, action, children, fixed = false }: {
  label: ReactNode
  action?: ReactNode
  children: ReactNode
  /** Held at a fixed height by its parent, with the content scrolling inside it. */
  fixed?: boolean
}) => (
  // No bezel: the label sits on the page and the screen is a bordered card under it
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between gap-3 px-1 pb-2.5">
      <div className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</div>
      {action}
    </div>
    {/* min-h-0 lets content scroll inside a panel held at a fixed height */}
    <div
      className={`flex-1 flex flex-col rounded-[20px] border border-neutral-200 bg-white overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,26,54,0.35)] ${fixed ? 'min-h-0' : ''}`}
    >
      {children}
    </div>
  </div>
)

/**
 * One of the standalone demos in public/demos, embedded in its panel. The demo
 * posts its own height as the reader moves through it, so the frame follows
 * whichever screen is showing.
 */
const FlowDemo = ({ src, flow, title, label, fill = false, fixed = false, onRestart }: {
  src: string
  flow: 'payin' | 'payout'
  title: string
  label: ReactNode
  /**
   * True where the panel is given a height by its layout and the frame should
   * fill it, as in the home page's flow grid. Left false the panel takes its
   * height from the frame instead, which is what a demo standing on its own
   * in a section needs. The grid only stretches the panel from lg up, so below
   * that the frame keeps its own height; filling an unstretched panel
   * collapsed it to the browser's default 150px on phones.
   */
  fill?: boolean
  /**
   * True where the panel is held at a fixed height, as in the home page's
   * product tour. The frame fills it at every width and ignores the heights
   * the demo reports, so moving between screens never resizes it; a screen
   * taller than the frame scrolls inside it, as it would on a phone.
   */
  fixed?: boolean
  /**
   * Where the demo follows a screen of the page's own, as the home page's
   * pay-ins do, restarting goes back to that screen instead of the demo's
   * first, whether from the panel's button or the demo's own.
   */
  onRestart?: () => void
}) => {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(DEMO_HEIGHT[flow])
  // public/demos ships unhashed, so without this a browser can keep showing an
  // old build of the demo. The stamp only moves when a demo file changes.
  const versioned = `${src}${src.includes('?') ? '&' : '?'}v=${__DEMO_VERSION__}`
  // Bumping this remounts the iframe, which starts the flow again from the top
  const [run, setRun] = useState(0)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return
      // Several copies of a demo can be on one page, so only this frame's restart counts
      if (e.data?.type === 'ezeebit:again' && e.source === frame.current?.contentWindow) onRestart?.()
      if (e.data?.type !== 'ezeebit:resize' || e.data.flow !== flow) return
      // A hidden tab reports zero; keep the last real height for when it shows
      if (typeof e.data.height === 'number' && e.data.height > 200) setHeight(e.data.height)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [flow, onRestart])

  return (
    <DemoPanel
      fixed={fixed}
      label={label}
      action={
        <button
          type="button"
          onClick={() => (onRestart ? onRestart() : setRun((r) => r + 1))}
          // The negative margin keeps the label where it was while the padding gives a thumb-sized target
          className="flex items-center gap-1.5 -my-2 py-2 -mr-1.5 pr-1.5 pl-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-500 hover:text-primary-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart
        </button>
      }
    >
      <iframe
        ref={frame}
        key={run}
        src={versioned}
        title={title}
        loading="lazy"
        // Height is set outright, not just as a minimum, so the frame always has
        // real dimensions whether or not the demo reports back.
        height={fixed ? undefined : height}
        style={fixed ? undefined : { height }}
        className={`block w-full rounded-[20px] bg-neutral-100 border-0 !mx-0 ${
          fixed ? 'flex-1 min-h-0' : `transition-[height] duration-300 ${fill ? 'lg:flex-1' : ''}`
        }`}
      />
    </DemoPanel>
  )
}

export default FlowDemo
