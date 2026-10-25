import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.tsx'
import './index.css'

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

const rootEl = document.getElementById('root')!

// Dev serves the empty shell (the ssr-outlet comment). Production HTML is
// pre-rendered, so hydrate it instead of replacing it with createRoot.
if (rootEl.hasChildNodes() && !rootEl.innerHTML.includes('ssr-outlet')) {
  hydrateRoot(rootEl, tree)
} else {
  createRoot(rootEl).render(tree)
}
