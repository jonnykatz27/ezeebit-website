import { forwardRef, memo, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * The shared parts every hero illustration is built from, so each page's
 * visual moves, floats, and swaps the same way as the others.
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * For values that count or fill rather than enter. EASE is near-instant at the
 * start and then crawls, which on a number reads as a jolt followed by a drift;
 * this moves evenly and settles.
 */
export const EASE_VALUE: [number, number, number, number] = [0.33, 1, 0.68, 1]

/** A floating white card with the soft, blue-tinted shadow every hero uses. */
export const CARD =
  'bg-white/95 backdrop-blur rounded-2xl border border-neutral-200/70 shadow-[0_18px_50px_-18px_rgba(0,46,92,0.28)]'

/** A floating Merchant Portal surface: the portal's 12px corners, with the hero's lift. */
export const PORTAL_CARD =
  'bg-white rounded-[12px] border border-neutral-200/70 shadow-[0_18px_50px_-18px_rgba(0,46,92,0.28)]'

/** A digital-asset mark in its white disc. */
export const COIN = 'rounded-full bg-white shadow-sm object-contain'

/** Small caps label at the top of a floating card. */
export const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400'

/** Content that is replaced in place: the old copy lifts away as the new one settles. */
export const SWAP = {
  // Opacity and transform only. Animating `filter` repaints the layer every
  // frame, and two of these run at once while the counters are also moving.
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.45, ease: EASE },
}

/** How a card first arrives, from a given side, after a short delay. */
export const arrive = (delay: number, from: 'up' | 'left' | 'right' = 'up') => ({
  initial: { opacity: 0, x: from === 'left' ? -24 : from === 'right' ? 24 : 0, y: from === 'up' ? 24 : 0 },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
})

export const money = (v: number, dp = 2) =>
  v.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })
export const rands = (v: number) => `R${money(v)}`

/**
 * Drives an illustration's story: a step counter that ticks every `ms`, but
 * only while the illustration is on screen and the tab is visible, and never
 * for anyone who prefers reduced motion.
 */
export function useHeroLoop(ms: number) {
  const still = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (still || !inView) return
    /*
     * Advance on a frame boundary rather than on an interval. An interval can
     * fire part-way through a frame, so the re-render it triggers lands on top
     * of the swap and counter animations it starts, which is where the hitch
     * came from. requestAnimationFrame also stops on its own in a hidden tab.
     */
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      if (now - last >= ms) {
        last = now
        setStep((s) => s + 1)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Coming back to the tab should not immediately fire the backlog
    const onVisibility = () => { if (!document.hidden) last = performance.now() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVisibility) }
  }, [still, inView, ms])

  return { ref, step, still }
}

/**
 * A fixed-size canvas that scales down to fit its column, so an illustration
 * keeps exactly the same composition from a phone to a wide screen.
 */
export const HeroStage = forwardRef<HTMLDivElement, { width?: number; height?: number; label: string; children: ReactNode }>(
  ({ width = 560, height = 500, label, children }, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = useState<number | null>(null)

    useEffect(() => {
      const el = innerRef.current
      if (!el) return
      const measure = () => setScale(el.clientWidth / width)
      measure()
      const ro = new ResizeObserver(measure)
      ro.observe(el)
      return () => ro.disconnect()
    }, [width])

    return (
      <div
        ref={(el) => {
          innerRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
        }}
        role="img"
        aria-label={label}
        className="relative w-full mx-auto select-none"
        style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        <div
          // [&_img]:!mx-0 undoes the site-wide phone rule that centres every image
          className="absolute top-0 left-0 origin-top-left transition-opacity duration-500 [&_img]:!mx-0"
          style={{
            width,
            height,
            // translateZ keeps the scaled canvas on its own compositor layer, so
            // the counters rewriting their text do not re-rasterise the whole
            // illustration at a fractional scale every frame.
            transform: `scale(${scale ?? 1}) translateZ(0)`,
            willChange: 'transform',
            opacity: scale ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
    )
  },
)
HeroStage.displayName = 'HeroStage'

/** Rings spreading out from a point, like a live signal, over a soft glow. */
export const Rings = ({ x, y, still, size = 460 }: { x: number; y: number; still: boolean; size?: number }) => (
  <div className="absolute" style={{ left: x, top: y }}>
    {[0, 1, 2].map((r) => (
      <motion.span
        key={r}
        className="absolute rounded-full border border-primary-300/50"
        style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
        initial={{ scale: 0.55, opacity: 0 }}
        animate={still ? { scale: 0.6 + r * 0.2, opacity: 0.5 - r * 0.12 } : { scale: [0.55, 1.15], opacity: [0, 0.7, 0] }}
        transition={still ? { duration: 0 } : { duration: 6, repeat: Infinity, delay: r * 2, ease: 'easeOut' }}
      />
    ))}
    <span className="absolute rounded-full bg-primary-300/30 blur-3xl" style={{ width: 360, height: 280, left: -180, top: -140 }} />
  </div>
)

/** A coin, or any small logo, bobbing gently in place. */
export const FloatingCoin = memo(({ src, x, y, delay, still, size = 44 }: { src: string; x: number; y: number; delay: number; still: boolean; size?: number }) => (
  <motion.img
    src={src}
    alt=""
    className={`absolute p-0.5 ${COIN} shadow-md`}
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={still ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -9, 0] }}
    transition={{
      opacity: { duration: 0.5, delay: 0.6 + delay },
      scale: { duration: 0.5, delay: 0.6 + delay },
      y: { duration: 4.5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay },
    }}
  />
))
FloatingCoin.displayName = 'FloatingCoin'

/** A figure that counts to its new value instead of jumping. */
export const Counter = ({ value, format, still, delay = 0 }: {
  value: number
  format: (v: number) => string
  still: boolean
  /** Lets a figure follow the thing that caused it to change. */
  delay?: number
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  // Rendered once; after that the text is driven directly, frame by frame
  const [initial] = useState(value)

  useEffect(() => {
    const from = prev.current
    prev.current = value
    if (!ref.current || from === value) return
    if (still) {
      ref.current.textContent = format(value)
      return
    }
    const controls = animate(from, value, {
      duration: 1.2,
      delay,
      ease: EASE_VALUE,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = format(v) },
    })
    return () => controls.stop()
  }, [value, format, still, delay])

  /*
   * The animating text is taken out of flow and a hidden copy of the target
   * value holds the width. Written straight into the flow, the figure relaid
   * out on every frame as its digits changed, and everything beside it — the
   * percentage badge, the wallet label — jittered along with it.
   */
  return (
    <span className="relative inline-block tabular-nums whitespace-nowrap align-baseline">
      <span aria-hidden className="invisible">{format(value)}</span>
      <span ref={ref} className="absolute inset-0">{format(initial)}</span>
    </span>
  )
}

/** A soft wash across a row whose value just changed. */
export const Flash = ({ on, id }: { on: boolean; id: number }) =>
  on ? (
    <motion.span
      key={id}
      className="absolute inset-0 rounded-xl bg-primary-500/10"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
    />
  ) : null

/** The pulsing green "Live" tag. */
export const LiveTag = ({ still, children = 'Live' }: { still: boolean; children?: ReactNode }) => (
  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-success-700 bg-success-50 rounded-full px-2 py-0.5">
    <span className="relative flex w-1.5 h-1.5">
      {!still && <span className="absolute inset-0 rounded-full bg-success-500 animate-ping" />}
      <span className="relative w-1.5 h-1.5 rounded-full bg-success-500" />
    </span>
    {children}
  </span>
)
