import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { hasDarkHero } from './lib/darkHero'
import Home from './pages/Home'
import InStore from './pages/InStore'
import Online from './pages/Online'
import OTC from './pages/OTC'
import Payouts from './pages/Payouts'
import Platforms from './pages/Platforms'
import Wallets from './pages/Wallets'
import Pricing from './pages/Pricing'
import Developers from './pages/Developers'
import Resources from './pages/Resources'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Legal from './pages/Legal'
import Blog from './pages/Blog'
import UserManual from './pages/UserManual'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import BlogPost from './pages/BlogPost'
import EzeebitResources from './pages/EzeebitResources'
import WhereToSpend from './pages/WhereToSpend'
import StoreDetail from './pages/StoreDetail'
import Careers from './pages/Careers'
import NotFound from './pages/NotFound'

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
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/in-store" element={<InStore />} />
            <Route path="/online" element={<Online />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/otc" element={<OTC />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/about" element={<About />} />
            <Route path="/resources/faq" element={<FAQ />} />
            <Route path="/resources/legal" element={<Legal />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/user-manual" element={<UserManual />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ezeebit-resources" element={<EzeebitResources />} />
            <Route path="/resources/where-to-spend" element={<WhereToSpend />} />
            <Route path="/resources/stores/:slug" element={<StoreDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App