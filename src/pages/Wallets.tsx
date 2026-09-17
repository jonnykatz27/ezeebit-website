import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Wallet, ArrowLeftRight, Landmark,
  Receipt, ShieldCheck, Database
} from 'lucide-react'
import SEO from '../components/SEO'

const Wallets = () => {
  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "One balance, both directions",
      description: "Money you take in funds the money you pay out. Pay-ins and payouts draw on the same balance instead of sitting in separate systems."
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Convert between ZAR and USDT",
      description: "Move between local currency and stablecoin at a quoted rate, and hold the balance in whichever one suits your exposure."
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Withdraw to bank or chain",
      description: "Send ZAR to your bank account or USDT to your own wallet. Fiat settles T+1, stablecoin settles same day."
    },
    {
      icon: <Receipt className="w-6 h-6" />,
      title: "A ledger that reconciles",
      description: "Every movement is a line item with a reference and a timestamp, so your finance team can tie the balance back to source."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Available over the API",
      description: "Read balances, quote conversions, and trigger withdrawals programmatically, or do all of it from the Merchant Portal."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Held under a CASP licence",
      description: "Balances sit with an FSCA-regulated Crypto Asset Service Provider, FSP No. 53664, with FIC and POPIA obligations built in."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Take payments in",
      description: "In-store, online, and OTC settlement all land in your Ezeebit wallets, hedged on arrival so you carry no volatility."
    },
    {
      number: "02",
      title: "Hold or convert",
      description: "Keep the balance in ZAR or USDT and convert between them whenever the rate or your obligations call for it."
    },
    {
      number: "03",
      title: "Pay out or withdraw",
      description: "Fund customer payouts from the same balance, or withdraw to your bank account or your own wallet."
    }
  ]

  return (
    <>
      <SEO
        title="Business Wallets for ZAR and Stablecoin"
        description="Hold ZAR and USDT balances with Ezeebit, convert between them, fund customer payouts, and withdraw to your bank or your own wallet. A full ledger, API access, and an FSCA-regulated CASP behind it."
        keywords="business stablecoin wallet, USDT wallet for business, ZAR stablecoin conversion, merchant wallet Africa, crypto treasury, stablecoin balance, business crypto withdrawal, CASP regulated wallet"
        canonicalUrl="/wallets"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Ezeebit Wallets",
          "url": "https://ezeebit.com/wallets",
          "description": "Business wallets holding ZAR and USDT balances, with conversion between them, payout funding, bank and on-chain withdrawals, and a full ledger.",
          "serviceType": "Business wallet and settlement balances",
          "areaServed": ["ZA", "KE", "NG"],
          "currenciesAccepted": ["ZAR", "USDT"],
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
                  <span itemProp="name">Your money, in <span className="text-gradient">rands or stablecoin</span></span>
                </h1>
                <p className="text-xl text-neutral-600 mb-8" itemProp="description">
                  Hold ZAR and USDT in one place, convert between them when it suits you,
                  fund your customer payouts from the same balance, and withdraw to your bank
                  or your own wallet.
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
                {/* Balances card mockup */}
                <div className="relative max-w-sm mx-auto">
                  <div className="card p-6 shadow-2xl bg-white">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-medium text-neutral-500">Balances</span>
                      <span className="flex items-center text-xs font-medium text-green-600">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Available
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">ZAR wallet</p>
                        <p className="text-2xl font-bold text-neutral-900">R 412,880</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <ArrowLeftRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">USDT wallet</p>
                        <p className="text-2xl font-bold text-neutral-900">22,410 USDT</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                      <span className="text-neutral-500">Withdrawals</span>
                      <span className="font-medium text-neutral-900">Bank &middot; On-chain</span>
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
                The account underneath everything
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Wallets are where your pay-ins land and where your payouts are funded from,
                in the currency you choose to hold.
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
                Money in, held how you want it, money out.
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
                Open your wallets
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Sign up and your ZAR and USDT wallets are ready from your first transaction.
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

export default Wallets
