import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { NextUIProvider } from '@nextui-org/react'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NextUIProvider>
          {/* Every animation, not just the hero illustrations, honours a reader's reduced-motion setting */}
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </NextUIProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)