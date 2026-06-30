import { motion } from 'framer-motion'
import {
  ArrowRight, ShieldCheck, Banknote, Clock, UserCheck,
  TrendingUp, Lock
} from 'lucide-react'
import SEO from '../components/SEO'

const OTC = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Deep liquidity",
      description: "Execute large crypto-to-fiat trades in a single transaction without moving the market against you."
    },
    {
      icon: <Banknote className="w-6 h-6" />,
      title: "Tight, locked pricing",
      description: "Get a firm quote upfront with competitive spreads. The rate you accept is the rate you settle at."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Same-day settlement",
      description: "Funds land in your bank account in ZAR, KES, or NGN, often within hours of trade confirmation."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Dedicated dealer",
      description: "Work one-on-one with a named OTC dealer who handles your trade from quote to settlement."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Compliant by design",
      description: "Full KYC/AML onboarding and reporting, so every trade stands up to scrutiny."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure custody",
      description: "Institutional-grade handling of assets throughout the trade lifecycle."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Request a quote",
      description: "Tell your dealer the asset, amount, and direction. We respond with a firm, all-in price."
    },
    {
      number: "02",
      title: "Lock the rate",
      description: "Accept the quote and the price is locked. No slippage, no surprises between agreement and settlement."
    },
    {
      number: "03",
      title: "Settle and receive",
      description: "Send the crypto (or the fiat) and we settle the other side to your nominated account, same day."
    }
  ]

  return (
    <>
      <SEO
        title="Crypto OTC Desk for Large Trades"
        description="Ezeebit's OTC desk handles large-volume crypto-to-fiat trades with deep liquidity, firm locked pricing, and same-day settlement in ZAR, KES, or NGN. Work with a dedicated dealer for Bitcoin, Ethereum, USDT, USDC and more."
        keywords="crypto OTC desk, over the counter crypto trading, large crypto trades, bulk bitcoin sale, crypto to fiat settlement, OTC bitcoin, institutional crypto desk, ZAR crypto settlement, African crypto OTC, USDT OTC, stablecoin OTC"
        canonicalUrl="/otc"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Ezeebit OTC Desk",
          "url": "https://ezeebit.com/otc",
          "description": "Over-the-counter desk for large-volume crypto-to-fiat trades with deep liquidity, firm pricing, and same-day settlement.",
          "serviceType": "Over-the-counter cryptocurrency trading",
          "areaServed": ["ZA", "KE", "NG"],
          "currenciesAccepted": ["ZAR", "KES", "NGN", "USDT", "USDC", "BTC", "ETH"],
          "provider": {
            "@type": "Organization",
            "name": "Ezeebit",
            "url": "https://ezeebit.com"
          }
        })}
      </script>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl text-center lg:text-left"
              >
                <h1 className="text-5xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                  <span itemProp="name">Move <span className="text-gradient">large volumes</span> of crypto</span>
                </h1>
                <p className="text-xl text-neutral-600 mb-8" itemProp="description">
                  Buy or sell crypto at scale without moving the market. Get a firm quote, lock the rate,
                  and settle the same day in ZAR, KES, or NGN, with a dedicated dealer handling every trade.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                  <a
                    href="https://merchant.ezeebit.com/#/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center"
                  >
                    Sign Up
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Quote card mockup */}
                <div className="relative max-w-sm mx-auto">
                  <div className="card p-6 shadow-2xl bg-white">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-medium text-neutral-500">OTC Quote</span>
                      <span className="flex items-center text-xs font-medium text-green-600">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Rate locked
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">You sell</p>
                        <p className="text-2xl font-bold text-neutral-900">300,000 USDT</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">You receive</p>
                        <p className="text-2xl font-bold text-neutral-900">R 5,550,000</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Settlement</span>
                      <span className="font-medium text-neutral-900">Same day &middot; ZAR</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                A desk built for size
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                When the amounts get large, exchanges fall short. Our OTC desk gives you pricing,
                liquidity, and settlement designed for serious volume.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-500">
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

        {/* How It Works */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                How it works
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Three steps from quote to settled funds, with a dealer alongside you the whole way.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="card p-8 h-full">
                    <div className="text-4xl font-display font-bold text-gradient mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Ready to trade at scale?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Speak to our OTC desk about your next trade. We'll get you onboarded and quoting in no time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://merchant.ezeebit.com/#/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Sign Up
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default OTC
