import { useEffect, useRef } from 'react'

/**
 * The hero's grid, on a canvas: faint blue lines that fade out where the copy
 * sits, with a few short tracers of light running along them now and then.
 *
 * `side` keeps the left of the hero clear for a headline set to the left, as
 * on most pages; `centre` keeps the middle clear for a centred headline, as on
 * the homepage. Speed is time-based, so it looks the same on 60 Hz and 120 Hz
 * screens. It pauses when the hero is off-screen or the tab is hidden, and
 * shows the still grid alone to anyone who has asked for reduced motion.
 */

const CELL = 32 // grid square, px
const COLOUR = '61,154,237' // primary-400
const GRID_ALPHA = 0.14 // grid line strength
const MAX_TRACERS = 5 // most on screen at once
const SPAWNS_PER_SECOND = 1.6

type Tracer = { horizontal: boolean; line: number; pos: number; speed: number; len: number }

const HeroTracers = ({ clear = 'side' }: { clear?: 'side' | 'centre' }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const grid = document.createElement('canvas')
    const gctx = grid.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let tracers: Tracer[] = []
    let raf: number | null = null
    let last = 0
    let visible = true

    // How strongly the grid shows at x: none where the copy sits, full away from it.
    // Nothing before the canvas has a width, which would otherwise divide by zero.
    const strength =
      clear === 'centre'
        ? (x: number) => (Math.abs(x - w / 2) - w * 0.16) / (w * 0.22)
        : (x: number) => (x - w * 0.1) / (w * 0.45)
    const fade = (x: number) => (w > 0 ? Math.min(1, Math.max(0, strength(x))) : 0)

    function drawGrid() {
      gctx.clearRect(0, 0, w, h)
      gctx.lineWidth = 1
      for (let x = 0; x <= w; x += CELL) {
        gctx.strokeStyle = `rgba(${COLOUR},${GRID_ALPHA * fade(x)})`
        gctx.beginPath()
        gctx.moveTo(x + 0.5, 0)
        gctx.lineTo(x + 0.5, h)
        gctx.stroke()
      }
      // Rows follow the same fade, sampled along their length
      const g = gctx.createLinearGradient(0, 0, w, 0)
      for (let i = 0; i <= 20; i++) g.addColorStop(i / 20, `rgba(${COLOUR},${GRID_ALPHA * fade((i / 20) * w)})`)
      gctx.strokeStyle = g
      for (let y = 0; y <= h; y += CELL) {
        gctx.beginPath()
        gctx.moveTo(0, y + 0.5)
        gctx.lineTo(w, y + 0.5)
        gctx.stroke()
      }
    }

    function paintStatic() {
      ctx!.clearRect(0, 0, w, h)
      ctx!.drawImage(grid, 0, 0, w, h)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      // Not laid out yet: the observer calls again once it is
      if (!w || !h) return
      for (const [c, cx] of [[canvas!, ctx!], [grid, gctx]] as const) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
        cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      drawGrid()
      paintStatic()
    }

    // A column the grid shows on: the right-hand side, or either side of a centred headline
    function column() {
      const cols = Math.floor(w / CELL)
      for (let tries = 0; tries < 12; tries++) {
        const c = Math.round(Math.random() * cols) * CELL
        if (fade(c) > 0.4) return c
      }
      return cols * CELL
    }

    function spawn() {
      const horizontal = Math.random() < 0.6
      tracers.push(
        horizontal
          ? { horizontal, line: Math.ceil(Math.random() * Math.floor(h / CELL)) * CELL, pos: -80, speed: 70 + Math.random() * 60, len: 70 }
          : { horizontal, line: column(), pos: -80, speed: 50 + Math.random() * 50, len: 60 },
      )
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      paintStatic()

      if (tracers.length < MAX_TRACERS && Math.random() < SPAWNS_PER_SECOND * dt) spawn()
      tracers = tracers.filter((t) => (t.pos += t.speed * dt) < (t.horizontal ? w : h) + t.len)

      ctx!.lineWidth = 1.5
      for (const t of tracers) {
        const x1 = t.horizontal ? t.pos : t.line + 0.5
        const y1 = t.horizontal ? t.line + 0.5 : t.pos
        const x0 = t.horizontal ? t.pos - t.len : x1
        const y0 = t.horizontal ? y1 : t.pos - t.len
        const f = fade(x1)
        if (f <= 0) continue
        const g = ctx!.createLinearGradient(x0, y0, x1, y1)
        g.addColorStop(0, `rgba(${COLOUR},0)`)
        g.addColorStop(1, `rgba(${COLOUR},${0.85 * f})`)
        ctx!.strokeStyle = g
        ctx!.beginPath()
        ctx!.moveTo(x0, y0)
        ctx!.lineTo(x1, y1)
        ctx!.stroke()
      }
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (raf || reduce || !visible || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [clear])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full pointer-events-none" />
}

export default HeroTracers
