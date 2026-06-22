import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, MapPin,
  CheckCircle, Smartphone, QrCode, CreditCard
} from 'lucide-react'
import { stores } from '../lib/stores'
import { storeDetailsMap } from '../lib/storeDetails'
import SEO from '../components/SEO'

const StoreDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const store = stores.find(s => s.slug === slug)
  const storeDetails = slug ? storeDetailsMap[slug] : null

  if (!store) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Store Not Found</h1>
          <Link to="/resources/where-to-spend" className="btn-primary">
            Back to Stores
          </Link>
        </div>
      </motion.div>
    )
  }

  const paymentSteps = [
    'Select cryptocurrency payment at checkout',
    'Scan the QR code with your crypto wallet',
    'Confirm the transaction in your wallet app',
    'Receive instant confirmation and receipt'
  ]

  return (
    <>
      <SEO
        title={`${store.name} — Pay with Crypto`}
        description={`${store.excerpt} Pay with Bitcoin, Ethereum, or stablecoins at ${store.name} using Ezeebit.`}
        canonicalUrl={`/resources/stores/${store.slug}`}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20"
      >
      {/* Back Navigation */}
      <section className="bg-white border-b border-neutral-100">
        <div className="container-custom py-4">
          <Link 
            to="/resources/where-to-spend" 
            className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Where to Spend Crypto
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="mb-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {store.category}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                {store.name}
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                {store.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={store.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center"
                >
                  Visit Store
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
                <Link to="/resources/where-to-spend" className="btn-secondary flex items-center justify-center">
                  Browse More Stores
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={store.image}
                  alt={`${store.name} store`}
                  className={`w-full ${store.detailImageHeight ?? 'h-96'} object-cover rounded-xl shadow-lg`}
                  style={store.imagePosition ? { objectPosition: store.imagePosition } : undefined}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                About {store.name}
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-600">
                <p className="mb-6">
                  {store.about}
                </p>
                <p className={store.onlineOnly ? '' : 'mb-6'}>
                  {store.partnerCopy ?? `By partnering with Ezeebit, ${store.name} offers customers the convenience and security of stablecoin and cryptocurrency payments. This forward-thinking approach reflects their commitment to embracing new technologies that enhance the shopping experience.`}
                </p>
                {!store.onlineOnly && (
                  <p>
                    Whether you're shopping online or visiting in person, you can enjoy seamless
                    stablecoin and crypto payments with instant confirmations and transparent pricing. Experience
                    the future of retail with {store.name} and Ezeebit.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Pay Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              How to pay with Ezeebit
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Paying with cryptocurrency at {store.name} is simple, secure, and fast. 
              Follow these easy steps to complete your purchase.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paymentSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                  {index === 0 && <CreditCard className="w-8 h-8" />}
                  {index === 1 && <QrCode className="w-8 h-8" />}
                  {index === 2 && <Smartphone className="w-8 h-8" />}
                  {index === 3 && <CheckCircle className="w-8 h-8" />}
                </div>
                <div className="text-sm font-semibold text-primary-500 mb-2">STEP {index + 1}</div>
                <p className="text-neutral-700">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      {!store.onlineOnly && <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Visit {store.name}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {storeDetails && storeDetails.locations.length > 1
                ? `Find us at our ${storeDetails.locations.length} locations and enjoy the seamless cryptocurrency payment experience.`
                : 'Find us at our convenient location and enjoy the seamless cryptocurrency payment experience.'
              }
            </p>
          </motion.div>

          {storeDetails ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                {storeDetails.locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <MapPin className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-900 mb-3">
                          {location.name}
                        </h3>
                        <p className="text-neutral-600 mb-3 leading-relaxed">
                          {location.address}<br />
                          {location.city}<br />
                          South Africa
                        </p>
                        {location.phone && (
                          <p className="text-sm text-gray-500">
                            Phone: {location.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-neutral-600">
              <p>Visit our website for location information.</p>
            </div>
          )}

        </div>
      </section>}

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={store.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-500 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
        >
          Visit Store
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </motion.div>
    </>
  )
}

export default StoreDetail