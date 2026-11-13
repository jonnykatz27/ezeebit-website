import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState, type ForwardedRef } from 'react'
import { motion as fmMotion } from 'framer-motion'

// useLayoutEffect warns during prerender. The server bundle never paints,
// so the effect can be the plain one there; the browser bundle keeps the
// layout effect so the fade starts before the first painted frame.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Pre-rendered HTML paints as it arrives, before any JavaScript, so a first
 * visit shows the whole page at once instead of waiting for the bundle to
 * download, hydrate, and fade every block in.
 *
 * The first render (server and hydration) uses initial={false}, so the DOM
 * matches and React hydrates cleanly. Once hydrated, each entrance element
 * looks at where it is: one already on screen (or scrolled past) stays as it
 * is, since the reader can see it; one still below the fold remounts with its
 * real initial value, so Framer Motion fades it in when it scrolls into view,
 * as on an ordinary visit. Client-side route changes and menus mount after
 * hydration, so they animate on their first render.
 */
let appHydrated = false

function isEntrance(initial: unknown): boolean {
  if (initial == null || initial === false) return false
  if (initial === 'hidden') return true
  if (typeof initial !== 'object') return false
  const value = initial as Record<string, unknown>
  if (typeof value.opacity === 'number' && value.opacity < 1) return true
  if ('x' in value || 'y' in value) return true
  if (typeof value.scale === 'number' && value.scale < 1) return true
  return false
}

/**
 * A route shell that only fades opacity would hide the prerendered h1 until
 * JavaScript hydrates and the fade finishes. That text is the LCP element, so
 * those shells stay painted. A fixed overlay (the phone-menu scrim) still fades.
 */
function keepPainted(props: { initial?: unknown; className?: unknown }): boolean {
  const initial = props.initial
  if (!initial || typeof initial !== 'object' || Array.isArray(initial)) return false
  const keys = Object.keys(initial as object)
  if (!(keys.length === 1 && (initial as { opacity?: unknown }).opacity === 0)) return false
  const className = typeof props.className === 'string' ? props.className : ''
  return !className.includes('fixed')
}

/** Hands a node to both the wrapper's own ref and the caller's. */
function useMergedRef(outer: ForwardedRef<Element>) {
  const own = useRef<Element | null>(null)
  const merged = useCallback(
    (node: Element | null) => {
      own.current = node
      if (typeof outer === 'function') outer(node)
      else if (outer) outer.current = node
    },
    [outer],
  )
  return [own, merged] as const
}

function wrap(Component: any) {
  return forwardRef(function SafeMotion(props: any, ref: ForwardedRef<Element>) {
    if (keepPainted(props)) {
      return <Component ref={ref} {...props} initial={false} />
    }
    const entrance = isEntrance(props.initial)
    // 'ssr': rendered as the pre-rendered HTML; 'shown': on screen when the page
    // hydrated, so it stays put; 'live': animates as on any client render
    const [phase, setPhase] = useState<'ssr' | 'shown' | 'live'>(() =>
      entrance && !appHydrated ? 'ssr' : 'live'
    )
    const [own, merged] = useMergedRef(ref)

    useIsomorphicLayoutEffect(() => {
      appHydrated = true
      if (phase !== 'ssr') return
      const top = own.current?.getBoundingClientRect().top
      setPhase(top !== undefined && top < window.innerHeight ? 'shown' : 'live')
    }, [phase])

    if (!entrance) {
      return <Component ref={ref} {...props} />
    }

    // A new key remounts the motion element so Framer Motion reads `initial`
    // on mount. Changing the prop on an existing instance does not.
    if (phase === 'live') {
      return <Component ref={merged} {...props} key="live" />
    }

    // Same key as the hydrated element, so what the reader can already see
    // is never remounted, hidden, or moved
    return <Component ref={merged} {...props} key="ssr" initial={false} />
  })
}

const cache = new Map<PropertyKey, unknown>()

export const motion = new Proxy(fmMotion, {
  get(target, prop) {
    const original = (target as any)[prop]
    if (typeof prop === 'symbol' || original == null) return original
    if (!cache.has(prop)) cache.set(prop, wrap(original))
    return cache.get(prop)
  },
}) as typeof fmMotion
