import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { preloadRoute } from './routePages'

export async function render(url: string) {
  // Resolve the route's module before renderToString. React.lazy would
  // otherwise suspend, and renderToString would emit the fallback.
  await preloadRoute(url)
  const helmetContext: Record<string, any> = {}

  // Same providers and App tree as src/main.tsx, so hydrateRoot matches.
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
