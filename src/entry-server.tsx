import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'

export function render(url: string) {
  const helmetContext: Record<string, any> = {}

  // Same providers and App tree as src/main.tsx, so hydrateRoot matches.
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
