import { motion } from '../lib/motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ShieldCheck, Banknote, Clock, UserCheck,
  TrendingUp, Lock
} from 'lucide-react'
import SEO from '../components/SEO'
import PageHero, { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'
import OTCHeroVisual from '../components/hero/OTCHeroVisual'

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
      description: "Funds land in your bank account in ZAR, KES, NGN or USD, often within hours of trade confirmation."
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
        title="OTC desk for large trades"
        description="Large crypto-to-fiat trades with firm pricing and same-day settlement in ZAR, KES, NGN or USD. A dealer works the trade with you."
        canonicalUrl="/otc"
        crumbs={[{ name: 'OTC desk', path: '/otc' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden -mt-20"
      >
        {/* Hero Section */}
        <PageHero
          title="Move large volumes"
          accent="of crypto."
          description="Buy or sell crypto at scale without moving the market. Get a firm quote, lock the rate, and settle the same day in ZAR, KES, NGN or USD, with a dedicated dealer handling every trade."
          actions={
            <>
            <a href="https://merchant.ezeebit.com/#/signup" target="_blank" rel="noopener noreferrer" className={HERO_PRIMARY}>
              Get started free
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <Link to="/contact" className={HERO_SECONDARY}>
              Talk to the desk
            </Link>
            </>
          }
          visual={<OTCHeroVisual />}
          itemProps
        />

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
