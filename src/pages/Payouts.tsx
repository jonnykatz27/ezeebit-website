import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Send, Globe, Clock, ShieldCheck,
  Webhook, Link2
} from 'lucide-react'
import SEO from '../components/SEO'

const Payouts = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Settled in minutes, not days",
      description: "Payouts clear on-chain around the clock. No cut-off times, no waiting for the next banking day, no weekend delays."
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "No wallet addresses to collect",
      description: "You send a link, not a transfer. Your customer chooses their asset and network and enters their own address, so a mistyped address is never your liability."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pays anyone, anywhere",
      description: "Reach customers without a local bank account or across a border. A wallet is the only thing your recipient needs."
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "Funded from your fiat balance",
      description: "We reserve the fiat the moment the order is created, so the amount you owe is fixed before your customer ever opens the link."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Screened and compliant",
      description: "Every recipient address is screened before funds move. FSCA-regulated as a CASP, with Travel Rule and FIC obligations handled for you."
    },
    {
      icon: <Webhook className="w-6 h-6" />,
      title: "Signed webhooks on every change",
      description: "Each status change is posted to your endpoint with an RSA signature, so your ledger reconciles itself without polling."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Create the payout",
      description: "Call the Payout Gateway with the amount and your reference. We reserve the fiat against your balance and return a link."
    },
    {
      number: "02",
      title: "Your customer completes it",
      description: "They open the link, pick the asset and network they want, and enter their wallet address in our widget. You never handle their details."
    },
    {
      number: "03",
      title: "Funds land and you reconcile",
      description: "The transfer settles on-chain and we post a signed webhook with the final status and transaction hash."
    }
  ]

  const useCases = [
    {
      title: "Gaming and betting",
      description: "Pay winnings out the moment they are approved, instead of holding players over a weekend."
    },
    {
      title: "Marketplaces and platforms",
      description: "Settle sellers, drivers, and creators on your own schedule, including across borders."
    },
    {
      title: "Remittance and disbursement",
      description: "Reach recipients who have a phone and a wallet but no reliable access to a bank."
    }
  ]

  return (
    <>
      <SEO
        title="Stablecoin Payouts for Businesses"
        description="Pay your customers out in stablecoin and crypto from your Ezeebit fiat balance. Send a link, let recipients choose their asset and network, and settle on-chain in minutes. FSCA-regulated, with address screening and signed webhooks."
        keywords="stablecoin payouts, crypto payouts, business payouts Africa, USDT payout, mass payouts, disbursements, payout API, betting winnings payout, marketplace seller payouts, cross-border payouts"
        canonicalUrl="/payouts"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Ezeebit Payout Gateway",
          "url": "https://ezeebit.com/payouts",
          "description": "Pay customers out in stablecoin and crypto from a fiat balance, with recipient-completed payout links, address screening, and signed webhooks.",
          "serviceType": "Stablecoin and cryptocurrency payouts",
          "areaServed": ["ZA", "KE", "NG"],
          "currenciesAccepted": ["ZAR", "USDT", "USDC", "BTC", "ETH"],
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
                  <span itemProp="name">Pay your customers in <span className="text-gradient">stablecoin</span></span>
                </h1>
                <p className="text-xl text-neutral-600 mb-8" itemProp="description">
                  Send payouts from your fiat balance without collecting a single wallet address.
                  Your customer picks the asset and network, completes the payout themselves,
                  and the funds settle on-chain in minutes.
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
                  <Link
                    to="/developers"
                    className="btn-secondary flex items-center justify-center"
                  >
                    View the API
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Payout card mockup */}
                <div className="relative max-w-sm mx-auto">
                  <div className="card p-6 shadow-2xl bg-white">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-medium text-neutral-500">Payout</span>
                      <span className="flex items-center text-xs font-medium text-green-600">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Completed
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">You send</p>
                        <p className="text-2xl font-bold text-neutral-900">R 18,400</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">They receive</p>
                        <p className="text-2xl font-bold text-neutral-900">1,000 USDT</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Network</span>
                      <span className="font-medium text-neutral-900">Chosen by recipient</span>
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
                Payouts without the bank rails
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Bank transfers are slow, expensive across borders, and closed on weekends.
                Stablecoin payouts are none of those things.
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
                One API call, one link, one signed webhook back.
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

        {/* Use Cases */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Built for businesses that owe people money
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Wherever payouts are high in volume, time sensitive, or hard to route through a bank.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-8 h-full"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-neutral-600">
                    {useCase.description}
                  </p>
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
                Ready to start paying out?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Get an API key and send your first payout today, or talk to us about volume.
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

export default Payouts
