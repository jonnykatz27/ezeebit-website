import { useState, useEffect, useRef, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'

/**
 * Each demo's own natural height at full width, used until it reports its own.
 * The iframe is sized from this rather than left to collapse, so a message
 * that never arrives cannot break the layout.
 */
type Flow = 'payin' | 'payout'

const DEMO_HEIGHT: Record<Flow, number> = { payin: 798, payout: 951 }

/** The label over a panel or device, with an action such as Restart on the right. */
const PanelLabel = ({ label, action }: { label: ReactNode; action?: ReactNode }) => (
  <div className="flex items-center justify-between gap-3 px-1 pb-2.5">
    <div className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</div>
    {action}
  </div>
)

/**
 * The Ezeebit ePOS photo, cleaned of the soft halo the original carried round
 * its edges and trimmed to the device, with the screen's edges in the image's
 * own pixels: below the status bar and above the navigation bar, so both stay
 * in the photo. The device is shown down to CROP, a little under the screen,
 * and fades out there.
 */
const EPOS = { src: '/tour/epos-device.webp', width: 783, height: 2030, screen: { left: 61, right: 715, top: 505, bottom: 1680 }, crop: 1804 }
const pct = (n: number, of: number) => `${(n / of) * 100}%`
const FADE = 'linear-gradient(to bottom, #000 94%, transparent)'

/**
 * A demo running on the ePOS's screen. The device takes its size from the
 * height its parent gives it, so it fits the same frame as the card demos.
 */
export const EposPanel = ({ label, action, children }: { label: ReactNode; action?: ReactNode; children: ReactNode }) => (
  <div className="h-full flex flex-col">
    <PanelLabel label={label} action={action} />
    <div className="flex-1 min-h-0 flex justify-center drop-shadow-[0_18px_24px_rgba(0,26,54,0.18)]">
      <div
        className="relative h-full max-w-full overflow-hidden [&_img]:!mx-0"
        style={{ aspectRatio: `${EPOS.width} / ${EPOS.crop}`, maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <img src={EPOS.src} alt="" width={EPOS.width} height={EPOS.height} className="block w-full h-auto" />
        <div
          className="absolute flex flex-col bg-black"
          style={{
            left: pct(EPOS.screen.left, EPOS.width),
            width: pct(EPOS.screen.right - EPOS.screen.left, EPOS.width),
            top: pct(EPOS.screen.top, EPOS.crop),
            height: pct(EPOS.screen.bottom - EPOS.screen.top, EPOS.crop),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
)

export const DemoPanel = ({ label, action, children, fixed = false }: {
  label: ReactNode
  action?: ReactNode
  children: ReactNode
  /** Held at a fixed height by its parent, with the content scrolling inside it. */
  fixed?: boolean
}) => (
  // No bezel: the label sits on the page and the screen is a bordered card under it
  <div className="h-full flex flex-col">
    <PanelLabel label={label} action={action} />
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
const FlowDemo = ({ src, flow, title, label, fill = false, fixed = false, device, onRestart }: {
  src: string
  flow: Flow
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
   * 'epos' runs the demo on the Ezeebit ePOS's screen instead of in a card,
   * filling the screen and scrolling inside it as the device would.
   */
  device?: 'epos'
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

  const restart = (
    <button
      type="button"
      onClick={() => (onRestart ? onRestart() : setRun((r) => r + 1))}
      // The negative margin keeps the label where it was while the padding gives a thumb-sized target
      className="flex items-center gap-1.5 -my-2 py-2 -mr-1.5 pr-1.5 pl-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-500 hover:text-primary-700"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Restart
    </button>
  )

  if (device === 'epos')
    return (
      <EposPanel label={label} action={restart}>
        <iframe ref={frame} key={run} src={versioned} title={title} loading="lazy" className="block w-full flex-1 min-h-0 bg-neutral-100 border-0 !mx-0" />
      </EposPanel>
    )

  return (
    <DemoPanel fixed={fixed} label={label} action={restart}>
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
