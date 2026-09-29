import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

/**
 * Each demo's own natural height at full width, used until it reports its own.
 * The iframe is sized from this rather than left to collapse, so a message
 * that never arrives cannot break the layout.
 */
const DEMO_HEIGHT: Record<'payin' | 'payout', number> = { payin: 798, payout: 951 }

export const DemoPanel = ({ label, action, children }: {
  label: string
  action?: React.ReactNode
  children: React.ReactNode
}) => (
  <div className="h-full flex flex-col rounded-[28px] bg-white p-2 ring-1 ring-neutral-200/80 shadow-[0_24px_60px_-24px_rgba(0,46,92,0.35)]">
    <div className="flex items-center justify-between gap-3 px-3 pt-1.5 pb-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">{label}</p>
      {action}
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
)

/**
 * One of the standalone demos in public/demos, embedded in its panel. The demo
 * posts its own height as the reader moves through it, so the frame follows
 * whichever screen is showing.
 */
const FlowDemo = ({ src, flow, title, label, fill = false }: {
  src: string
  flow: 'payin' | 'payout'
  title: string
  label: string
  /**
   * True where the panel is given a height by its layout and the frame should
   * fill it, as in the home page's flow grid. Left false the panel takes its
   * height from the frame instead, which is what a demo standing on its own
   * in a section needs.
   */
  fill?: boolean
}) => {
  const [height, setHeight] = useState(DEMO_HEIGHT[flow])
  // Bumping this remounts the iframe, which starts the flow again from the top
  const [run, setRun] = useState(0)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return
      if (e.data?.type !== 'ezeebit:resize' || e.data.flow !== flow) return
      // A hidden tab reports zero; keep the last real height for when it shows
      if (typeof e.data.height === 'number' && e.data.height > 200) setHeight(e.data.height)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [flow])

  return (
    <DemoPanel
      label={label}
      action={
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-600 hover:text-primary-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart
        </button>
      }
    >
      <iframe
        key={run}
        src={src}
        title={title}
        loading="lazy"
        // Height is set outright, not just as a minimum, so the frame always has
        // real dimensions whether or not the demo reports back.
        height={height}
        style={{ height }}
        className={`block w-full rounded-[20px] bg-[#F2F2F2] border-0 transition-[height] duration-300 !mx-0 ${
          fill ? 'flex-1' : ''
        }`}
      />
    </DemoPanel>
  )
}

export default FlowDemo
