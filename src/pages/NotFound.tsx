import { Link } from 'react-router-dom'
import { Home, ArrowRight, HelpCircle, CreditCard, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore our crypto payment solutions for African businesses."
        canonicalUrl="/404"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-primary-500 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Page not found
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              We couldn't find the page you're looking for. It may have been moved or doesn't exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-500 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              You might be looking for:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/pricing"
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <CreditCard className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-neutral-900 group-hover:text-primary-500">
                    Pricing
                  </div>
                  <div className="text-sm text-neutral-600">
                    View our transparent rates
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-primary-500" />
              </Link>

              <Link
                to="/resources/faq"
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <HelpCircle className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-neutral-900 group-hover:text-primary-500">
                    FAQ
                  </div>
                  <div className="text-sm text-neutral-600">
                    Find answers to common questions
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-primary-500" />
              </Link>

              <Link
                to="/in-store"
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 flex items-center justify-center font-bold">
                  🏪
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900 group-hover:text-primary-500">
                    In-Store Payments
                  </div>
                  <div className="text-sm text-neutral-600">
                    Accept crypto at your physical store
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-primary-500" />
              </Link>

              <Link
                to="/online"
                className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 flex items-center justify-center font-bold">
                  🌐
                </div>
                <div className="text-left">
                  <div className="font-semibold text-neutral-900 group-hover:text-primary-500">
                    Online Payments
                  </div>
                  <div className="text-sm text-neutral-600">
                    Integrate crypto checkout online
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-primary-500" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound
