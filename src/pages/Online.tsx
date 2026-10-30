import { useState } from 'react'
import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  Plug, Zap, Shield, BarChart3,
  CheckCircle, ArrowRight, ExternalLink
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import OnlineHeroVisual from '../components/hero/OnlineHeroVisual'
import DarkBackdrop from '../components/DarkBackdrop'

const Online = () => {
  const [activeTab, setActiveTab] = useState('shopify')

  const platforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      logo: '/shopify-icon.png',
      description: 'One-click installation with full theme integration',
      features: ['Seamless checkout', 'Real-time rates', 'Mobile optimized', 'Multi-currency'],
      installTime: '2 minutes'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      logo: '/woocommerce-logo.png',
      description: 'WordPress plugin with advanced customization options',
      features: ['Custom checkout', 'Order management', 'Tax integration', 'Analytics'],
      installTime: '5 minutes'
    },
    {
      id: 'magento',
      name: 'Magento',
      logo: '/magento-logo.png',
      description: 'Enterprise-grade extension for complex stores',
      features: ['Multi-store support', 'B2B features', 'Advanced reporting', 'API access'],
      installTime: '10 minutes'
    }
  ]

  const features = [
    {
      icon: <Plug className="w-6 h-6" />,
      title: "Zero-code integration",
      description: "Install our plugins in minutes without any technical knowledge required"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time processing",
      description: "Instant transaction confirmation with live exchange rates and fees"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure checkout",
      description: "End-to-end encrypted payment flow ensuring maximum transaction security"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced analytics",
      description: "Detailed insights into crypto payment trends and customer behavior"
    }
  ]

  return (
    <>
      <SEO
        title="Online payments for Shopify, WooCommerce and Magento"
        description="Online stablecoin and crypto checkout. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        canonicalUrl="/online"
        crumbs={[{ name: 'Online payments', path: '/online' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
      <PageHero
        title="Stablecoin checkout"
        accent="for your online store."
        description="Add stablecoin and crypto payments to your store with zero-code plugins, or build on our API. Customers pay with Bitcoin, Ethereum, stablecoins, and more, and you're settled in ZAR, KES, NGN or USD. Ezeebit is live in South Africa, Kenya and Nigeria, with more African markets to follow."
        actions={
          <>
          <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
            Install a plugin
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <Link to="/developers" className={HERO_SECONDARY}>
            View the docs
          </Link>
          </>
        }
        visual={<OnlineHeroVisual />}
        itemProps
      />

      {/* Platform Integration */}
      <section className="section-padding bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Seamless platform integration
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto px-4">
              Install our plugins on your favorite e-commerce platform in minutes. No coding required.
            </p>
          </motion.div>

          {/* Platform Tabs */}
          <div className="flex justify-center mb-6 md:mb-8 px-4">
            <div className="flex bg-neutral-100 rounded-lg p-1 w-full max-w-md md:max-w-none md:w-auto overflow-x-auto">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-md font-medium transition-all text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                    activeTab === platform.id
                      ? 'bg-white text-primary-500 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Details */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 md:p-8 max-w-4xl mx-auto"
          >
            {platforms.map((platform) => (
              activeTab === platform.id && (
                <div key={platform.id} className="relative">
                  {platform.id !== 'shopify' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl md:text-3xl font-bold text-neutral-900 mb-2">Coming Soon</div>
                        <div className="text-sm md:text-base text-neutral-600">This integration is currently in development</div>
                      </div>
                    </div>
                  )}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center ${
                    platform.id !== 'shopify' ? 'filter blur-sm opacity-50' : ''
                  }`}>
                  <div>
                    <div className="flex items-center mb-4 justify-center lg:justify-start">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-4">
                        <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900">{platform.name}</h3>
                        <p className="text-xs md:text-sm text-neutral-500">Install time: {platform.installTime}</p>
                      </div>
                    </div>
                    <img
                      src="/online-checkout.webp"
                      alt={`${platform.name} integration`}
                      className="w-full max-w-sm mx-auto my-4 lg:hidden"
                    />
                    <p className="text-sm md:text-base text-neutral-600 mb-4 md:mb-6 text-center lg:text-left">{platform.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      {platform.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                          <span className="text-xs md:text-sm text-neutral-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      {platform.id === 'shopify' ? (
                        <a
                          href="https://merchant.ezeebit.com/#/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center justify-center w-full sm:w-auto"
                        >
                          Get Started
                        </a>
                      ) : (
                        <button className="btn-primary flex items-center justify-center opacity-50 cursor-not-allowed w-full sm:w-auto" disabled>
                          Coming Soon
                        </button>
                      )}
                      {platform.id === 'shopify' ? (
                        <a
                          href="https://youtu.be/nsju8wPu5oY?si=QTJfvOeNf8nV4b-l"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline flex items-center justify-center w-full sm:w-auto"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Guide
                        </a>
                      ) : (
                        <button className="btn-outline flex items-center justify-center w-full sm:w-auto opacity-50 cursor-not-allowed" disabled>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Guide
                        </button>
                      )}
                    </div>
                  </div>
                  <img
                    src="/online-checkout.webp"
                    alt={`${platform.name} integration`}
                    className="hidden lg:block lg:w-[120%] lg:max-w-none lg:-ml-16"
                  />
                  </div>
                </div>
              )
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Everything you need for online payments
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our comprehensive solution includes all the tools and features you need to accept stablecoin and crypto payments online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-neutral-950 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="pb-16 lg:pb-24 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card p-8 md:p-10 max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-6 text-center md:text-left"
          >
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-2">
                Running a platform or a gateway?
              </h2>
              <p className="text-neutral-600">
                Take deposits in crypto and pay users out in stablecoin, without holding either. We handle
                the compliance and the volatility. Sunbet already takes its deposits this way.
              </p>
            </div>
            <Link to="/platforms" className="btn-primary inline-flex items-center justify-center whitespace-nowrap">
              Ezeebit for platforms
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Start accepting stablecoin and crypto payments today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              Install our plugin in minutes and start accepting stablecoin and cryptocurrency payments from customers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                Install Plugin Now
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <Link to="/developers" className="border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </>
  )
}

export default Online