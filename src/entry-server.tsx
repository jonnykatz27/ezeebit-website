import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Eagerly import all pages so Suspense fallbacks don't swallow content during SSR
import Home from './pages/Home'
import InStore from './pages/InStore'
import Online from './pages/Online'
import OTC from './pages/OTC'
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

export function render(url: string) {
  const helmetContext: Record<string, any> = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/in-store" element={<InStore />} />
            <Route path="/online" element={<Online />} />
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
          <Footer />
        </div>
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
