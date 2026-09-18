import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Send, Globe, Clock, ShieldCheck,
  Webhook, Link2, CheckCircle
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

  const customerExperience = [
    {
      title: "Your brand, not ours",
      description: "The widget carries your name and colours. Ezeebit sits quietly underneath as the provider."
    },
    {
      title: "Live status, start to finish",
      description: "Each stage is ticked off as it happens, so nobody is left wondering whether the money is coming."
    },
    {
      title: "A reference they can quote",
      description: "Every payout carries an ID your support team can look up, alongside the amount and destination wallet."
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
        <section className="relative min-h-[60vh] flex items-center gradient-bg pt-40 pb-14 lg:pb-0">
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
                <div className="flex flex-col sm:flex-row gap-4 mb-2 lg:mb-8 justify-center lg:justify-start">
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
                className="relative w-full"
              >
                {/* Withdrawal method mockup - how Ezeebit appears inside your product */}
                <figure className="relative w-full max-w-md mx-auto lg:max-w-sm text-left">
                  <div className="card p-4 lg:p-6 shadow-2xl bg-white">
                    <div className="flex items-baseline justify-between gap-3 mb-4 lg:block lg:mb-5">
                      <p className="text-sm font-medium text-neutral-500 lg:mb-1">Withdraw</p>
                      <p className="text-2xl lg:text-3xl font-bold text-neutral-900">R2,000.00</p>
                    </div>

                    <p className="text-sm text-neutral-600 mb-2.5 lg:mb-3">How would you like to receive it?</p>

                    <div className="space-y-2 lg:space-y-2.5">
                      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 p-2.5 lg:p-3">
                        <span className="w-4 h-4 rounded-full border-2 border-neutral-300 flex-shrink-0"></span>
                        <span className="flex-1 text-sm font-medium text-neutral-700">Bank transfer</span>
                        <span className="text-xs text-neutral-500">2&ndash;3 days</span>
                      </div>

                      <div className="rounded-lg border-2 border-primary-500 bg-primary-50 p-2.5 lg:p-3">
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full border-[5px] border-primary-500 flex-shrink-0"></span>
                          <span className="flex-1 text-sm font-medium text-neutral-900">Stablecoin</span>
                          <span className="text-xs font-medium text-primary-600">Minutes</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5 pl-7">
                          <span className="text-xs text-neutral-500">Powered by</span>
                          <img src="/ezeebit_black.png" alt="Ezeebit" width={63} height={16} className="h-4 w-auto !mx-0" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-5 w-full rounded-lg bg-primary-500 text-white text-sm font-medium py-2 lg:py-2.5 text-center">
                      Continue
                    </div>
                  </div>
                  <figcaption className="sr-only">
                    A withdrawal screen inside a merchant&rsquo;s own product, offering a bank
                    transfer taking two to three days alongside a stablecoin payout powered by
                    Ezeebit that arrives in minutes.
                  </figcaption>
                </figure>
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
                  className="card px-5 py-4 text-center hover:scale-[1.03] transition-transform"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
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

        {/* What your customer sees */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 flex justify-center"
              >
                <img
                  src="/payout-widget-mockup.webp"
                  alt="The Ezeebit payout widget on a phone, showing a withdrawal progressing through quote accepted, transaction sent, confirming transaction, and funds transferred, with the amount received in USDT and a payout reference."
                  width={800}
                  height={1615}
                  loading="lazy"
                  className="w-full max-w-[18rem] h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                  What your customer sees
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  The payout link opens in any mobile browser. No app to install, no Ezeebit
                  account to create, and nothing for your support team to talk anyone through.
                </p>

                <ul className="space-y-5">
                  {customerExperience.map((point) => (
                    <li key={point.title} className="flex gap-4">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">{point.title}</h3>
                        <p className="text-neutral-600">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-neutral-50">
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
