import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'

const InStore = lazy(() => import('./pages/InStore'))
const Online = lazy(() => import('./pages/Online'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Developers = lazy(() => import('./pages/Developers'))
const Resources = lazy(() => import('./pages/Resources'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Legal = lazy(() => import('./pages/Legal'))
const Blog = lazy(() => import('./pages/Blog'))
const UserManual = lazy(() => import('./pages/UserManual'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Contact = lazy(() => import('./pages/Contact'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const EzeebitResources = lazy(() => import('./pages/EzeebitResources'))
const WhereToSpend = lazy(() => import('./pages/WhereToSpend'))
const StoreDetail = lazy(() => import('./pages/StoreDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/in-store" element={<InStore />} />
            <Route path="/online" element={<Online />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App