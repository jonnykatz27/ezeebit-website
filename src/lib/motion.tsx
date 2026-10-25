import { forwardRef, useEffect, useLayoutEffect, useState } from 'react'
import { motion as fmMotion } from 'framer-motion'

// useLayoutEffect warns during prerender. The server bundle never paints,
// so the effect can be the plain one there; the browser bundle keeps the
// layout effect so the fade starts before the first painted frame.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Pre-rendered HTML has to stay visible for crawlers that never run
 * JavaScript. A real browser runs the inline script in index.html, which
 * adds `js` to <html> before first paint, and the matching CSS hides
 * [data-entrance] so there is no flash of the finished page.
 *
 * The first render (server and hydration) uses initial={false}, so the DOM
 * matches and React hydrates cleanly. After hydration, entrance components
 * remount with their real initial value and Framer Motion plays the same
 * fade-in as an ordinary visit, including whileInView. Client-side route
 * changes and menus mount after that, so they animate on their first render.
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

function wrap(Component: any) {
  return forwardRef(function SafeMotion(props: any, ref) {
    const entrance = isEntrance(props.initial)
    const [phase, setPhase] = useState<'ssr' | 'live'>(() =>
      entrance && !appHydrated ? 'ssr' : 'live'
    )

    useIsomorphicLayoutEffect(() => {
      appHydrated = true
      if (phase === 'ssr') setPhase('live')
    }, [phase])

    // A new key after hydration remounts the motion element so Framer Motion
    // reads `initial` on mount. Changing the prop on an existing instance does not.
    if (!entrance) {
      return <Component ref={ref} {...props} />
    }

    if (phase === 'live') {
      return <Component ref={ref} {...props} key="live" />
    }

    return <Component ref={ref} {...props} key="ssr" initial={false} data-entrance="" />
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
