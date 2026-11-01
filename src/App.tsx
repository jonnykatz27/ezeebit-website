import { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import { hasDarkHero } from './lib/darkHero'
import {
  Home, InStore, Online, OTC, Payouts, Platforms, Wallets, Pricing, Developers,
  Resources, About, FAQ, Legal, Blog, UserManual, SignUp, Contact, BlogPost,
  EzeebitResources, WhereToSpend, StoreDetail, Careers, NotFound,
} from './routePages'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  const { pathname } = useLocation()

  return (
    // Near Black behind a dark-hero page, so its fade-in doesn't flash white first
    <div className={`min-h-screen ${hasDarkHero(pathname) ? 'bg-neutral-950' : 'bg-white'}`}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <ScrollToTop />
      <main id="main">
      <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="/in-store" element={<Suspense fallback={<PageLoader />}><InStore /></Suspense>} />
            <Route path="/online" element={<Suspense fallback={<PageLoader />}><Online /></Suspense>} />
            <Route path="/platforms" element={<Suspense fallback={<PageLoader />}><Platforms /></Suspense>} />
            <Route path="/payouts" element={<Suspense fallback={<PageLoader />}><Payouts /></Suspense>} />
            <Route path="/wallets" element={<Suspense fallback={<PageLoader />}><Wallets /></Suspense>} />
            <Route path="/otc" element={<Suspense fallback={<PageLoader />}><OTC /></Suspense>} />
            <Route path="/pricing" element={<Suspense fallback={<PageLoader />}><Pricing /></Suspense>} />
            <Route path="/developers" element={<Suspense fallback={<PageLoader />}><Developers /></Suspense>} />
            <Route path="/resources" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
            <Route path="/resources/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
            <Route path="/resources/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
            <Route path="/resources/legal" element={<Suspense fallback={<PageLoader />}><Legal /></Suspense>} />
            <Route path="/resources/blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
            <Route path="/resources/user-manual" element={<Suspense fallback={<PageLoader />}><UserManual /></Suspense>} />
            <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPost /></Suspense>} />
            <Route path="/signup" element={<Suspense fallback={<PageLoader />}><SignUp /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
            <Route path="/ezeebit-resources" element={<Suspense fallback={<PageLoader />}><EzeebitResources /></Suspense>} />
            <Route path="/resources/where-to-spend" element={<Suspense fallback={<PageLoader />}><WhereToSpend /></Suspense>} />
            <Route path="/resources/stores/:slug" element={<Suspense fallback={<PageLoader />}><StoreDetail /></Suspense>} />
            <Route path="/careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
      </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App