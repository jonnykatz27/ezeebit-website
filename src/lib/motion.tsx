import { forwardRef, useEffect, useState } from 'react'
import { motion as fmMotion } from 'framer-motion'

/**
 * Entrance animations must not ship as opacity:0 in pre-rendered HTML.
 * Before the app has hydrated, motion components render in their final
 * visible state. After hydration, client-side route changes still animate.
 */
let appHydrated = false

function useSafeInitial(initial: unknown) {
  const [ready, setReady] = useState(appHydrated)
  useEffect(() => {
    appHydrated = true
    setReady(true)
  }, [])
  return ready ? initial : false
}

function wrap(Component: any) {
  return forwardRef(function SafeMotion(props: any, ref) {
    const initial = useSafeInitial(props.initial)
    return <Component ref={ref} {...props} initial={initial} />
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
