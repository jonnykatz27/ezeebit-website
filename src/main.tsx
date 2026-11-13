import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'
import { preloadRoute } from './routePages'
import { startPrefetching } from './lib/prefetch'
import './index.css'

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      {/*
        Navigations run as transitions, so while the next page's chunk loads
        the current page stays on screen instead of the full-screen loader.
      */}
      <BrowserRouter future={{ v7_startTransition: true }}>
        {/* Every animation, not just the hero illustrations, honours a reader's reduced-motion setting */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

const rootEl = document.getElementById('root')!

async function boot() {
  // Load this URL's page chunk before the first paint so hydration matches
  // the prerendered markup instead of showing the Suspense fallback.
  await preloadRoute(window.location.pathname)
  // Dev serves the empty shell (the ssr-outlet comment). Production HTML is
  // pre-rendered, so hydrate it instead of replacing it with createRoot.
  if (rootEl!.hasChildNodes() && !rootEl!.innerHTML.includes('ssr-outlet')) {
    hydrateRoot(rootEl!, tree)
  } else {
    createRoot(rootEl!).render(tree)
  }
  startPrefetching()
}

boot()
