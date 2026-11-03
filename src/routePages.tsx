import { lazy, type ComponentType } from 'react'

type Mod = { default: ComponentType }
type Loader = () => Promise<Mod>

export type RoutePage = (() => JSX.Element) & { preload: () => Promise<Mod> }

/**
 * Code-split a page for the client bundle, but render it synchronously once
 * its module has loaded. SSR and hydration both call preload() before paint,
 * so the first render matches the prerendered HTML instead of a Suspense
 * fallback. Later client navigations suspend until that chunk arrives.
 */
export function lazyPage(loader: Loader): RoutePage {
  let loaded: ComponentType | null = null
  let pending: Promise<Mod> | null = null
  const load = () => {
    pending ??= loader().then((mod) => {
      loaded = mod.default
      return mod
    })
    return pending
  }
  const Lazy = lazy(load)
  function Page() {
    if (loaded) {
      const Ready = loaded
      return <Ready />
    }
    return <Lazy />
  }
  Page.preload = load
  return Page as RoutePage
}

export const Home = lazyPage(() => import('./pages/Home'))
export const InStore = lazyPage(() => import('./pages/InStore'))
export const Online = lazyPage(() => import('./pages/Online'))
export const OTC = lazyPage(() => import('./pages/OTC'))
export const Payouts = lazyPage(() => import('./pages/Payouts'))
export const Platforms = lazyPage(() => import('./pages/Platforms'))
export const Wallets = lazyPage(() => import('./pages/Wallets'))
export const Pricing = lazyPage(() => import('./pages/Pricing'))
export const Developers = lazyPage(() => import('./pages/Developers'))
export const Resources = lazyPage(() => import('./pages/Resources'))
export const About = lazyPage(() => import('./pages/About'))
export const FAQ = lazyPage(() => import('./pages/FAQ'))
export const Legal = lazyPage(() => import('./pages/Legal'))
export const Blog = lazyPage(() => import('./pages/Blog'))
export const UserManual = lazyPage(() => import('./pages/UserManual'))
export const SignUp = lazyPage(() => import('./pages/SignUp'))
export const Contact = lazyPage(() => import('./pages/Contact'))
export const BlogPost = lazyPage(() => import('./pages/BlogPost'))
export const EzeebitResources = lazyPage(() => import('./pages/EzeebitResources'))
export const WhereToSpend = lazyPage(() => import('./pages/WhereToSpend'))
export const StoreDetail = lazyPage(() => import('./pages/StoreDetail'))
export const Careers = lazyPage(() => import('./pages/Careers'))
export const NotFound = lazyPage(() => import('./pages/NotFound'))

const exact: Record<string, RoutePage> = {
  '/': Home,
  '/in-store': InStore,
  '/online': Online,
  '/platforms': Platforms,
  '/payouts': Payouts,
  '/wallets': Wallets,
  '/otc': OTC,
  '/pricing': Pricing,
  '/developers': Developers,
  '/resources': Resources,
  '/resources/about': About,
  '/resources/faq': FAQ,
  '/resources/legal': Legal,
  '/resources/blog': Blog,
  '/resources/user-manual': UserManual,
  '/signup': SignUp,
  '/contact': Contact,
  '/ezeebit-resources': EzeebitResources,
  '/resources/where-to-spend': WhereToSpend,
  '/careers': Careers,
  '/404': NotFound,
}

export function preloadRoute(url: string) {
  const path = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  if (path.startsWith('/blog/')) return BlogPost.preload()
  if (path.startsWith('/resources/stores/')) return StoreDetail.preload()
  return (exact[path] ?? NotFound).preload()
}
