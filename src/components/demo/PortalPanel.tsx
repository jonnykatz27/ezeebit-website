import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { DemoPanel } from './FlowDemo'
import { FitToFrame } from '../portal/PortalUI'

/**
 * A page of the Merchant Portal in the tour's frame: laid out as the desktop
 * page where there is room and as the portal's phone layout where there is
 * not, then scaled to fit. Each layout has a fixed design size, so the scale
 * holds still while the page changes. A restart starts it afresh.
 */
export default function PortalPanel({ wide, phone, restart = false, children }: {
  wide: [number, number]
  phone: [number, number]
  restart?: boolean
  children: (compact: boolean) => ReactNode
}) {
  const [run, setRun] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const compact = width < 600
  const [design, height] = compact ? phone : wide
  return (
    <DemoPanel
      fixed
      label="Merchant Portal"
      action={
        restart ? (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="flex items-center gap-1.5 -my-2 py-2 -mr-1.5 pr-1.5 pl-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-500 hover:text-primary-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>
        ) : undefined
      }
    >
      <div ref={box} className="flex-1 min-h-0 overflow-hidden rounded-[20px]">
        {width > 0 && (
          <FitToFrame design={design} height={height} background="bg-[#f8f9fb]">
            <Fragment key={`${run}-${compact}`}>{children(compact)}</Fragment>
          </FitToFrame>
        )}
      </div>
    </DemoPanel>
  )
}
